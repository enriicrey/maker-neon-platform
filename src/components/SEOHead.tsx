import React from 'react';
import { Helmet } from 'react-helmet-async';
import { generateMetaTags, SEO_CONFIG } from '@/utils/seoAdvanced';

interface SEOHeadProps {
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
  hreflangAlternates?: Array<{ hreflang: string; href: string }>;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  canonical,
  noindex = false,
  nofollow = false,
  structuredData,
  hreflangAlternates = []
}) => {
  const metaTags = generateMetaTags({
    title,
    description,
    keywords,
    image,
    type,
    author,
    publishedTime,
    modifiedTime,
    canonical,
    noindex,
    nofollow
  });

  const robotsContent = `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{metaTags.title}</title>
      <meta name="description" content={metaTags.description} />
      {keywords && <meta name="keywords" content={metaTags.keywords} />}
      {author && <meta name="author" content={metaTags.author} />}
      <meta name="robots" content={robotsContent} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={metaTags.title} />
      <meta property="og:description" content={metaTags.description} />
      <meta property="og:type" content={metaTags.type} />
      <meta property="og:url" content={metaTags.url} />
      <meta property="og:image" content={metaTags.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SEO_CONFIG.SITE_NAME} />
      <meta property="og:locale" content="es_ES" />
      
      {/* Article specific meta tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SEO_CONFIG.TWITTER_HANDLE} />
      <meta name="twitter:creator" content={SEO_CONFIG.TWITTER_HANDLE} />
      <meta name="twitter:title" content={metaTags.title} />
      <meta name="twitter:description" content={metaTags.description} />
      <meta name="twitter:image" content={metaTags.image} />
      
      {/* Facebook Meta Tags */}
      {SEO_CONFIG.FACEBOOK_APP_ID && (
        <meta property="fb:app_id" content={SEO_CONFIG.FACEBOOK_APP_ID} />
      )}
      
      {/* Hreflang Alternate Links */}
      {hreflangAlternates.map((alternate, index) => (
        <link
          key={index}
          rel="alternate"
          hrefLang={alternate.hreflang}
          href={alternate.href}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={SEO_CONFIG.SITE_URL} />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      <meta name="theme-color" content="#8B5CF6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={SEO_CONFIG.SITE_NAME} />
      
      {/* Performance Optimization */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Default Organization Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: SEO_CONFIG.ORGANIZATION.name,
          description: SEO_CONFIG.ORGANIZATION.description,
          url: SEO_CONFIG.ORGANIZATION.url,
          logo: {
            '@type': 'ImageObject',
            url: `${SEO_CONFIG.SITE_URL}${SEO_CONFIG.ORGANIZATION.logo}`
          },
          foundingDate: SEO_CONFIG.ORGANIZATION.foundingDate,
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: SEO_CONFIG.ORGANIZATION.contactPoint.telephone,
            contactType: SEO_CONFIG.ORGANIZATION.contactPoint.contactType,
            email: SEO_CONFIG.ORGANIZATION.contactPoint.email
          },
          sameAs: SEO_CONFIG.ORGANIZATION.sameAs
        })}
      </script>
      
      {/* Website Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SEO_CONFIG.SITE_NAME,
          url: SEO_CONFIG.SITE_URL,
          description: SEO_CONFIG.DEFAULT_DESCRIPTION,
          publisher: {
            '@type': 'Organization',
            name: SEO_CONFIG.ORGANIZATION.name
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${SEO_CONFIG.SITE_URL}/search?q={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;