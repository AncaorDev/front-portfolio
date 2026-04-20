import { SkillCategory } from '../models/portfolio.models';

export const MOCK_SKILLS: SkillCategory[] = [
  {
    title: 'Frontend',
    category: 'frontend',
    skills: [
      { name: 'Angular', category: 'frontend', yearsOfExperience: 5 },
      { name: 'ReactJS', category: 'frontend', yearsOfExperience: 2 },
      { name: 'TypeScript', category: 'frontend', yearsOfExperience: 4 },
      { name: 'JavaScript', category: 'frontend', yearsOfExperience: 7 },
      { name: 'HTML5', category: 'frontend', yearsOfExperience: 7 },
      { name: 'CSS3/Sass', category: 'frontend', yearsOfExperience: 7 },
    ],
  },
  {
    title: 'Backend',
    category: 'backend',
    skills: [
      { name: 'NestJS', category: 'backend', yearsOfExperience: 4 },
      { name: 'ExpressJS', category: 'backend', yearsOfExperience: 5 },
      { name: 'Node.js', category: 'backend', yearsOfExperience: 5 },
      { name: 'PHP', category: 'backend', yearsOfExperience: 3 },
      { name: '.NET Core', category: 'backend', yearsOfExperience: 1 },
    ],
  },
  {
    title: 'Bases de Datos',
    category: 'database',
    skills: [
      { name: 'PostgreSQL', category: 'database', yearsOfExperience: 5 },
      { name: 'MySQL', category: 'database', yearsOfExperience: 5 },
      { name: 'SQL Server', category: 'database', yearsOfExperience: 3 },
      { name: 'MongoDB', category: 'database', yearsOfExperience: 2 },
      { name: 'Redis', category: 'database', yearsOfExperience: 2 },
    ],
  },
  {
    title: 'Cloud & DevOps',
    category: 'cloud',
    skills: [
      { name: 'GCP', category: 'cloud', yearsOfExperience: 3 },
      { name: 'AWS', category: 'cloud', yearsOfExperience: 1 },
      { name: 'Azure', category: 'cloud', yearsOfExperience: 1 },
      { name: 'Docker', category: 'cloud', yearsOfExperience: 2 },
      { name: 'Kubernetes', category: 'cloud', yearsOfExperience: 1 },
      { name: 'CI/CD', category: 'cloud', yearsOfExperience: 3 },
    ],
  },
  {
    title: 'Herramientas',
    category: 'tools',
    skills: [
      { name: 'Git/GitHub', category: 'tools', yearsOfExperience: 7 },
      { name: 'GitLab', category: 'tools', yearsOfExperience: 3 },
      { name: 'Figma', category: 'tools', yearsOfExperience: 2 },
      { name: 'Firebase', category: 'tools', yearsOfExperience: 2 },
      { name: 'Jest', category: 'tools', yearsOfExperience: 3 },
    ],
  },
];
