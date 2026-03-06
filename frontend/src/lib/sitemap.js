/**
 * Sitemap Generator Utility
 * Generates sitemap.xml from API data
 */

const BASE_URL = 'https://toybola.com'

export async function generateSitemap(products = [], categories = []) {
  const urls = []

  // Static pages
  const staticPages = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/about', changefreq: 'monthly', priority: '0.9' },
    { path: '/catalog', changefreq: 'weekly', priority: '0.9' },
    { path: '/production', changefreq: 'monthly', priority: '0.8' },
    { path: '/contacts', changefreq: 'monthly', priority: '0.8' },
    { path: '/terms', changefreq: 'yearly', priority: '0.5' },
    { path: '/privacy', changefreq: 'yearly', priority: '0.5' }
  ]

  const today = new Date().toISOString().split('T')[0]

  // Add static pages
  staticPages.forEach(page => {
    urls.push(createUrlEntry(page.path, today, page.changefreq, page.priority))
  })

  // Add categories
  categories.forEach(category => {
    urls.push(createUrlEntry(
      `/catalog/${category.slug}`,
      today,
      'weekly',
      '0.8'
    ))
  })

  // Add products
  products.forEach(product => {
    const lastmod = product.updatedAt 
      ? new Date(product.updatedAt).toISOString().split('T')[0]
      : today
    
    urls.push(createUrlEntry(
      `/product/${product.slug}`,
      lastmod,
      'weekly',
      '0.8',
      product.images?.[0]?.imageUrl
    ))
  })

  return createSitemapXML(urls)
}

function createUrlEntry(loc, lastmod, changefreq, priority, image = null) {
  return {
    loc: `${BASE_URL}${loc}`,
    lastmod,
    changefreq,
    priority,
    image
  }
}

function createSitemapXML(urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
  xml += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n'
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n'
  xml += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n'
  xml += '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n'

  urls.forEach(url => {
    xml += '  <url>\n'
    xml += `    <loc>${url.loc}</loc>\n`
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`
    xml += `    <priority>${url.priority}</priority>\n`
    
    if (url.image) {
      xml += '    <image:image>\n'
      xml += `      <image:loc>${url.image}</image:loc>\n`
      xml += '    </image:image>\n'
    }
    
    xml += '  </url>\n'
  })

  xml += '</urlset>'
  return xml
}

// For Node.js usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateSitemap }
}
