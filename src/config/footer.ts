import type { HTMLAttributeAnchorTarget } from 'react';

export interface FooterLink {
  key: string;
  icon?: string;
  href: string;
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
        href: 'https://github.com/shevtsod',
        target: '_blank',
      },
      {
        key: 'linkedin',
        icon: 'linkedin',
        href: 'https://www.linkedin.com/in/daniel-shevtsov-29089b296/',
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
        href: '/#top',
      },
      {
        key: 'blog',
        href: '/blog',
      },
      {
        key: 'contact',
        href: '/#contact',
      },
    ],
  },
];

export default footerLinksSections;
