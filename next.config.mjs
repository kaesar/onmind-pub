import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  env: {
    PUB_HOME: process.env.PUB_HOME || 'content/docs',
    INDEX_FILE: process.env.INDEX_FILE || '_index.json'
  },
};

export default withMDX(config);
