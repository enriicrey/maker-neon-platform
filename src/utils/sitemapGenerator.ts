// Dynamic sitemap generation utilities

interface SitemapURL {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

interface NewsItem {
  loc: string;
  lastmod: string;
  news: {
    title: string;
    publication_date: string;
    language: string;
  };
}

export const generateSitemap = (urls: SitemapURL[]): string => {
  const urlEntries = urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};

export const generateNewsSitemap = (newsItems: NewsItem[]): string => {
  const newsEntries = newsItems.map(item => `
  <url>
    <loc>${item.loc}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <news:news>
      <news:publication>
        <news:name>Maker Neon Platform</news:name>
        <news:language>${item.news.language}</news:language>
      </news:publication>
      <news:publication_date>${item.news.publication_date}</news:publication_date>
      <news:title>${item.news.title}</news:title>
    </news:news>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${newsEntries}
</urlset>`;
};

export const generateImageSitemap = (images: Array<{
  loc: string;
  title: string;
  caption?: string;
  geo_location?: string;
  license?: string;
}>): string => {
  const imageEntries = images.map(img => `
  <url>
    <loc>${img.loc}</loc>
    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${img.title}</image:title>
      ${img.caption ? `<image:caption>${img.caption}</image:caption>` : ''}
      ${img.geo_location ? `<image:geo_location>${img.geo_location}</image:geo_location>` : ''}
      ${img.license ? `<image:license>${img.license}</image:license>` : ''}
    </image:image>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imageEntries}
</urlset>`;
};

export const generateSitemapIndex = (sitemaps: Array<{
  loc: string;
  lastmod: string;
}>): string => {
  const sitemapEntries = sitemaps.map(sitemap => `
  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;
};