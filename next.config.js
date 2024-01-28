/** @type {import('next').NextConfig} */
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");
const nextConfig = {
  images: {
    domains: ["fakestoreapi.com", "res.cloudinary.com", "arweave.net"]
  },
};

module.exports = nextConfig