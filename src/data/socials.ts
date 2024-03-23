import GithubIcon from '../assets/images/icons/github.svg?react';
import LinkedinIcon from '../assets/images/icons/linkedin.svg?react';

export interface Social {
  title: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  href: string;
}

const socials: Social[] = [
  {
    title: 'shevtsod',
    icon: GithubIcon,
    href: 'https://github.com/shevtsod',
  },
  {
    title: 'daniel-shevtsov',
    icon: LinkedinIcon,
    href: 'https://www.linkedin.com/in/daniel-shevtsov-29089b296/',
  },
];

export default socials;
