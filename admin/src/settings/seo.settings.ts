import { siteSettings } from '@settings/site.settings';
export const SEO = {
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    site_name: siteSettings.name,
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};
