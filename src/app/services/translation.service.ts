import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type Language = 'es' | 'en';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Sobre mí',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',
    'nav.cv': 'CV',
    'nav.downloadCv': 'Descargar CV',

    'hero.title1': 'Construyendo',
    'hero.title2': 'experiencias digitales',
    'hero.title3': 'que inspiran.',
    'hero.subtitle': 'Creo experiencias digitales únicas y soluciones innovadoras. Especializado en plataformas escalables con énfasis en usabilidad y rendimiento óptimo usando tecnologías modernas.',
    'hero.btn.projects': 'Ver Proyectos',
    'hero.btn.contact': 'Contáctame',
    'hero.scroll': 'Scroll Down',

    'about.title': 'Sobre mí',
    'about.subtitle': 'Desarrollador apasionado por crear soluciones innovadoras',
    'about.greeting': '¡Hola! Soy',
    'about.p1': 'Soy un desarrollador Fullstack con más de 9 años de experiencia creando aplicaciones web modernas y escalables. Me enfoco en la innovación, aprendizaje continuo y trabajo en equipo.',
    'about.p2': 'Me especializo en desarrollar plataformas escalables con énfasis en usabilidad y rendimiento óptimo usando tecnologías modernas. He trabajado con clientes como BBVA, Pacasmayo, y corporaciones educativas.',
    'about.p3': 'Mi experiencia abarca desde el liderazgo técnico de equipos de desarrollo hasta migraciones exitosas a la nube y optimización arquitectónica de sistemas complejos.',
    'about.loc.label': 'Ubicación:',
    'about.loc.val': 'Tarma, Junín - Perú',
    'about.exp.label': 'Experiencia:',
    'about.exp.val': '9+ años',
    'about.disp.label': 'Disponibilidad:',
    'about.disp.val': 'Disponible para proyectos',
    'about.edu.label': 'Educación:',
    'about.edu.val': 'Bach. Ingeniería de Sistemas',
    'about.skills.title': 'Habilidades Técnicas',
    'about.exp.title': 'Experiencia Profesional',

    'projects.title': 'Proyectos',
    'projects.subtitle': 'Algunos de mis trabajos más destacados',
    'projects.filter.all': 'Todos',
    'projects.filter.frontend': 'Frontend',
    'projects.filter.backend': 'Backend',
    'projects.filter.fullstack': 'Fullstack',
    'projects.filter.mobile': 'Móvil',
    'projects.featured': '⭐ Destacado',
    'projects.empty': 'No hay proyectos en esta categoría.',
    'projects.cta.text': '¿Te gusta lo que ves? ¡Trabajemos juntos!',
    'projects.cta.btn': 'Iniciar Proyecto',

    'contact.title': 'Contacto',
    'contact.subtitle': '¿Tienes un proyecto en mente? Hablemos.',
    'contact.form.name': 'Nombre',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Asunto',
    'contact.form.message': 'Mensaje',
    'contact.form.submit': 'Enviar Mensaje',
    'contact.form.submitting': 'Enviando...',
    'contact.form.success': '¡Mensaje enviado con éxito!',
    
    'theme.toggle': 'Cambiar Tema',
    'lang.toggle': 'EN/ES'
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.cv': 'CV',
    'nav.downloadCv': 'Download CV',

    'hero.title1': 'Building',
    'hero.title2': 'digital experiences',
    'hero.title3': 'that inspire.',
    'hero.subtitle': 'I create unique digital experiences and innovative solutions. Specialized in scalable platforms focusing on usability and optimal performance using modern technologies.',
    'hero.btn.projects': 'View Projects',
    'hero.btn.contact': 'Contact Me',
    'hero.scroll': 'Scroll Down',

    'about.title': 'About Me',
    'about.subtitle': 'Passionate developer creating innovative solutions',
    'about.greeting': 'Hi! I am',
    'about.p1': 'I am a Fullstack developer with over 9 years of experience creating modern and scalable web applications. I focus on innovation, continuous learning, and teamwork.',
    'about.p2': 'I specialize in developing scalable platforms with an emphasis on usability and optimal performance using modern technologies. I have worked with clients like BBVA, Pacasmayo, and educational corporations.',
    'about.p3': 'My experience ranges from technical leadership of development teams to successful cloud migrations and architectural optimization of complex systems.',
    'about.loc.label': 'Location:',
    'about.loc.val': 'Tarma, Junín - Peru',
    'about.exp.label': 'Experience:',
    'about.exp.val': '9+ years',
    'about.disp.label': 'Availability:',
    'about.disp.val': 'Available for projects',
    'about.edu.label': 'Education:',
    'about.edu.val': 'B.S. Systems Engineering',
    'about.skills.title': 'Technical Skills',
    'about.exp.title': 'Professional Experience',

    'projects.title': 'Projects',
    'projects.subtitle': 'Some of my most notable works',
    'projects.filter.all': 'All',
    'projects.filter.frontend': 'Frontend',
    'projects.filter.backend': 'Backend',
    'projects.filter.fullstack': 'Fullstack',
    'projects.filter.mobile': 'Mobile',
    'projects.featured': '⭐ Featured',
    'projects.empty': 'No projects in this category.',
    'projects.cta.text': 'Like what you see? Let\'s work together!',
    'projects.cta.btn': 'Start Project',

    'contact.title': 'Contact',
    'contact.subtitle': 'Have a project in mind? Let\'s talk.',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.form.submitting': 'Sending...',
    'contact.form.success': 'Message sent successfully!',
    
    'theme.toggle': 'Toggle Theme',
    'lang.toggle': 'EN/ES'
  }
};

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage = new BehaviorSubject<Language>('es');
  currentLanguage$ = this.currentLanguage.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lang') as Language;
      if (savedLang === 'en' || savedLang === 'es') {
        this.setLanguage(savedLang);
      } else {
        const browserLang = navigator.language;
        if (browserLang && browserLang.startsWith('en')) {
           this.setLanguage('en');
        } else {
           this.setLanguage('es');
        }
      }
    }
  }

  setLanguage(lang: Language) {
    this.currentLanguage.next(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang);
    }
  }

  toggleLanguage() {
    this.setLanguage(this.currentLanguage.value === 'es' ? 'en' : 'es');
  }

  get currentLang(): Language {
    return this.currentLanguage.value;
  }

  translate(key: string): string {
    const translations = TRANSLATIONS[this.currentLang];
    return translations[key] || key;
  }
}
