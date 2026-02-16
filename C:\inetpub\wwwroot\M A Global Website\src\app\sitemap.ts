
import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  // IMPORTANT: Replace this with your actual domain
  const baseUrl = 'https://www.your-domain.com'
 
  const staticRoutes = [
    '/',
    '/about',
    '/products',
    '/pricing',
    '/contact',
    '/order',
    '/login',
    '/cloud-x',
    '/terms',
    '/privacy',
    '/aup',
    '/sla',
    '/msa',
    '/colocation-policy',
    '/career',
  ]
 
  const staticUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1 : 0.8,
  }))
 
  return [
    ...staticUrls,
  ]
}
