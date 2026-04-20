import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
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

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrl = environment.apiUrl;
  private useMock = environment.useMockData;

  // Simulación de delay de red (ms) para datos mock
  private mockDelay = 300;

  private profileData: ProfileInfo = {
    name: 'Anthony Cajacuri',
    fullName: 'Jose Anthony Cajacuri Ordoñez',
    role: 'Fullstack Developer',
    email: 'ancaor.dev@gmail.com',
    phone: '+51 906455712',
    location: 'Tarma, Junín, Perú',
    bio: 'Desarrollador Fullstack con más de 7 años de experiencia creando aplicaciones web modernas y escalables. Enfocado en la innovación, aprendizaje continuo y trabajo en equipo. Me especializo en desarrollar plataformas escalables con énfasis en usabilidad y rendimiento óptimo usando tecnologías modernas.',
    github: 'https://github.com/AncaorDev',
    linkedin: 'https://linkedin.com/in/ancaor-dev',
    yearsOfExperience: 9,
    projectsCompleted: 10,
    technologiesMastered: 12,
  };

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de proyectos.
   * En modo mock, retorna datos locales.
   * En modo API, hace un GET al endpoint /projects
   */
  getProjects(): Observable<Project[]> {
    if (this.useMock) {
      return of(MOCK_PROJECTS).pipe(delay(this.mockDelay));
    }
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  /**
   * Obtiene los proyectos destacados
   */
  getFeaturedProjects(): Observable<Project[]> {
    if (this.useMock) {
      return of(MOCK_PROJECTS.filter((p) => p.featured)).pipe(
        delay(this.mockDelay)
      );
    }
    return this.http.get<Project[]>(`${this.apiUrl}/projects/featured`);
  }

  /**
   * Obtiene la lista de experiencias laborales.
   */
  getExperiences(): Observable<Experience[]> {
    if (this.useMock) {
      return of(MOCK_EXPERIENCES).pipe(delay(this.mockDelay));
    }
    return this.http.get<Experience[]>(`${this.apiUrl}/experiences`);
  }

  /**
   * Obtiene las habilidades agrupadas por categoría.
   */
  getSkills(): Observable<SkillCategory[]> {
    if (this.useMock) {
      return of(MOCK_SKILLS).pipe(delay(this.mockDelay));
    }
    return this.http.get<SkillCategory[]>(`${this.apiUrl}/skills`);
  }

  /**
   * Obtiene la información del perfil.
   */
  getProfile(): Observable<ProfileInfo> {
    if (this.useMock) {
      return of(this.profileData).pipe(delay(this.mockDelay));
    }
    return this.http.get<ProfileInfo>(`${this.apiUrl}/profile`);
  }

  /**
   * URL del CV para descarga
   */
  getCvUrl(): string {
    return 'assets/CV Anthony Cajacuri - 2026 v2.pdf';
  }
}
