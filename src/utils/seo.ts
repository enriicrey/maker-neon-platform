// SEO optimization utilities

interface MetaTagData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const updateMetaTags = (data: MetaTagData): void => {
  if (typeof document === 'undefined') return;

  // Update title
  if (data.title) {
    document.title = data.title;
    updateMetaTag('property', 'og:title', data.title);
    updateMetaTag('name', 'twitter:title', data.title);
  }

  // Update description
  if (data.description) {
    updateMetaTag('name', 'description', data.description);
    updateMetaTag('property', 'og:description', data.description);
    updateMetaTag('name', 'twitter:description', data.description);
  }

  // Update keywords
  if (data.keywords) {
    updateMetaTag('name', 'keywords', data.keywords);
  }

  // Update Open Graph image
  if (data.image) {
    updateMetaTag('property', 'og:image', data.image);
    updateMetaTag('name', 'twitter:image', data.image);
  }

  // Update canonical URL
  if (data.url) {
    updateMetaTag('property', 'og:url', data.url);
    updateLinkTag('canonical', data.url);
  }

  // Update Open Graph type
  if (data.type) {
    updateMetaTag('property', 'og:type', data.type);
  }

  // Update author
  if (data.author) {
    updateMetaTag('name', 'author', data.author);
  }

  // Update article times
  if (data.publishedTime) {
    updateMetaTag('property', 'article:published_time', data.publishedTime);
  }

  if (data.modifiedTime) {
    updateMetaTag('property', 'article:modified_time', data.modifiedTime);
  }
};

const updateMetaTag = (attribute: string, value: string, content: string): void => {
  let element = document.querySelector(`meta[${attribute}="${value}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
};

const updateLinkTag = (rel: string, href: string): void => {
  let element = document.querySelector(`link[rel="${rel}"]`);
  
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  
  element.setAttribute('href', href);
};

// Generate structured data (JSON-LD)
export const generateStructuredData = (type: string, data: any): string => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };
  
  return JSON.stringify(structuredData);
};

// Insert structured data script
export const insertStructuredData = (data: string): void => {
  if (typeof document === 'undefined') return;
  
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = data;
  document.head.appendChild(script);
};

// Generate breadcrumb structured data
export const generateBreadcrumbData = (breadcrumbs: Array<{ name: string; url: string }>): string => {
  return generateStructuredData('BreadcrumbList', {
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  });
};

// Generate article structured data
export const generateArticleData = (article: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
  publisher: string;
}): string => {
  return generateStructuredData('Article', {
    headline: article.headline,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: article.publisher
    }
  });
};

// Generate product structured data
export const generateProductData = (product: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  availability: string;
  brand: string;
}): string => {
  return generateStructuredData('Product', {
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: `https://schema.org/${product.availability}`
    },
    brand: {
      '@type': 'Brand',
      name: product.brand
    }
  });
};