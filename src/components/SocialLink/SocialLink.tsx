import { motion } from 'framer-motion';
import { IconType } from 'react-icons/lib';
import styles from './SocialLink.module.css';

export interface SocialLinkProps {
  Icon: IconType;
  children: React.ReactNode;
}

export default function SocialLink({ Icon, children }: SocialLinkProps) {
  return (
    <motion.a
      layout
      className={styles.socialLink}
      href="https://github.com/shevtsod"
      target="_blank"
      rel="noreferrer noopener"
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon className={styles.socialLinkIcon} />
      <span>{children}</span>
    </motion.a>
  );
}
