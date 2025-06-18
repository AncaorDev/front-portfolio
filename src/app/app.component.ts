import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProjectsComponent } from './components/projects/projects.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    ContactComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('sectionsContainer') sectionsContainer!: ElementRef;

  currentSection = 0;
  sections = ['home', 'about', 'projects', 'contact'];
  isMenuOpen = false;

  ngAfterViewInit() {
    this.setupScrollListener();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateCurrentSection();
  }

  setupScrollListener() {
    const container = this.sectionsContainer.nativeElement;
    container.addEventListener('scroll', () => {
      this.updateCurrentSection();
    });
  }

  updateCurrentSection() {
    const container = this.sectionsContainer.nativeElement;
    const scrollLeft = container.scrollLeft;
    const sectionWidth = window.innerWidth;
    this.currentSection = Math.round(scrollLeft / sectionWidth);
  }

  scrollToSection(sectionId: string) {
    const index = this.sections.indexOf(sectionId);
    if (index !== -1) {
      this.scrollToSectionIndex(index);
    }
  }

  scrollToSectionIndex(index: number) {
    const container = this.sectionsContainer.nativeElement;
    const sectionWidth = window.innerWidth;
    container.scrollTo({
      left: index * sectionWidth,
      behavior: 'smooth'
    });
    this.currentSection = index;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Navegación con teclado
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
