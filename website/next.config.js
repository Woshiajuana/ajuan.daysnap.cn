/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['picsum.photos'],
  },

  // 试验性功能
  experimental: {
    // https://github.com/vercel/next.js/issues/44999
    // https://github.com/vercel/next.js/issues/46672
    scrollRestoration: true,
  },

  // https://nextjs.org/docs/api-reference/next.config.js/trailing-slash
  // trailingSlash: true,
}

module.exports = nextConfig
