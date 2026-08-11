import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bd-travel-spirit.vercel.app';
  
  // Static routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/destinations',
    '/tours',
    '/all-tours',
    '/articles',
    '/operators',
    '/privacy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}
