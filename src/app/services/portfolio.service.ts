import { Injectable, PLATFORM_ID, TransferState, inject, makeStateKey } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, concat, delay, distinctUntilChanged, filter, map, of, shareReplay, startWith, switchMap, tap, timeout } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  Project,
  Experience,
  SkillCategory,
  ProfileInfo,
} from '../models/portfolio.models';
import { MOCK_PROJECTS } from '../data/projects.data';
import { MOCK_EXPERIENCES } from '../data/experience.data';
import { MOCK_SKILLS } from '../data/skills.data';
import { MOCK_PROFILE } from '../data/profile.data';
import { PortfolioContent, PublicPortfolio, toPortfolioContent } from './portfolio-api.mapper';

const LOCAL_CV_URL = 'assets/cv-anthony-cajacuri.pdf';

const LOCAL_CONTENT: PortfolioContent = {
  profile: MOCK_PROFILE,
  cvUrl: null,
  projects: MOCK_PROJECTS,
  experiences: MOCK_EXPERIENCES,
  skills: MOCK_SKILLS,
};

/** Keeps SSR/prerender responsive if the API is slow; the bundled content is shown instead. */
const API_TIMEOUT_MS = 4000;
/** Content the page was rendered with on the server (or at prerender time). */
const RENDERED_CONTENT = makeStateKey<PortfolioContent>('ancaor-portfolio-content');

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot: humans leave it empty. */
  website: string;
}

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private http = inject(HttpClient);
  private transferState = inject(TransferState);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private apiUrl = environment.apiUrl;
  private useMock = environment.useMockData;

  // Simulación de delay de red (ms) para datos mock
  private mockDelay = 300;

  /**
   * Contenido editado desde app.ancaor.com. Lee la revisión sin caché y luego GET /portfolio/public?v=<revision>. Si el API falla o aún no tiene
   * perfil, los datos incluidos en el sitio. El sitio se publica prerenderado: el navegador hidrata
   * con el contenido del render y luego lo actualiza con el del API, así las ediciones se ven sin
   * volver a desplegar y la hidratación nunca recibe datos distintos a los del HTML.
   */
  private readonly content$: Observable<PortfolioContent> = this.createContent().pipe(
    shareReplay(1)
  );

  /** URL del CV: `profile.cvUrl` del API, o el PDF incluido en el sitio si aún no hay una. */
  readonly cvUrl$: Observable<string> = this.content$.pipe(
    map(content => this.resolveCvUrl(content.cvUrl)),
    startWith(LOCAL_CV_URL),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  getProjects(): Observable<Project[]> {
    return this.content$.pipe(map(content => content.projects));
  }

  getFeaturedProjects(): Observable<Project[]> {
    return this.getProjects().pipe(map(projects => projects.filter(p => p.featured)));
  }

  getExperiences(): Observable<Experience[]> {
    return this.content$.pipe(map(content => content.experiences));
  }

  getSkills(): Observable<SkillCategory[]> {
    return this.content$.pipe(map(content => content.skills));
  }

  getProfile(): Observable<ProfileInfo> {
    return this.content$.pipe(map(content => content.profile ?? MOCK_PROFILE));
  }

  /** POST /portfolio/public/contact. In mock mode it only simulates the delay. */
  sendContact(message: ContactMessage): Observable<void> {
    if (this.useMock) return of(undefined).pipe(delay(1200));
    return this.http.post<void>(`${this.apiUrl}/portfolio/public/contact`, message).pipe(map(() => undefined));
  }

  private resolveCvUrl(cvUrl: string | null | undefined): string {
    const url = cvUrl?.trim();
    if (!url) return LOCAL_CV_URL;
    if (/^https?:\/\//i.test(url) || url.startsWith('blob:') || url.startsWith('data:')) {
      return url;
    }
    if (url.startsWith('//')) {
      return `https:${url}`;
    }
    return url;
  }

  private createContent(): Observable<PortfolioContent> {
    if (this.useMock) return of(LOCAL_CONTENT).pipe(delay(this.mockDelay));
    if (!this.isBrowser) {
      return this.fetchApi(LOCAL_CONTENT).pipe(tap(content => this.transferState.set(RENDERED_CONTENT, content)));
    }
    const rendered = this.transferState.get(RENDERED_CONTENT, null);
    if (!rendered) return this.fetchApi(LOCAL_CONTENT);
    this.transferState.remove(RENDERED_CONTENT);
    const latest = this.fetchApi(null).pipe(
      filter((content): content is PortfolioContent => content !== null)
    );
    return concat(of(rendered), latest).pipe(
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    );
  }

  /** The API content, or `fallback` when it fails, times out or has no profile yet. */
  private fetchApi<T extends PortfolioContent | null>(fallback: T): Observable<PortfolioContent | T> {
    return this.publicRevision().pipe(
      switchMap(revision => this.http.get<PublicPortfolio>(`${this.apiUrl}/portfolio/public`, {
        params: { v: String(revision) },
        transferCache: false
      }).pipe(
        timeout(API_TIMEOUT_MS),
        map(toPortfolioContent),
        map(content => (content.profile ? content : fallback)),
        catchError(() => of(fallback))
      ))
    );
  }

  /** Uncached generation counter. A failure keeps `v=0` and still tries the content request. */
  private publicRevision(): Observable<number> {
    return this.http.get<{ revision?: unknown }>(`${this.apiUrl}/portfolio/public/revision`, {
      params: { t: Date.now().toString() },
      transferCache: false
    }).pipe(
      timeout(2000),
      map(body => {
        const revision = Number(body?.revision);
        return Number.isSafeInteger(revision) && revision >= 0 ? revision : 0;
      }),
      catchError(() => of(0))
    );
  }
}
