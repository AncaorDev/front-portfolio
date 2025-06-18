import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Project {
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  technologies: string[];
  features: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  projects: Project[] = [
    {
      title: 'E-commerce Platform',
      description: 'Plataforma completa de comercio electrónico con carrito de compras, sistema de pagos y panel de administración.',
      image: 'assets/images/project1.jpg',
      liveUrl: 'https://demo-ecommerce.com',
      githubUrl: 'https://github.com/ancaor/ecommerce',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe'],
      features: [
        'Carrito de compras avanzado',
        'Sistema de pagos integrado',
        'Panel de administración',
        'Gestión de inventario'
      ]
    },
    {
      title: 'Task Management App',
      description: 'Aplicación de gestión de tareas con drag & drop, categorización y notificaciones en tiempo real.',
      image: 'assets/images/project2.jpg',
      liveUrl: 'https://task-manager-demo.com',
      githubUrl: 'https://github.com/ancaor/task-manager',
      technologies: ['React', 'Firebase', 'TypeScript', 'Tailwind'],
      features: [
        'Drag & drop de tareas',
        'Categorización inteligente',
        'Notificaciones push',
        'Sincronización en tiempo real'
      ]
    },
    {
      title: 'Weather Dashboard',
      description: 'Dashboard meteorológico con pronósticos detallados, mapas interactivos y datos históricos.',
      image: 'assets/images/project3.jpg',
      liveUrl: 'https://weather-dashboard.com',
      githubUrl: 'https://github.com/ancaor/weather-app',
      technologies: ['Vue.js', 'OpenWeather API', 'Chart.js', 'PWA'],
      features: [
        'Pronósticos detallados',
        'Mapas interactivos',
        'Datos históricos',
        'Aplicación PWA'
      ]
    },
    {
      title: 'Blog Platform',
      description: 'Plataforma de blogging con editor rico, sistema de comentarios y SEO optimizado.',
      image: 'assets/images/project4.jpg',
      liveUrl: 'https://blog-platform.com',
      githubUrl: 'https://github.com/ancaor/blog-platform',
      technologies: ['Next.js', 'PostgreSQL', 'Prisma', 'Vercel'],
      features: [
        'Editor de texto rico',
        'Sistema de comentarios',
        'SEO optimizado',
        'Deploy automático'
      ]
    },
    {
      title: 'Real-time Chat',
      description: 'Aplicación de chat en tiempo real con mensajes privados, grupos y notificaciones push.',
      image: 'assets/images/project5.jpg',
      liveUrl: 'https://chat-app-demo.com',
      githubUrl: 'https://github.com/ancaor/chat-app',
      technologies: ['Socket.io', 'Express', 'MongoDB', 'JWT'],
      features: [
        'Chat en tiempo real',
        'Mensajes privados',
        'Grupos de chat',
        'Notificaciones push'
      ]
    },
    {
      title: 'Portfolio Website',
      description: 'Sitio web personal con diseño moderno, navegación horizontal y animaciones fluidas.',
      image: 'assets/images/project6.jpg',
      liveUrl: 'https://ancaor.dev',
      githubUrl: 'https://github.com/ancaor/portfolio',
      technologies: ['Angular', 'SCSS', 'TypeScript', 'Responsive'],
      features: [
        'Navegación horizontal',
        'Animaciones fluidas',
        'Diseño responsive',
        'Optimizado para SEO'
      ]
    }
  ];

  scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
