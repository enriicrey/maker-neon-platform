import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateMetaTags, insertStructuredData, generateStructuredData } from '@/utils/seo';

interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: any;
}

export const useSEO = (data: SEOData) => {
  const location = useLocation();

  useEffect(() => {
    const fullUrl = `${window.location.origin}${location.pathname}`;
    
    // Update meta tags
    updateMetaTags({
      ...data,
      url: fullUrl
    });

    // Insert structured data if provided
    if (data.structuredData) {
      const jsonLD = generateStructuredData(data.structuredData.type, data.structuredData.data);
      insertStructuredData(jsonLD);
    }

    // Add default structured data for organization
    const organizationData = generateStructuredData('Organization', {
      name: 'Drop3D Newsletter',
      description: 'La newsletter que está revolucionando la impresión 3D',
      url: window.location.origin,
      logo: `${window.location.origin}/logo.png`,
      sameAs: [
        'https://twitter.com/drop3d',
        'https://instagram.com/drop3d',
        'https://linkedin.com/company/drop3d'
      ]
    });
    
    insertStructuredData(organizationData);
  }, [data, location.pathname]);
};