import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme = new BehaviorSubject<Theme>('light');
  public currentTheme$ = this.currentTheme.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    console.log('ThemeService initialized');

    // Solo ejecutar en el navegador
    if (isPlatformBrowser(this.platformId)) {
      // Cargar tema guardado en localStorage
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme) {
        this.setTheme(savedTheme);
      } else {
        // Detectar preferencia del sistema
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        this.setTheme(prefersDark ? 'dark' : 'light');
      }
    }
  }

  getCurrentTheme(): Theme {
    return this.currentTheme.value;
  }

  setTheme(theme: Theme): void {
    console.log('Setting theme to:', theme);
    this.currentTheme.next(theme);

    // Solo guardar en localStorage si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
    }

    this.applyTheme(theme);
  }

  toggleTheme(): void {
    console.log('Toggling theme');
    const newTheme = this.currentTheme.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  private applyTheme(theme: Theme): void {
    // Solo aplicar tema si estamos en el navegador
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const root = document.documentElement;

    if (theme === 'dark') {
      root.style.setProperty('--primary-color', '#0a0a0a');
      root.style.setProperty('--secondary-color', '#1a1a1a');
      root.style.setProperty('--accent-color', '#3b82f6');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#a1a1aa');
      root.style.setProperty('--text-muted', '#71717a');
      root.style.setProperty('--border-color', '#27272a');
      root.style.setProperty('--background', '#000000');
      root.style.setProperty('--card-bg', '#0a0a0a');
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
      console.log('Dark theme applied');
    } else {
      root.style.setProperty('--primary-color', '#ffffff');
      root.style.setProperty('--secondary-color', '#f8f9fa');
      root.style.setProperty('--accent-color', '#3b82f6');
      root.style.setProperty('--text-primary', '#1a1a1a');
      root.style.setProperty('--text-secondary', '#6b7280');
      root.style.setProperty('--text-muted', '#9ca3af');
      root.style.setProperty('--border-color', '#e5e7eb');
      root.style.setProperty('--background', '#ffffff');
      root.style.setProperty('--card-bg', '#ffffff');
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
      console.log('Light theme applied');
    }
  }
}
