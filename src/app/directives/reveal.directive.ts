import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  Renderer2,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0;
  @Input() revealDirection: 'up' | 'down' | 'left' | 'right' | 'scale' = 'up';
  @Input() revealDuration = 600;
  @Input() revealDistance = '30px';

  private observer?: IntersectionObserver;
  private isBrowser: boolean;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    // Set initial hidden state
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      `opacity ${this.revealDuration}ms ease, transform ${this.revealDuration}ms ease`
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition-delay',
      `${this.revealDelay}ms`
    );

    // Set initial transform based on direction
    const transforms: Record<string, string> = {
      up: `translateY(${this.revealDistance})`,
      down: `translateY(-${this.revealDistance})`,
      left: `translateX(${this.revealDistance})`,
      right: `translateX(-${this.revealDistance})`,
      scale: 'scale(0.9)',
    };
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      transforms[this.revealDirection]
    );

    // Create IntersectionObserver
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
            this.renderer.setStyle(
              this.el.nativeElement,
              'transform',
              'translateY(0) translateX(0) scale(1)'
            );
            this.observer?.unobserve(this.el.nativeElement);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
