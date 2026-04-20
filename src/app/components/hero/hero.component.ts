import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  trigger,
  style,
  animate,
  transition,
  stagger,
  query,
  state,
} from '@angular/animations';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('heroReveal', [
      transition(':enter', [
        query(
          '.anim-item',
          [
            style({ opacity: 0, transform: 'translateY(30px)' }),
            stagger(120, [
              animate(
                '700ms cubic-bezier(0.16, 1, 0.3, 1)',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger('codeWindowReveal', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(60px) scale(0.95)' }),
        animate(
          '900ms 600ms cubic-bezier(0.16, 1, 0.3, 1)',
          style({ opacity: 1, transform: 'translateX(0) scale(1)' })
        ),
      ]),
    ]),
    trigger('statCounter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate(
          '500ms cubic-bezier(0.16, 1, 0.3, 1)',
          style({ opacity: 1, transform: 'scale(1)' })
        ),
      ]),
    ]),
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  typedRole = '';
  private fullRole = 'Fullstack Developer';
  private typeInterval: any;
  private isBrowser: boolean;
  showCursor = true;

  constructor(
    private portfolioService: PortfolioService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // Wait for loader to finish before typing starts
      setTimeout(() => {
        this.startTypingAnimation();
      }, 3500);
    } else {
      this.typedRole = this.fullRole;
    }
  }

  ngOnDestroy(): void {
    if (this.typeInterval) {
      clearInterval(this.typeInterval);
    }
  }

  private startTypingAnimation(): void {
    let index = 0;
    this.typeInterval = setInterval(() => {
      if (index < this.fullRole.length) {
        this.typedRole += this.fullRole.charAt(index);
        index++;
      } else {
        clearInterval(this.typeInterval);
        // Blink cursor a few times then stop
        setTimeout(() => {
          this.showCursor = false;
        }, 3000);
      }
    }, 80);
  }

  scrollToProjects() {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  downloadCV() {
    const cvUrl = this.portfolioService.getCvUrl();
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'CV_Anthony_Cajacuri_2026.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
