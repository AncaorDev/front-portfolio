export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  features: string[];
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile';
  company?: string;
  year: number;
  featured?: boolean;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
  isCurrentJob: boolean;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'cloud' | 'tools';
  yearsOfExperience: number;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  category: string;
  skills: Skill[];
}

export interface ProfileInfo {
  name: string;
  fullName: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  github: string;
  linkedin: string;
  yearsOfExperience: number;
  projectsCompleted: number;
  technologiesMastered: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
