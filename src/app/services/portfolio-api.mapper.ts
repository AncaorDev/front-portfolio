import { Experience, ProfileInfo, Project, SkillCategory } from '../models/portfolio.models';

/** Response of GET /api/v1/portfolio/public (back-ancaor-platform/docs/PORTFOLIO-SPEC.md). */
export interface PublicPortfolio {
  profile: {
    name: string; fullName: string; role: string; email: string; phone: string | null; location: string; bio: string;
    githubUrl: string | null; linkedinUrl: string | null; cvUrl: string | null;
    yearsOfExperience: number; projectsCompleted: number; technologiesMastered: number;
  } | null;
  projects: {
    id: string; title: string; description: string; longDescription: string | null; imageUrl: string | null;
    liveUrl: string | null; githubUrl: string | null; technologies: string[]; features: string[];
    category: Project['category']; company: string | null; year: number; featured: boolean;
  }[];
  experiences: {
    id: string; company: string; role: string; startMonth: string; endMonth: string | null;
    description: string; achievements: string[]; technologies: string[];
  }[];
  skills: { id: string; name: string; category: SkillCategory['skills'][number]['category']; yearsOfExperience: number }[];
  updatedAt: string | null;
}

export interface PortfolioContent {
  profile: ProfileInfo | null;
  cvUrl: string | null;
  projects: Project[];
  experiences: Experience[];
  skills: SkillCategory[];
}

const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
function monthLabel(month: string): string {
  const [year, value] = month.split('-');
  return `${months[Number(value) - 1] ?? ''} ${year}`;
}

const skillTitles: Record<string, string> = {
  frontend: 'Frontend', backend: 'Backend', database: 'Bases de Datos', cloud: 'Cloud & DevOps', tools: 'Herramientas',
};

export function toPortfolioContent(api: PublicPortfolio): PortfolioContent {
  const p = api.profile;
  return {
    profile: p && {
      name: p.name, fullName: p.fullName, role: p.role, email: p.email, phone: p.phone ?? '', location: p.location, bio: p.bio,
      github: p.githubUrl ?? '', linkedin: p.linkedinUrl ?? '', yearsOfExperience: p.yearsOfExperience,
      projectsCompleted: p.projectsCompleted, technologiesMastered: p.technologiesMastered,
    },
    cvUrl: p?.cvUrl ?? null,
    projects: api.projects.map(project => ({
      id: project.id, title: project.title, description: project.description,
      longDescription: project.longDescription ?? undefined, image: project.imageUrl ?? '',
      liveUrl: project.liveUrl ?? undefined, githubUrl: project.githubUrl ?? undefined,
      technologies: project.technologies, features: project.features, category: project.category,
      company: project.company ?? undefined, year: project.year, featured: project.featured,
    })),
    experiences: api.experiences.map(exp => ({
      id: exp.id, company: exp.company, role: exp.role,
      period: `${monthLabel(exp.startMonth)} - ${exp.endMonth ? monthLabel(exp.endMonth) : 'Presente'}`,
      startDate: exp.startMonth, endDate: exp.endMonth ?? 'present',
      description: exp.description, achievements: exp.achievements, technologies: exp.technologies, isCurrentJob: !exp.endMonth,
    })),
    skills: Object.keys(skillTitles)
      .map(category => ({
        title: skillTitles[category]!, category,
        skills: api.skills.filter(s => s.category === category).map(({ name, category, yearsOfExperience }) => ({ name, category, yearsOfExperience })),
      }))
      .filter(group => group.skills.length > 0),
  };
}
