/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: 'scontent.cdninstagram.com' },
      { hostname: 'scontent.fyto3-1.fna.fbcdn.net' },
      { hostname: 'a.allegroimg.com' },
      { hostname: 'assets.allegrostatic.com' },
      { hostname: 'scontent-ams4-1.cdninstagram.com' },
      { hostname: 'live.staticflickr.com' },
      { hostname: 'an-artist.store' },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
