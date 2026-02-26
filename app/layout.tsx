import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ts-webapp-template',
  description: 'Typescript Web Application Template',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
