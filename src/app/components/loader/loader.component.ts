import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

type LoaderVariant = 'terminal' | 'matrix' | 'glitch' | 'geometric';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('fadeOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0, pointerEvents: 'none' })),
      transition('visible => hidden', animate('600ms ease-out')),
    ]),
  ],
  template: `
    <div class="loader-overlay" [@fadeOut]="loaderState">
      <!-- Variant 1: Terminal -->
      <div class="loader-content" *ngIf="variant === 'terminal'">
        <div class="terminal">
          <div class="terminal-header">
            <div class="terminal-controls">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <span class="terminal-title">portfolio.init()</span>
          </div>
          <div class="terminal-body">
            <div
              class="line"
              *ngFor="let line of visibleLines; let i = index"
              [style.animation-delay]="i * 0.08 + 's'"
            >
              <span class="prompt" *ngIf="line.type === 'command'">❯</span>
              <span class="prefix" *ngIf="line.type === 'command'">
                ~/ancaor
              </span>
              <span [class]="line.type">{{ line.text }}</span>
              <span
                class="cursor-blink"
                *ngIf="i === visibleLines.length - 1 && !isComplete"
                >▊</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Variant 2: Matrix Code Rain -->
      <div class="loader-content matrix-content" *ngIf="variant === 'matrix'">
        <div class="matrix-rain">
          <div
            class="matrix-column"
            *ngFor="let col of matrixColumns"
            [style]="col.style"
          >
            <span
              class="matrix-char"
              *ngFor="let char of col.chars"
              [class.highlight]="char.highlight"
              >{{ char.value }}</span
            >
          </div>
        </div>
        <div class="matrix-center">
          <div class="matrix-logo">
            <span class="matrix-bracket">&lt;</span>
            <span class="matrix-name">ANCAOR</span>
            <span class="matrix-bracket">/&gt;</span>
          </div>
          <div class="matrix-subtitle">initializing...</div>
        </div>
      </div>

      <!-- Variant 3: Glitch Text -->
      <div class="loader-content glitch-content" *ngIf="variant === 'glitch'">
        <div class="glitch-container">
          <div class="glitch-text" data-text="ANCAOR.DEV">ANCAOR.DEV</div>
          <div class="glitch-subtitle">
            <span class="glitch-line" *ngFor="let item of glitchLines">{{
              item
            }}</span>
          </div>
          <div class="glitch-bar">
            <div
              class="glitch-bar-fill"
              [style.width.%]="progress"
            ></div>
          </div>
          <div class="scan-line"></div>
        </div>
      </div>

      <!-- Variant 4: Geometric Morph -->
      <div
        class="loader-content geometric-content"
        *ngIf="variant === 'geometric'"
      >
        <div class="geo-container">
          <div class="geo-shape">
            <div class="geo-ring ring-1"></div>
            <div class="geo-ring ring-2"></div>
            <div class="geo-ring ring-3"></div>
            <div class="geo-dot"></div>
          </div>
          <div class="geo-text">
            <span class="geo-letter" *ngFor="let letter of geoLetters; let i = index"
              [style.animation-delay]="i * 0.1 + 's'">{{ letter }}</span>
          </div>
          <div class="geo-status">{{ geoStatus }}</div>
        </div>
      </div>

      <!-- Progress bar (all variants) -->
      <div class="progress-container">
        <div class="progress-bar" [style.width.%]="progress"></div>
      </div>

      <!-- Particles background (all variants) -->
      <div class="particles">
        <div
          class="particle"
          *ngFor="let p of particles"
          [style]="p.style"
        ></div>
      </div>
    </div>
  `,
  styleUrl: './loader.component.scss',
})
export class LoaderComponent implements OnInit, OnDestroy {
  loaderState: 'visible' | 'hidden' = 'visible';
  progress = 0;
  isComplete = false;
  variant: LoaderVariant = 'terminal';

  // Terminal variant
  visibleLines: { text: string; type: string }[] = [];
  private terminalLines = [
    { text: 'npm run portfolio:init', type: 'command' },
    { text: '✔ Loading modules...', type: 'success' },
    { text: '  → Angular 19 loaded', type: 'info' },
    { text: '  → TypeScript configured', type: 'info' },
    { text: '✔ Building components...', type: 'success' },
    { text: '  → hero.component ready', type: 'info' },
    { text: '  → projects.service connected', type: 'info' },
    { text: '✔ Starting portfolio...', type: 'success' },
    { text: '⚡ Portfolio ready!', type: 'highlight' },
  ];

  // Matrix variant
  matrixColumns: { style: string; chars: { value: string; highlight: boolean }[] }[] = [];

  // Glitch variant
  glitchLines: string[] = [];
  private glitchMessages = [
    '> Initializing system...',
    '> Loading modules...',
    '> Connecting services...',
    '> Compiling assets...',
    '> System ready.',
  ];

  // Geometric variant
  geoLetters: string[] = 'ANCAOR'.split('');
  geoStatus = 'Loading...';
  private geoStatuses = [
    'Loading...',
    'Building...',
    'Compiling...',
    'Rendering...',
    'Ready!',
  ];

  // Shared
  particles: { style: string }[] = [];
  private timers: any[] = [];
  private intervals: any[] = [];
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      this.loaderState = 'hidden';
      return;
    }

    // Pick random variant
    const variants: LoaderVariant[] = [
      'terminal',
      'matrix',
      'glitch',
      'geometric',
    ];
    this.variant = variants[Math.floor(Math.random() * variants.length)];

    this.generateParticles();
    this.startLoader();
  }

  ngOnDestroy(): void {
    this.timers.forEach((t) => clearTimeout(t));
    this.intervals.forEach((i) => clearInterval(i));
  }

  private startLoader(): void {
    const totalDuration = 3000;

    // Progress animation (shared)
    const progressInterval = setInterval(() => {
      if (this.progress < 100) {
        this.progress += Math.random() * 3 + 1;
        if (this.progress > 100) this.progress = 100;
      }
    }, totalDuration / 40);
    this.intervals.push(progressInterval);

    // Start variant-specific animation
    switch (this.variant) {
      case 'terminal':
        this.runTerminal(totalDuration);
        break;
      case 'matrix':
        this.runMatrix(totalDuration);
        break;
      case 'glitch':
        this.runGlitch(totalDuration);
        break;
      case 'geometric':
        this.runGeometric(totalDuration);
        break;
    }

    // Fade out
    const fadeTimer = setTimeout(() => {
      this.isComplete = true;
      this.progress = 100;
      clearInterval(progressInterval);
    }, totalDuration);
    this.timers.push(fadeTimer);

    const hideTimer = setTimeout(() => {
      this.loaderState = 'hidden';
    }, totalDuration + 500);
    this.timers.push(hideTimer);
  }

  // === Terminal ===
  private runTerminal(duration: number): void {
    const lineDelay = duration / this.terminalLines.length;
    this.terminalLines.forEach((line, index) => {
      const timer = setTimeout(() => {
        this.visibleLines.push(line);
      }, index * lineDelay);
      this.timers.push(timer);
    });
  }

  // === Matrix ===
  private runMatrix(duration: number): void {
    const chars =
      'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>/{}[]();.:';
    const numCols = 25;

    for (let i = 0; i < numCols; i++) {
      const colChars: { value: string; highlight: boolean }[] = [];
      const numChars = Math.floor(Math.random() * 12) + 6;
      for (let j = 0; j < numChars; j++) {
        colChars.push({
          value: chars.charAt(Math.floor(Math.random() * chars.length)),
          highlight: j === numChars - 1,
        });
      }
      const left = (i / numCols) * 100;
      const animDuration = Math.random() * 3 + 2;
      const animDelay = Math.random() * 2;
      this.matrixColumns.push({
        style: `left: ${left}%; animation-duration: ${animDuration}s; animation-delay: ${animDelay}s;`,
        chars: colChars,
      });
    }

    // Randomize chars periodically
    const matrixInterval = setInterval(() => {
      this.matrixColumns.forEach((col) => {
        const randIdx = Math.floor(Math.random() * col.chars.length);
        col.chars[randIdx].value = chars.charAt(
          Math.floor(Math.random() * chars.length)
        );
      });
    }, 100);
    this.intervals.push(matrixInterval);

    const clearTimer = setTimeout(
      () => clearInterval(matrixInterval),
      duration
    );
    this.timers.push(clearTimer);
  }

  // === Glitch ===
  private runGlitch(duration: number): void {
    const lineDelay = duration / this.glitchMessages.length;
    this.glitchMessages.forEach((msg, index) => {
      const timer = setTimeout(() => {
        this.glitchLines.push(msg);
      }, index * lineDelay);
      this.timers.push(timer);
    });
  }

  // === Geometric ===
  private runGeometric(duration: number): void {
    const statusDelay = duration / this.geoStatuses.length;
    this.geoStatuses.forEach((status, index) => {
      const timer = setTimeout(() => {
        this.geoStatus = status;
      }, index * statusDelay);
      this.timers.push(timer);
    });
  }

  // === Particles ===
  private generateParticles(): void {
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 4 + 2;
      const left = Math.random() * 100;
      const duration = Math.random() * 8 + 6;
      const delay = Math.random() * 3;
      this.particles.push({
        style: `width:${size}px;height:${size}px;left:${left}%;animation-duration:${duration}s;animation-delay:${delay}s;`,
      });
    }
  }
}
