import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://nad.finance',
      lastModified: new Date('2025-02-10'), 
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://nad.finance/swap',
      lastModified: new Date('2025-02-10'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}