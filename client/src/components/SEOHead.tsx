import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const DEFAULT_TITLE = 'Heritage Palate by Meghna | Timeless Handcrafted Indian Luxury Wear';
const DEFAULT_DESC =
  'Heritage Palate by Meghna celebrates timeless Indian craftsmanship. Discover authentic Lucknowi Chikankari, heirloom Banarasi silk sarees, and royal kalidar Anarkalis tailored with bespoke precision.';
const DEFAULT_KEYWORDS =
  'Heritage Palate by Meghna, handcrafted Chikankari, Lucknowi Chikankari suits, Banarasi silk sarees, pure Katan silk saree, designer Anarkali suits, luxury Indian ethnic wear, handcrafted bridal wear, Varanasi handloom, Chanderi sarees, artisanal Indian fashion, buy Chikankari online';
const BASE_URL = 'https://heritage-palate-by-meghna.onrender.com';
const DEFAULT_IMAGE = `${BASE_URL}/assets/hpm_emblem_hd.png`;

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description = DEFAULT_DESC,
  keywords = DEFAULT_KEYWORDS,
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  schema,
}) => {
  const location = useLocation();
  const pageTitle = title ? `${title} | Heritage Palate by Meghna` : DEFAULT_TITLE;
  const canonicalUrl = canonical || `${BASE_URL}${location.pathname}`;
  const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`;

  useEffect(() => {
    // 1. Update Title
    document.title = pageTitle;

    // Helper to create or update meta tags
    const setMeta = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard meta
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Open Graph
    setMeta('property', 'og:title', pageTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', fullImageUrl);
    setMeta('property', 'og:site_name', 'Heritage Palate by Meghna');
    setMeta('property', 'og:locale', 'en_IN');

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', pageTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', fullImageUrl);

    // Structured Data (JSON-LD) injection
    const scriptId = 'dynamic-page-schema-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Cleanup dynamic schema on route change if needed
      const oldScript = document.getElementById(scriptId);
      if (oldScript) oldScript.remove();
    };
  }, [pageTitle, description, keywords, canonicalUrl, ogType, fullImageUrl, schema]);

  return null;
};

export default SEOHead;
