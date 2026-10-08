// Writes portfolio-content.json from src/app/data/*.ts, in the format of
// PUT /api/v1/portfolio/content (back-ancaor-platform/docs/PORTFOLIO-SPEC.md).
// Import it from app.ancaor.com → Mi portafolio → Importar.
import ts from 'typescript';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'portfolio-content.json');

async function load(file, name) {
  const source = await readFile(path.join(root, 'src/app/data', file), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 } });
  const dir = await mkdtemp(path.join(tmpdir(), 'ancaor-content-'));
  try {
    const target = path.join(dir, file.replace(/\.ts$/, '.mjs'));
    await writeFile(target, outputText);
    return (await import(pathToFileURL(target).href))[name];
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

const orNull = value => (typeof value === 'string' && value.trim() ? value.trim() : null);

const profile = await load('profile.data.ts', 'MOCK_PROFILE');
const projects = await load('projects.data.ts', 'MOCK_PROJECTS');
const experiences = await load('experience.data.ts', 'MOCK_EXPERIENCES');
const skills = await load('skills.data.ts', 'MOCK_SKILLS');

const content = {
  profile: {
    name: profile.name, fullName: profile.fullName, role: profile.role, email: profile.email, phone: orNull(profile.phone),
    location: profile.location, bio: profile.bio, githubUrl: orNull(profile.github), linkedinUrl: orNull(profile.linkedin), cvUrl: null,
    yearsOfExperience: profile.yearsOfExperience, projectsCompleted: profile.projectsCompleted, technologiesMastered: profile.technologiesMastered,
  },
  projects: projects.map(p => ({
    title: p.title, description: p.description, longDescription: orNull(p.longDescription), imageUrl: orNull(p.image),
    liveUrl: orNull(p.liveUrl), githubUrl: orNull(p.githubUrl), technologies: p.technologies, features: p.features,
    category: p.category, company: orNull(p.company), year: p.year, featured: !!p.featured, published: true,
  })),
  experiences: experiences.map(e => ({
    company: e.company, role: e.role, startMonth: e.startDate, endMonth: e.endDate === 'present' ? null : e.endDate,
    description: e.description, achievements: e.achievements, technologies: e.technologies, published: true,
  })),
  skills: skills.flatMap(group => group.skills.map(s => ({ name: s.name, category: s.category, yearsOfExperience: s.yearsOfExperience }))),
};

await writeFile(output, JSON.stringify(content, null, 2) + '\n');
console.log(`${path.relative(root, output)}: ${content.projects.length} proyectos, ${content.experiences.length} experiencias, ${content.skills.length} habilidades.`);
