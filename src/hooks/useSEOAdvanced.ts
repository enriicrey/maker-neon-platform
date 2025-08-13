import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { generateMetaTags, generateBreadcrumbs, generateHreflangTags, SEO_CONFIG } from '@/utils/seoAdvanced';
import { updateMetaTags, insertStructuredData } from '@/utils/seo';

interface SEOPageData {
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
  structuredData?: any;
  breadcrumbs?: boolean;
  hreflang?: boolean;
}

export const useSEOAdvanced = (pageData: SEOPageData = {}) => {
  const location = useLocation();

  useEffect(() => {
    // Generate and update meta tags
    const metaTags = generateMetaTags(pageData);
    updateMetaTags(metaTags);

    // Add robots meta tag
    const robotsContent = `${pageData.noindex ? 'noindex' : 'index'},${pageData.nofollow ? 'nofollow' : 'follow'}`;
    updateRobotsTag(robotsContent);

    // Add viewport meta tag for mobile optimization
    updateViewportTag('width=device-width, initial-scale=1.0, viewport-fit=cover');

    // Add theme color for PWA
    updateThemeColorTag('#8B5CF6');

    // Generate and insert structured data
    if (pageData.structuredData) {
      insertStructuredData(JSON.stringify(pageData.structuredData));
    }

    // Generate breadcrumbs structured data
    if (pageData.breadcrumbs !== false) {
      const breadcrumbs = generateBreadcrumbs(location.pathname);
      const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: `${SEO_CONFIG.SITE_URL}${crumb.url}`
        }))
      };
      insertBreadcrumbData(JSON.stringify(breadcrumbData));
    }

    // Generate hreflang tags for internationalization
    if (pageData.hreflang !== false) {
      const hreflangTags = generateHreflangTags(location.pathname);
      updateHreflangTags(hreflangTags);
    }

    // Add preconnect links for performance
    addPreconnectLinks([
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://api.makerneon.com',
      'https://cdn.makerneon.com'
    ]);

    // Add DNS prefetch for third-party domains
    addDNSPrefetchLinks([
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com',
      'https://connect.facebook.net'
    ]);

  }, [location.pathname, pageData]);
};

// Helper functions for meta tag management
const updateRobotsTag = (content: string) => {
  let robotsTag = document.querySelector('meta[name="robots"]');
  if (!robotsTag) {
    robotsTag = document.createElement('meta');
    robotsTag.setAttribute('name', 'robots');
    document.head.appendChild(robotsTag);
  }
  robotsTag.setAttribute('content', content);
};

const updateViewportTag = (content: string) => {
  let viewportTag = document.querySelector('meta[name="viewport"]');
  if (!viewportTag) {
    viewportTag = document.createElement('meta');
    viewportTag.setAttribute('name', 'viewport');
    document.head.appendChild(viewportTag);
  }
  viewportTag.setAttribute('content', content);
};

const updateThemeColorTag = (color: string) => {
  let themeColorTag = document.querySelector('meta[name="theme-color"]');
  if (!themeColorTag) {
    themeColorTag = document.createElement('meta');
    themeColorTag.setAttribute('name', 'theme-color');
    document.head.appendChild(themeColorTag);
  }
  themeColorTag.setAttribute('content', color);
};

const insertBreadcrumbData = (data: string) => {
  const existingScript = document.querySelector('script[data-type="breadcrumb"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-type', 'breadcrumb');
  script.textContent = data;
  document.head.appendChild(script);
};

const updateHreflangTags = (hreflangTags: Array<{ hreflang: string; href: string }>) => {
  // Remove existing hreflang tags
  const existingTags = document.querySelectorAll('link[hreflang]');
  existingTags.forEach(tag => tag.remove());

  // Add new hreflang tags
  hreflangTags.forEach(tag => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = tag.hreflang;
    link.href = tag.href;
    document.head.appendChild(link);
  });

  // Add x-default hreflang
  const defaultLink = document.createElement('link');
  defaultLink.rel = 'alternate';
  defaultLink.hreflang = 'x-default';
  defaultLink.href = SEO_CONFIG.SITE_URL;
  document.head.appendChild(defaultLink);
};

const addPreconnectLinks = (domains: string[]) => {
  domains.forEach(domain => {
    if (!document.querySelector(`link[rel="preconnect"][href="${domain}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  });
};

const addDNSPrefetchLinks = (domains: string[]) => {
  domains.forEach(domain => {
    if (!document.querySelector(`link[rel="dns-prefetch"][href="${domain}"]`)) {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    }
  });
};