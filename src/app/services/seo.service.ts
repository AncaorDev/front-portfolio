import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  private defaultData: SEOData = {
    title: 'Anthony Cajacuri - Desarrollador Full Stack | Portfolio Personal',
    description: 'Portfolio personal de Anthony Cajacuri, desarrollador Full Stack especializado en Angular, React, Node.js y tecnologías web modernas. Descubre mis proyectos y experiencia.',
    keywords: 'Anthony Cajacuri, desarrollador full stack, Angular, React, Node.js, JavaScript, TypeScript, portfolio, programador, desarrollo web',
    image: 'https://ancaor.dev/assets/ancaor-logo.png',
    url: 'https://ancaor.dev',
    type: 'website'
  };

  constructor(
    private meta: Meta,
    private title: Title
  ) { }

  updateSEO(data: SEOData = {}): void {
    const seoData = { ...this.defaultData, ...data };

    // Update title
    this.title.setTitle(seoData.title!);

    // Update meta tags
    this.meta.updateTag({ name: 'description', content: seoData.description! });
    this.meta.updateTag({ name: 'keywords', content: seoData.keywords! });

    // Update Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: seoData.title! });
    this.meta.updateTag({ property: 'og:description', content: seoData.description! });
    this.meta.updateTag({ property: 'og:image', content: seoData.image! });
    this.meta.updateTag({ property: 'og:url', content: seoData.url! });
    this.meta.updateTag({ property: 'og:type', content: seoData.type! });

    // Update Twitter Card tags
    this.meta.updateTag({ property: 'twitter:title', content: seoData.title! });
    this.meta.updateTag({ property: 'twitter:description', content: seoData.description! });
    this.meta.updateTag({ property: 'twitter:image', content: seoData.image! });
    this.meta.updateTag({ property: 'twitter:url', content: seoData.url! });

    // Update canonical URL
    this.meta.updateTag({ rel: 'canonical', href: seoData.url! });
  }

  updateTitle(title: string): void {
    this.title.setTitle(title);
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'twitter:title', content: title });
  }

  updateDescription(description: string): void {
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'twitter:description', content: description });
  }

  updateKeywords(keywords: string): void {
    this.meta.updateTag({ name: 'keywords', content: keywords });
  }

  updateImage(image: string): void {
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'twitter:image', content: image });
  }

  resetToDefault(): void {
    this.updateSEO();
  }
}
