/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.convas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

export default nextConfig;
