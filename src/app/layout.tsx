import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AnArtistArt',
  description:
    'Handmade with love: Dolls & clothes that spark imagination (AnArtistArt).',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navbar />
        <main className='p-4 max-w-7xl m-auto min-w-[300px]'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
