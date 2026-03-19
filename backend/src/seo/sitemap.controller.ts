import { Controller, Get, Header } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('SEO')
@Controller('sitemap.xml')
export class SitemapController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @Header('Content-Type', 'application/xml')
  @ApiOperation({ summary: 'Generate sitemap.xml for SEO' })
  async generateSitemap(): Promise<string> {
    const baseUrl = process.env.BASE_URL || 'https://toybola.uz';

    // Get all products
    const products = await this.prisma.product.findMany({
      select: { slug: true, updatedAt: true },
      where: { availability: 'in_stock' }
    });

    // Get all categories
    const categories = await this.prisma.category.findMany({
      select: { slug: true, updatedAt: true },
      where: { isActive: true }
    });

    // Get all subcategories
    const subcategories = await this.prisma.subcategory.findMany({
      select: { slug: true, updatedAt: true, category: { select: { slug: true } } },
      where: { isActive: true }
    });

    // Build XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Catalog -->
  <url>
    <loc>${baseUrl}/catalog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- About -->
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Contacts -->
  <url>
    <loc>${baseUrl}/contacts</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;

    // Add categories
    categories.forEach(cat => {
      xml += `  <url>
    <loc>${baseUrl}/catalog/${cat.slug}</loc>
    <lastmod>${cat.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    });

    // Add subcategories
    subcategories.forEach(subcat => {
      xml += `  <url>
    <loc>${baseUrl}/catalog/${subcat.category?.slug || 'category'}/${subcat.slug}</loc>
    <lastmod>${subcat.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    });

    // Add products
    products.forEach(product => {
      xml += `  <url>
    <loc>${baseUrl}/product/${product.slug}</loc>
    <lastmod>${product.updatedAt.toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.6</priority>
  </url>
`;
    });

    xml += `</urlset>`;
    return xml;
  }
}
