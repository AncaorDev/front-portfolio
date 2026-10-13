import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  OnDestroy,
  PLATFORM_ID,
  effect,
  inject,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { CvDocument, PortfolioService } from '../../services/portfolio.service';
import { CvModalService } from '../../services/cv-modal.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-cv-modal',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './cv-modal.component.html',
  styleUrl: './cv-modal.component.scss',
})
export class CvModalComponent implements OnDestroy {
  private sanitizer = inject(DomSanitizer);
  private portfolio = inject(PortfolioService);
  readonly cvModal = inject(CvModalService);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  loading = false;
  error = false;
  document: CvDocument | null = null;
  previewUrl: SafeResourceUrl | null = null;
  private objectUrl: string | null = null;
  private loadSub?: Subscription;

  constructor() {
    effect(() => {
      if (this.cvModal.isOpen()) {
        this.load();
      } else {
        this.cleanup();
      }
    });
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.cvModal.isOpen()) this.cvModal.close();
  }

  download(): void {
    if (this.document) this.portfolio.downloadCv(this.document);
  }

  onBackdrop(event: Event): void {
    if (event.target === event.currentTarget) this.cvModal.close();
  }

  private load(): void {
    if (!this.isBrowser || this.loading || this.document) return;
    this.loading = true;
    this.error = false;
    this.loadSub?.unsubscribe();
    this.loadSub = this.portfolio.loadCvDocument().subscribe({
      next: doc => {
        this.document = doc;
        if (doc.previewUrl.startsWith('blob:')) {
          this.objectUrl = doc.previewUrl;
        }
        this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(doc.previewUrl);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }

  private cleanup(): void {
    this.loadSub?.unsubscribe();
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = null;
    }
    this.document = null;
    this.previewUrl = null;
    this.loading = false;
    this.error = false;
  }
}
