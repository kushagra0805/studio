/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    // This alias is necessary to solve an issue with the `handlebars` package,
    // which is a dependency of Genkit. It forces Webpack to use the pre-compiled
    // browser-compatible version of the library, preventing startup errors.
    config.resolve.alias.handlebars = 'handlebars/dist/handlebars.js';
    return config;
  },
};

module.exports = nextConfig;
