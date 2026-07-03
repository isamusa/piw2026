import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://plateauinnovationweek.ng';

  const routes = [
    { url: '', changeFrequency: 'daily' as const, priority: 1.0 },
    { url: '/register', changeFrequency: 'daily' as const, priority: 0.9 },
    { url: '/hackathons', changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: '/partner', changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: '/students', changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: '/challenges', changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: '/exhibitions', changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: '/workshops', changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: '/career-fair', changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: '/mentors', changeFrequency: 'monthly' as const, priority: 0.7 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
