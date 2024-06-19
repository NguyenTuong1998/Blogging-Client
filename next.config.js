/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**'
            }
        ]
    },
    env: {
        VITE_SERVER_DOMAIN: 'http://localhost:3000/',
    },
};

export default nextConfig;