'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { authClient } from '@/lib/auth-client';
import styles from './Header.module.css';

type Props = {
  userId: string | null | undefined;
  userImage: string | null | undefined;
};

export function Header({ userId, userImage }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSignOut() {
    startTransition(async () => {
      await authClient.signOut();
      router.push('/');
      router.refresh();
    });
  }

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.siteName}>
        mini-blog
      </Link>
      <nav className={styles.nav}>
        {userId !== null ? (
          <>
            {/* @ts-expect-error -- Ignore because the page is not implemented yet */}
            <Link href={`/${userId}/entry/new`} className={styles.navItem}>
              新規投稿
            </Link>
            {/* @ts-expect-error -- Ignore because the page is not implemented yet */}
            <Link href={`/${userId}`} className={styles.navItem}>
              マイページ
            </Link>
            {userImage !== null && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={userImage} alt={userId} className={styles.avatar} />
            )}
            <button onClick={handleSignOut} className={styles.navItem} disabled={isPending}>
              ログアウト
            </button>
          </>
        ) : (
          // @ts-expect-error -- Ignore because the page is not implemented yet
          <Link href="/login" className={styles.navItem}>
            ログイン
          </Link>
        )}
      </nav>
    </header>
  );
}
