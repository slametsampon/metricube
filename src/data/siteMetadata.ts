// src/data/siteMetadata.ts

export interface SiteMetadata {
  title: string;
  version: string;
  author: string;
  headerTitle: string;
  description: string;
  language: string;
  theme: 'system' | 'dark' | 'light';
  siteUrl: string;
  siteRepo?: string;
  siteLogo?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  locale: string;
  analytics?: {
    umamiAnalytics?: {
      umamiWebsiteId?: string;
    };
  };
}

const siteMetadata: SiteMetadata = {
  title: 'Metricube',
  version: '1.0.0',
  author: 'Slamet-Sam',
  headerTitle: 'Metricube',
  description: 'Monitoring KPI & Disturbance untuk Maintenance Plant',
  language: 'id-ID',
  theme: 'system',
  siteUrl: 'https://metricube.example.com',
  siteRepo: 'https://github.com/slametsampon/metricube',
  siteLogo: '/static/images/logo.png',
  email: 'address@yoursite.com',
  github: 'https://github.com/slametsampon/metricube',
  linkedin: 'https://www.linkedin.com/in/slametsam',
  locale: 'id-ID',
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    },
  },
};

export default siteMetadata;
