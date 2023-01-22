import SocialLink from '@/components/SocialLink/SocialLink';
import { FaGithub } from 'react-icons/fa';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Daniel Shevtsov</h1>
        <h2 className={styles.heroSubtitle}></h2>
        <div className={styles.heroSocialLinks}>
          <SocialLink Icon={FaGithub}>@shevtsod</SocialLink>
        </div>
      </section>
    </>
  );
}
