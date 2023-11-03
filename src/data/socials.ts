import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

export interface Social {
  title: string;
  icon: IconType;
  href: string;
}

const socials: Social[] = [
  {
    title: 'shevtsod',
    icon: FaGithub,
    href: 'https://github.com/shevtsod',
  },
  {
    title: 'daniel-shevtsov',
    icon: FaLinkedin,
    href: 'https://www.linkedin.com/in/daniel-shevtsov-29089b296/',
  },
];

export default socials;
