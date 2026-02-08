'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import css from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  return (
    <header className={clsx('container', css.header)}>
      <div className={css.headerWrapper}>
        <Link href={'/'}>
          <svg className={css.logo} width="104" height="16">
            <use href="/sprite.svg#logo"></use>
          </svg>
        </Link>
        <nav className={css.headerNav}>
          <Link
            href={'/'}
            className={clsx(css.navLink, pathname === '/' && css.active)}
          >
            Home
          </Link>
          <Link
            href={'/catalog'}
            className={clsx(css.navLink, pathname === '/catalog' && css.active)}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
