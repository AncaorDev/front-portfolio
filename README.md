# Anthony Cajacuri - Portfolio Personal

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![SEO Optimized](https://img.shields.io/badge/SEO-Optimized-green?style=for-the-badge)

Portfolio personal de **Anthony Cajacuri**, desarrollador Full Stack especializado en Angular, React, Node.js y tecnologías web modernas. Este proyecto está completamente optimizado para SEO y ofrece una experiencia de usuario excepcional.

## 🚀 Características

- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **SEO Optimizado**: Meta tags, Open Graph, Twitter Cards, Structured Data
- **Server-Side Rendering (SSR)**: Mejor rendimiento y SEO
- **PWA Ready**: Manifest y configuración para Progressive Web App
- **Navegación por Teclado**: Accesibilidad completa
- **Componentes Modulares**: Arquitectura limpia y mantenible

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Angular 19, TypeScript, SCSS
- **Build Tool**: Angular CLI
- **Server**: Node.js, Express
- **SEO**: Meta tags, JSON-LD, Sitemap, Robots.txt
- **Deployment**: AWS Amplify Hosting


## 📁 Estructura del Proyecto

```
front-ancaor/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── hero/          # Sección principal
│   │   │   ├── about/         # Sobre mí
│   │   │   ├── projects/      # Proyectos
│   │   │   └── contact/       # Contacto
│   │   ├── services/
│   │   │   └── seo.service.ts # Servicio SEO
│   │   └── app.component.ts   # Componente principal
│   ├── assets/
│   │   └── ancaor-logo.png    # Logo del portfolio
│   ├── index.html             # HTML principal con SEO
│   ├── robots.txt             # Instrucciones para crawlers
│   ├── sitemap.xml            # Sitemap XML
│   └── manifest.json          # Web App Manifest
├── server.ts                  # Servidor Express con SSR
└── angular.json               # Configuración Angular
```

## 🚀 Instalación y Desarrollo

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Angular CLI

### Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/AncaorDev/front-portfolio.git
   cd front-portfolio
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Servidor de desarrollo**
   ```bash
   npm run start:dev
   ```
   Navega a `http://localhost:4100/`

### Scripts Disponibles

- `npm run start:dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run start` - Servidor de producción con SSR
- `npm run test` - Ejecutar tests unitarios
- `npm run export:content` - Genera `portfolio-content.json` (gitignored, datos personales) para importarlo en app.ancaor.com

## Contenido desde el API

El sitio pide `GET {apiUrl}/portfolio/public`. Si el API no responde en 4 s, falla o todavía no tiene perfil, se muestran los datos incluidos en `src/app/data`. El HTML prerenderizado se hidrata con ese mismo contenido y el navegador lo sustituye cuando el API responde, sin duplicar nodos. El formulario de contacto hace `POST /portfolio/public/contact` (el campo oculto `website` es un honeypot).

`environment.ts` apunta al gateway local (`http://localhost:4400/api/v1`, `useMockData: false`). `environment.prod.ts` apunta al API desplegado y mantiene `useMockData: true`: ancaor.com sigue con los datos locales hasta que el servicio Portfolio esté desplegado y `https://ancaor.com` esté en CORS. Entonces hay que pasar `useMockData` a `false`.

## 🔧 Configuración SEO

El proyecto incluye una implementación completa de SEO:

### Meta Tags

- Títulos dinámicos y descriptivos
- Descripciones optimizadas para búsquedas
- Keywords relevantes
- Open Graph para redes sociales
- Twitter Cards

### Datos Estructurados

- Schema de Persona (JSON-LD)
- Información profesional estructurada
- Enlaces a redes sociales

### Archivos Técnicos

- `robots.txt` - Instrucciones de crawling
- `sitemap.xml` - Sitemap para indexación
- `manifest.json` - Configuración PWA

### Servicio SEO

```typescript
// Ejemplo de uso del servicio SEO
import { SeoService } from './services/seo.service';

constructor(private seoService: SeoService) {}

ngOnInit() {
  this.seoService.updateSEO({
    title: 'Página Personalizada',
    description: 'Descripción personalizada',
    keywords: 'palabras, clave, relevantes'
  });
}
```

## 📱 Características de Accesibilidad

- Navegación completa por teclado
- Flechas izquierda/derecha para navegar entre secciones
- Teclas Home/End para ir al inicio/final
- Estructura semántica HTML
- ARIA labels donde sea necesario

## Despliegue

### AWS Amplify Hosting (estático + prerender)

El sitio se publica como estáticos prerenderizados. Amplify construye con [`amplify.yml`](amplify.yml) y sirve `dist/front-ancaor/browser` desde el CDN.

#### 1. Conectar el repositorio

1. En la [consola de Amplify](https://console.aws.amazon.com/amplify/), elige **Host web app**.
2. Conecta el repositorio de GitHub y la rama `main`.
3. Confirma que detecta `amplify.yml` (plataforma de hosting estático, no SSR).
4. Guarda y deja que termine el primer build.

#### 2. Rewrite SPA

En **Hosting → Rewrites and redirects**, abre el editor JSON y pega el contenido de [`amplify-redirects.json`](amplify-redirects.json). Esa regla reescribe rutas sin extensión de archivo a `/index.html` (status `200`).

#### 3. Dominio y subdominios

1. Ve a **Hosting → Custom domains** y añade `ancaor.com`.
2. Asocia el apex (`ancaor.com`) y `www` a la rama `main` (o redirige `www` → apex).
3. Añade más subdominios si los necesitas (por ejemplo `staging` → rama `staging`).
4. En tu DNS (Route 53 u otro proveedor), crea los registros CNAME / A / ALIAS que indique Amplify.
5. Espera a que el certificado HTTPS gestionado por Amplify quede activo.

Cada push a la rama conectada dispara un nuevo deploy automático.

### Rollback / App Engine (manual)

`app.yaml` y el workflow de GitHub Actions se mantienen solo como respaldo. **No se ejecutan en push**: hay que lanzarlos a mano desde Actions → **Deploy to App Engine** → **Run workflow**, o localmente con `npm run deploy:appengine`.

## 📊 Monitoreo y Analytics

### Herramientas Recomendadas

- **Google Search Console**: Para monitoreo de SEO
- **Google Analytics 4**: Para análisis de tráfico
- **Google PageSpeed Insights**: Para métricas de rendimiento
- **Schema.org Validator**: Para validar datos estructurados

### Métricas SEO a Monitorear

- Core Web Vitals
- Posicionamiento en búsquedas
- Tiempo de carga
- Tasa de rebote
- Engagement en redes sociales

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Anthony Cajacuri**

- GitHub: [@AncaorDev](https://github.com/AncaorDev)
- LinkedIn: [Anthony Cajacuri](https://linkedin.com/in/anthony-cajacuri)
- Portfolio: [ancaor.com](https://ancaor.com)

## 🙏 Agradecimientos

- Angular Team por el framework
- Comunidad de desarrolladores
- Herramientas de SEO y desarrollo web

---

⭐ Si este proyecto te ha sido útil, ¡no olvides darle una estrella en GitHub!
