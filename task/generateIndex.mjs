import fs from "fs";
import path from "path";
import matter from "gray-matter";

const docsDir = path.join(process.cwd(), "content/docs/sys");
const outputFile = path.join(process.cwd(), "content/docs/_index.json");

const generateIndex = () => {
  const files = fs.readdirSync(docsDir);
  const index = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const content = fs.readFileSync(path.join(docsDir, file), "utf-8");
      const { data } = matter(content);
      return { ...data, slug: file.replace(".mdx", "") };
    });
  fs.writeFileSync(outputFile, JSON.stringify(index, null, 2));
};

generateIndex();
