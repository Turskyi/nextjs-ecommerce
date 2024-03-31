import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import SessionProvider from './SessionProvider';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AnArtistArt - Handmade Clothes, Paintings, and Accessories',
  description:
    'Handmade with love: Dolls, paintings, accessories & clothes that spark imagination (AnArtistArt).',
  metadataBase: new URL('https://an-artist-art.vercel.app'),
  openGraph: {
    images: [
      'https://an-artist-art.vercel.app/opengraph-image.png',
      { url: 'https://an-artist-art.vercel.app/opengraph-image.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <Head>
        <title>{`${metadata.title}`}</title>
        <meta property='twitter:card' content='summary_large_image' />
        <meta
          property='twitter:image'
          content='https://an-artist-art.vercel.app/opengraph-image.png'
        />
        <meta name='description' content={metadata.description || ''} />
        <meta property='og:title' content={metadata.title?.toString() || ''} />
        <meta property='og:description' content={metadata.description || ''} />
        <meta
          property='og:image'
          content='https://an-artist-art.vercel.app/opengraph-image.png'
        />
        <meta property='og:image:type' content='image/png' />
        <meta
          property='og:image:url'
          content='https://an-artist-art.vercel.app/opengraph-image.png'
        />
        <meta
          property='og:image:secure_url'
          content='https://an-artist-art.vercel.app/opengraph-image.png'
        />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='og:url' content='https://an-artist-art.vercel.app' />
        <meta property='og:type' content='website' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='author' content='Anna Turska' />
        <meta
          name='keywords'
          content='TypeScript, e-commerce, painting, handmade, sewing, diy, art'
        />
        <meta http-equiv='refresh' content='30' />
        <meta
          property='og:image:alt'
          content='Handmade doll with fancy dress.'
        />
        <meta property='fb:app_id' content='433879415973046' />
      </Head>
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <main className='p-4 max-w-7xl m-auto min-w-[300px]'>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
