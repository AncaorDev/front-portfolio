import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  Renderer2,
  PLATFORM_ID,
  Inject,
  Input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appTextReveal]',
  standalone: true,
})
export class TextRevealDirective implements OnInit, OnDestroy {
  @Input() textRevealDelay = 0;

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

    const element = this.el.nativeElement as HTMLElement;

    // Wrap text in clip container
    this.renderer.setStyle(element, 'overflow', 'hidden');
    this.renderer.setStyle(element, 'display', 'inline-block');

    const inner = this.renderer.createElement('span');
    inner.innerHTML = element.innerHTML;
    element.innerHTML = '';
    this.renderer.appendChild(element, inner);

    // Initial state
    this.renderer.setStyle(inner, 'display', 'inline-block');
    this.renderer.setStyle(inner, 'transform', 'translateY(110%)');
    this.renderer.setStyle(
      inner,
      'transition',
      `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)`
    );
    this.renderer.setStyle(
      inner,
      'transition-delay',
      `${this.textRevealDelay}ms`
    );

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.setStyle(inner, 'transform', 'translateY(0)');
            this.observer?.unobserve(element);
          }
        });
      },
      { threshold: 0.1 }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
