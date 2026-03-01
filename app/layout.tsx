import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Header } from './Header';
import { HeaderWrapper } from './HeaderWrapper';
import './globals.css';

export const metadata: Metadata = {
  title: 'mini-blog',
  description: 'A simple blog service built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Suspense fallback={<Header userId={null} userImage={null} />}>
          <HeaderWrapper />
        </Suspense>
        <main>{children}</main>
      </body>
    </html>
  );
}
