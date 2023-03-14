/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    APIKEYMAP: process.env.API_MAP,
    APIKEYWEATHER: process.env.API_WEATHER
  }
}

module.exports = nextConfig
