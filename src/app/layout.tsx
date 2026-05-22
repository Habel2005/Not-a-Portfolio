
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VOID ARCHIVE OS',
  description: 'An experimental spatial OS portfolio experience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&family=Space+Grotesk:wght@300..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-void-black text-foreground selection:bg-acid-green selection:text-void-black overflow-hidden h-screen w-screen">
        {children}
      </body>
    </html>
  );
}
