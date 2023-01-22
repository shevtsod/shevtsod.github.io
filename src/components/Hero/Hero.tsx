import styles from './Hero.module.css';

export default function Hero() {
  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Daniel Shevtsov</h1>
        <h2 className={styles.heroSubtitle}>
          <a
            href="https://github.com/shevtsod"
            target="_blank"
            rel="noreferrer noopener"
          >
            @shevtsod
          </a>
        </h2>
      </section>
    </>
  );
}
