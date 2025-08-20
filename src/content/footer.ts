import { IconKey } from '@/components/icon';
import type { HTMLAttributeAnchorTarget } from 'react';

export interface FooterLinkType {
  key: string;
  icon?: IconKey;
  href: string;
  target?: HTMLAttributeAnchorTarget;
}

export interface FooterLinkSectionType {
  key: string;
  footerLinks: FooterLinkType[];
}

export const footerLinksSections: FooterLinkSectionType[] = [
  // Social
  {
    key: 'social',
    footerLinks: [
      {
        key: 'github',
        icon: 'Github',
        href: 'https://github.com/shevtsod',
        target: '_blank',
      },
      {
        key: 'linkedin',
        icon: 'Linkedin',
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
