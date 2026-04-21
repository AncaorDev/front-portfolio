import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SeoService } from './services/seo.service';
import { PortfolioService } from './services/portfolio.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    ContactComponent,
    LoaderComponent,
  ],
  animations: [
    trigger('sectionTransition', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms 200ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
    trigger('navReveal', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('600ms 3200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('indicatorReveal', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('600ms 3400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  currentSection = 0;
  sections = ['home', 'about', 'projects', 'contact'];
  isMenuOpen = false;

  constructor(
    private seoService: SeoService,
    private portfolioService: PortfolioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.seoService.resetToDefault();
  }

  ngAfterViewInit() {
    this.setupScrollListener();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateCurrentSection();
  }

  setupScrollListener() {
    const options = {
      root: this.scrollContainer.nativeElement,
      threshold: 0.5 // trigger when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = this.sections.indexOf(entry.target.id);
          if (index !== -1 && this.currentSection !== index) {
            this.currentSection = index;
            this.cdr.detectChanges(); // force view update
          }
        }
      });
    }, options);

    this.sections.forEach(sectionId => {
      const el = document.getElementById(sectionId);
      if (el) observer.observe(el);
    });
  }

  updateCurrentSection() {
    // Left as fallback for resize if needed
    const container = this.scrollContainer.nativeElement;
    const scrollLeft = container.scrollLeft;
    const sectionWidth = container.clientWidth;
    this.currentSection = Math.round(scrollLeft / sectionWidth);
    this.cdr.detectChanges();
  }

  scrollToSection(sectionId: string) {
    const index = this.sections.indexOf(sectionId);
    if (index !== -1) {
      this.scrollToSectionIndex(index);
    }
  }

  scrollToSectionIndex(index: number) {
    const container = this.scrollContainer.nativeElement;
    const sectionWidth = window.innerWidth;
    container.scrollTo({
      left: index * sectionWidth,
      behavior: 'smooth',
    });
    this.currentSection = index;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
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

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.navigateToPreviousSection();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.navigateToNextSection();
        break;
      case 'Home':
        event.preventDefault();
        this.scrollToSectionIndex(0);
        break;
      case 'End':
        event.preventDefault();
        this.scrollToSectionIndex(this.sections.length - 1);
        break;
    }
  }

  navigateToPreviousSection() {
    if (this.currentSection > 0) {
      this.scrollToSectionIndex(this.currentSection - 1);
    }
  }

  navigateToNextSection() {
    if (this.currentSection < this.sections.length - 1) {
      this.scrollToSectionIndex(this.currentSection + 1);
    }
  }
}
