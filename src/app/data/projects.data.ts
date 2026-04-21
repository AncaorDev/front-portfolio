import { Project } from '../models/portfolio.models';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Arquitecturas Cloud DDD/Hexagonal',
    description:
      'Liderazgo e implementación de arquitecturas escalables DDD y Hexagonal para clientes corporativos de alto nivel como Grupo Pacasmayo, BBVA y TarjetaW.',
    longDescription:
      'Gestión de migraciones cloud complejas desde App Engine hacia ecosistemas robustos con Kubernetes y Cloud Run, reduciendo la deuda técnica significativamente y mejorando el rendimiento transaccional.',
    image: '',
    technologies: ['NestJS', 'Angular', 'GCP', 'Kubernetes', 'Docker'],
    features: [
      'Arquitectura Hexagonal / DDD',
      'Migración de App Engine a Kubernetes',
      'Servicios Cloud de GCP',
      'Desarrollo de APIs transaccionales',
      'Reducción de deuda técnica',
    ],
    category: 'fullstack',
    company: 'Mediabyte',
    year: 2023,
    featured: true,
  },
  {
    id: 2,
    title: 'eCommerce / Marketplace B2B',
    description:
      'Plataforma completa de comercio electrónico y marketplaces desarrollada desde cero con arquitectura orientada a microservicios en NestJS.',
    image: '',
    technologies: ['NestJS', 'Angular', 'PostgreSQL', 'Redis'],
    features: [
      'Catálogo y carritos de alta concurrencia',
      'Gestión dinámica de inventarios',
      'Panel administrativo Fullstack',
      'Caché de consultas clave',
    ],
    category: 'fullstack',
    company: 'Freelance',
    year: 2024,
    featured: true,
  },
  {
    id: 3,
    title: 'SisGalenPlus - Web Migration',
    description:
      'Migración integral de un sistema de gestión hospitalaria Legacy de escritorio a una plataforma web moderna, manteniendo la criticidad operativa.',
    image: '',
    technologies: ['.NET Core', 'Angular', 'SQL Server'],
    features: [
      'Optimización de historia clínica digital',
      'Interfaz web fluida y accesible',
      'Migración y sincronización de datos Legacy',
      'Módulo de citas y facturación',
    ],
    category: 'fullstack',
    company: 'Freelance',
    year: 2024,
    featured: false,
  },
  {
    id: 4,
    title: 'BBVA Benefits Web',
    description:
      'Rediseño completo de la plataforma corporativa de beneficios con un enfoque estricto en Mobile-First y en mejorar la experiencia del cliente.',
    image: '',
    technologies: ['Angular', 'TypeScript', 'SCSS'],
    features: [
      'Diseño Mobile-First',
      'Redención interactiva de puntos',
      'Experiencia de Usuario (UX) optimizada',
      'Accesibilidad y rendimiento frontend',
    ],
    category: 'frontend',
    company: 'Freelance',
    year: 2024,
    featured: true,
  },
  {
    id: 5,
    title: 'BBVA BackOffice Admin',
    description:
      'Optimización de la plataforma BackOffice de BBVA, acelerando drásticamente el rendimiento mediante Lazy loading y sistemas de caché en memoria.',
    image: '',
    technologies: ['Angular', 'Redis', 'NestJS'],
    features: [
      'Caché avanzado con Redis',
      'Lazy Loading para carga inicial veloz',
      'Dashboard estadístico en tiempo real',
      'Gestión paramétrica segura',
    ],
    category: 'fullstack',
    company: 'Freelance',
    year: 2024,
    featured: false,
  },
  {
    id: 6,
    title: 'Aula Virtual Pamer',
    description:
      'Desarrollo e infraestructura de una robusta "Aula Virtual" educativa para soportar a miles de estudiantes simultáneamente con clases online.',
    image: '',
    technologies: ['ReactJS', 'NestJS', 'AWS', 'EKS', 'S3'],
    features: [
      'Transmisión y consumo de clases en vivo',
      'Almacenamiento masivo en AWS S3',
      'Backend escalable en React/Nest',
      'Sistema de evaluaciones en tiempo real',
    ],
    category: 'fullstack',
    company: 'Corp. Educativa Pamer',
    year: 2022,
    featured: true,
  },
  {
    id: 7,
    title: 'Pacasmayo Professional APIs',
    description:
      'Desarrollo y diseño de servicios y APIs clave para Pacasmayo, integrando arquitecturas Node.js para conectar sus sistemas internos.',
    image: '',
    technologies: ['Node.js', 'Express', 'MySQL'],
    features: [
      'Diseño de APIs REST corporativas',
      'Integración con ERPs',
      'Validaciones asíncronas de negocio',
    ],
    category: 'backend',
    company: 'Evolbit',
    year: 2021,
    featured: false,
  },
  {
    id: 8,
    title: 'Smiledu Platform Features',
    description:
      'Construcción y optimización de módulos Core (Registro y Pagos) para el SaaS educativo Smiledu desplegado sobre AWS.',
    image: '',
    technologies: ['Angular 7+', 'NodeJS', 'MongoDB', 'AWS'],
    features: [
      'Funnels de registro dinámicos',
      'Flujos de pago complejos vinculados a pasarelas',
      'Base de datos documental MongoDB',
    ],
    category: 'fullstack',
    company: 'Softhy S.A.C',
    year: 2019,
    featured: false,
  },
  {
    id: 9,
    title: 'Portafolios Inmobiliarios Web',
    description:
      'Diseño y desarrollo web a medida para sistemas inmobiliarios dinámicos mediante tecnologías tradicionales como PHP y jQuery.',
    image: '',
    technologies: ['PHP', 'JavaScript', 'jQuery', 'MySQL'],
    features: [
      'AJAX para carga sin recargas',
      'Paneles de administración CMS a medida',
      'Maquetación Web Master',
    ],
    category: 'frontend',
    company: 'Sistemas Inmobiliarios',
    year: 2016,
    featured: false,
  }
];
