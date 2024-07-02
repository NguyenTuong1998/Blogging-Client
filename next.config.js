/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: 'res.cloudinary.com',
          },
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
          },
        ],
        formats: ['image/avif', 'image/webp'],
      },
    env: {
        VITE_SERVER_DOMAIN: 'http://localhost:3000/',
    },
};

export default nextConfig;