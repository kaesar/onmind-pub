import { defineDocs, defineConfig } from 'fumadocs-mdx/config';

const docsDir = process.env.PUB_HOME || 'content/docs';

export const { docs, meta } = defineDocs({
  dir: docsDir,
});

export default defineConfig();
