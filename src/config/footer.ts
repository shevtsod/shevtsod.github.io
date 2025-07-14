import type { HTMLAttributeAnchorTarget } from 'react';
import type { To } from 'react-router';

export interface FooterLink {
  key: string;
  icon?: string;
  to: To;
  target?: HTMLAttributeAnchorTarget;
}

export interface FooterLinksSection {
  key: string;
  footerLinks: FooterLink[];
}

const footerLinksSections: FooterLinksSection[] = [
  // Social
  {
    key: 'social',
    footerLinks: [
      {
        key: 'github',
        icon: 'github',
        to: 'https://github.com/shevtsod',
        target: '_blank',
      },
      {
        key: 'linkedin',
        icon: 'linkedin',
        to: 'https://www.linkedin.com/in/daniel-shevtsov-29089b296/',
        target: '_blank',
      },
    ],
  },
  // Navigation
  {
    key: 'navigation',
    footerLinks: [
      {
        key: 'home',
        to: '/',
      },
      {
        key: 'blog',
        to: '/blog',
      },
      {
        key: 'contact',
        to: '/#contact',
      },
    ],
  },
];

export default footerLinksSections;
