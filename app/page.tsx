import Image from 'next/image';
import css from './page.module.css';
import Link from 'next/link';
import clsx from 'clsx';

export default function Home() {
  return (
    <main>
      <section className={css.hero}>
        <Image
          src={'/Hero.jpg'}
          alt="Hero image"
          priority
          fill
          className={css.heroImage}
        ></Image>
        <div className={css.heroContent}>
          <div className="container">
            <div className={css.contentWrapper}>
              <h1 className={css.heroTitle}>Find your perfect rental car</h1>
              <p className={css.heroParagraph}>
                Reliable and budget-friendly rentals for any journey
              </p>
              <Link
                href={'/catalog'}
                className={clsx('primaryBtn', css.heroBtn)}
              >
                View catalog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
