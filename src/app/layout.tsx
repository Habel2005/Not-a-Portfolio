import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VOID | Editorial Design Studio',
  description: 'A cinematic brutalist luxury portfolio experience.',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Geist+Mono:wght@100..900&family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body">
        <div className="grain-overlay" />
        {children}
        {modal}
      </body>
    </html>
  );
}