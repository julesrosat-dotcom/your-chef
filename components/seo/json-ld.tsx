import Script from 'next/script';
import { APP_NAME, APP_URL, CONTACT } from '@/lib/constants';

interface OrganizationSchemaProps {
  url?: string;
}

export function OrganizationSchema({ url = APP_URL }: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: APP_NAME,
    url,
    logo: `${url}/logo.png`,
    sameAs: [
      'https://www.facebook.com/getchef',
      'https://www.instagram.com/getchef',
      'https://twitter.com/getchef',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT.phone,
      contactType: 'customer service',
      availableLanguage: 'French',
    },
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ChefSchemaProps {
  chef: {
    name: string;
    image: string;
    description: string;
    location: string;
    rating: number;
    reviewCount: number;
    priceRange: string;
    slug: string;
  };
}

export function ChefSchema({ chef }: ChefSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${APP_URL}/chefs/${chef.slug}`,
    name: chef.name,
    image: chef.image,
    description: chef.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: chef.location,
      addressCountry: 'FR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: chef.rating,
      reviewCount: chef.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    priceRange: chef.priceRange,
    url: `${APP_URL}/chefs/${chef.slug}`,
  };

  return (
    <Script
      id={`chef-schema-${chef.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQSchemaProps {
  faqs: { question: string; answer: string }[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebsiteSchemaProps {
  url?: string;
  name?: string;
}

export function WebsiteSchema({ url = APP_URL, name = APP_NAME }: WebsiteSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/chefs?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ReviewSchemaProps {
  review: {
    author: string;
    rating: number;
    text: string;
    datePublished: string;
  };
  itemReviewed: {
    name: string;
    type: string;
  };
}

export function ReviewSchema({ review, itemReviewed }: ReviewSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: review.text,
    datePublished: review.datePublished,
    itemReviewed: {
      '@type': itemReviewed.type,
      name: itemReviewed.name,
    },
  };

  return (
    <Script
      id="review-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
