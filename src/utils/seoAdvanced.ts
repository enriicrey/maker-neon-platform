// Advanced SEO utilities for production optimization

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

interface NewsletterSitemapEntry extends SitemapEntry {
  title: string;
  publishDate: string;
  language: string;
}

// SEO Configuration
export const SEO_CONFIG = {
  SITE_NAME: 'Maker Neon Platform',
  SITE_URL: 'https://maker-neon-platform.lovable.app',
  DEFAULT_TITLE: 'Maker Neon Platform - Newsletters Curadas & Drops Exclusivos',
  DEFAULT_DESCRIPTION: 'Plataforma premium de newsletters curadas y productos exclusivos. Descubre contenido de calidad y drops limitados.',
  DEFAULT_IMAGE: '/og-image.jpg',
  TWITTER_HANDLE: '@makerneon',
  FACEBOOK_APP_ID: '',
  ORGANIZATION: {
    name: 'Maker Neon Platform',
    description: 'Plataforma líder en newsletters curadas y productos exclusivos para makers',
    url: 'https://maker-neon-platform.lovable.app',
    logo: '/logo-512.png',
    foundingDate: '2024',
    contactPoint: {
      telephone: '+34-900-000-000',
      contactType: 'customer service',
      email: 'info@makerneon.com'
    },
    sameAs: [
      'https://twitter.com/makerneon',
      'https://instagram.com/makerneon',
      'https://linkedin.com/company/makerneon',
      'https://youtube.com/@makerneon'
    ]
  }
};

// Generate comprehensive meta tags
export const generateMetaTags = (page: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}) => {
  const title = page.title ? `${page.title} | ${SEO_CONFIG.SITE_NAME}` : SEO_CONFIG.DEFAULT_TITLE;
  const description = page.description || SEO_CONFIG.DEFAULT_DESCRIPTION;
  const image = page.image ? `${SEO_CONFIG.SITE_URL}${page.image}` : `${SEO_CONFIG.SITE_URL}${SEO_CONFIG.DEFAULT_IMAGE}`;
  const canonical = page.canonical || window.location.href;

  return {
    title,
    description,
    keywords: page.keywords?.join(', '),
    image,
    url: canonical,
    type: page.type || 'website',
    author: page.author || SEO_CONFIG.SITE_NAME,
    publishedTime: page.publishedTime,
    modifiedTime: page.modifiedTime,
    robots: `${page.noindex ? 'noindex' : 'index'},${page.nofollow ? 'nofollow' : 'follow'}`
  };
};

// Generate FAQ structured data
export const generateFAQStructuredData = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

// Generate review/rating structured data
export const generateReviewStructuredData = (reviews: Array<{
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
  itemReviewed: string;
}>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1
    },
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1
      },
      reviewBody: review.reviewBody,
      datePublished: review.datePublished
    }))
  };
};

// Generate WebSite structured data with search box
export const generateWebsiteStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_CONFIG.SITE_NAME,
    url: SEO_CONFIG.SITE_URL,
    description: SEO_CONFIG.DEFAULT_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.ORGANIZATION.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SEO_CONFIG.SITE_URL}${SEO_CONFIG.ORGANIZATION.logo}`
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SEO_CONFIG.SITE_URL}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
};

// Generate Newsletter Article structured data
export const generateNewsletterStructuredData = (newsletter: {
  id: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  author: string;
  image?: string;
  tags?: string[];
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SEO_CONFIG.SITE_URL}/newsletters/${newsletter.id}`,
    headline: newsletter.title,
    description: newsletter.description,
    articleBody: newsletter.content,
    datePublished: newsletter.publishedAt,
    dateModified: newsletter.publishedAt,
    author: {
      '@type': 'Person',
      name: newsletter.author
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.ORGANIZATION.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SEO_CONFIG.SITE_URL}${SEO_CONFIG.ORGANIZATION.logo}`
      }
    },
    image: newsletter.image ? {
      '@type': 'ImageObject',
      url: `${SEO_CONFIG.SITE_URL}${newsletter.image}`,
      width: 1200,
      height: 630
    } : undefined,
    keywords: newsletter.tags?.join(', '),
    articleSection: 'Newsletter',
    isPartOf: {
      '@type': 'Website',
      name: SEO_CONFIG.SITE_NAME,
      url: SEO_CONFIG.SITE_URL
    }
  };
};

// Generate Product structured data for drops
export const generateProductStructuredData = (product: {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  brand: string;
  category: string;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
  condition: 'New' | 'Used' | 'Refurbished';
  sku?: string;
  gtin?: string;
  reviews?: Array<{
    author: string;
    rating: number;
    reviewBody: string;
    datePublished: string;
  }>;
}) => {
  const aggregateRating = product.reviews?.length ? {
    '@type': 'AggregateRating',
    ratingValue: product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length,
    reviewCount: product.reviews.length,
    bestRating: 5,
    worstRating: 1
  } : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SEO_CONFIG.SITE_URL}/drops/${product.id}`,
    name: product.name,
    description: product.description,
    image: `${SEO_CONFIG.SITE_URL}${product.image}`,
    brand: {
      '@type': 'Brand',
      name: product.brand
    },
    category: product.category,
    sku: product.sku,
    gtin: product.gtin,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: `https://schema.org/${product.availability}`,
      itemCondition: `https://schema.org/${product.condition}Condition`,
      seller: {
        '@type': 'Organization',
        name: SEO_CONFIG.ORGANIZATION.name
      },
      url: `${SEO_CONFIG.SITE_URL}/drops/${product.id}`
    },
    aggregateRating,
    review: product.reviews?.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1
      },
      reviewBody: review.reviewBody,
      datePublished: review.datePublished
    }))
  };
};

// Generate breadcrumb navigation
export const generateBreadcrumbs = (path: string) => {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs = [
    { name: 'Inicio', url: '/' }
  ];

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const name = segment.charAt(0).toUpperCase() + segment.slice(1);
    breadcrumbs.push({
      name: name === 'Newsletters' ? 'Newsletters' : name === 'Drops' ? 'Drops' : name,
      url: currentPath
    });
  });

  return breadcrumbs;
};

// Hreflang generation for internationalization
export const generateHreflangTags = (currentPath: string) => {
  const languages = [
    { code: 'es', region: 'ES', label: 'Español' },
    { code: 'en', region: 'US', label: 'English' },
    { code: 'fr', region: 'FR', label: 'Français' }
  ];

  return languages.map(lang => ({
    hreflang: `${lang.code}-${lang.region}`,
    href: `${SEO_CONFIG.SITE_URL}/${lang.code}${currentPath}`
  }));
};

// Security headers for SEO and security
export const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.makerneon.com wss://api.makerneon.com;"
};