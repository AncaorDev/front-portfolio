import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme = new BehaviorSubject<Theme>('dark');
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
        this.setTheme('dark');
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
      root.style.setProperty('--card-bg', 'rgba(10, 10, 10, 0.8)');
      root.style.setProperty('--nav-bg', 'rgba(10, 10, 10, 0.8)');
      root.style.setProperty('--gradient-text', 'linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)');
      root.style.setProperty('--window-shadow', '0 20px 40px rgba(0, 0, 0, 0.4)');
      root.style.setProperty('--grid-opacity', '0.03');
      
      // Sintaxis Dark (Dracula)
      root.style.setProperty('--syntax-keyword', '#ff79c6');
      root.style.setProperty('--syntax-class', '#8be9fd');
      root.style.setProperty('--syntax-property', '#f8f8f2');
      root.style.setProperty('--syntax-string', '#f1fa8c');
      root.style.setProperty('--syntax-variable', '#bd93f9');
      root.style.setProperty('--syntax-comment', '#6272a4');
      
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
      console.log('Dark theme applied');
    } else {
      root.style.setProperty('--primary-color', '#f8fafc');
      root.style.setProperty('--secondary-color', '#ffffff');
      root.style.setProperty('--accent-color', '#2563eb');
      root.style.setProperty('--text-primary', '#0f172a');
      root.style.setProperty('--text-secondary', '#334155');
      root.style.setProperty('--text-muted', '#64748b');
      root.style.setProperty('--border-color', '#e2e8f0');
      root.style.setProperty('--background', '#f1f5f9');
      root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.7)');
      root.style.setProperty('--nav-bg', 'rgba(248, 250, 252, 0.8)');
      root.style.setProperty('--gradient-text', 'linear-gradient(135deg, #1e293b 0%, #2563eb 100%)');
      root.style.setProperty('--window-shadow', '0 20px 50px rgba(15, 23, 42, 0.08)');
      root.style.setProperty('--grid-opacity', '0.08');
      
      // Sintaxis Light (Professional)
      root.style.setProperty('--syntax-keyword', '#9333ea');
      root.style.setProperty('--syntax-class', '#2563eb');
      root.style.setProperty('--syntax-property', '#0f172a');
      root.style.setProperty('--syntax-string', '#059669');
      root.style.setProperty('--syntax-variable', '#7c3aed');
      root.style.setProperty('--syntax-comment', '#94a3b8');
      
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
      console.log('Light theme applied');
    }
  }
}
