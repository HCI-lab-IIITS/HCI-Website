import type { MetadataRoute } from 'next';
import projectsData from '@/data/projects.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://himangshu.net';

  // Base static routes
  const routes = [
    '',
    '/projects',
    '/publications',
    '/people',
    '/news',
    '/facilities',
    '/xr-hack-25',
    '/global-game-jam',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic project routes (by ID and slug)
  const projectRoutes = projectsData.projects.flatMap((project) => [
    {
      url: `${baseUrl}/projects/${project.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
  ]);

  return [...routes, ...projectRoutes];
}
