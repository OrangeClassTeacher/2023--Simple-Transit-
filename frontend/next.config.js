/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_GOOGLE_API_KEY: process.env.NEXT_GOOGLE_API_KEY
  }
}

module.exports = nextConfig
