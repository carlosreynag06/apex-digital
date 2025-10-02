import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.iqintegrations.com';

  // List of all pages from the codebase
  const pages = [
    '/',
    '/about-us',
    '/contact',
    '/faq',
    '/portfolio',
    '/prices',
    '/privacy-policy',
    '/services',
    '/services/crm',
    '/terms-of-service',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = pages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: path === '/' ? 1.0 : 0.8,
  }));

  // Lower priority for legal pages
  sitemapEntries.forEach((entry) => {
    if (
      entry.url.includes('privacy-policy') ||
      entry.url.includes('terms-of-service')
    ) {
      entry.priority = 0.5;
      entry.changeFrequency = 'yearly';
    }
  });

  return sitemapEntries;
}