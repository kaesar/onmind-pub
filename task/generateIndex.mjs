import fs from "fs";
import path from "path";
import matter from "gray-matter";

const docsDir = process.env.PUB_HOME || 'content/docs';
const indexPath = path.join(docsDir, process.env.INDEX_FILE || '_index.json');

const getAllFiles = (dirPath, arrayOfFiles = []) => {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      if ((file.endsWith(".mdx") || file.endsWith(".md")) && file !== "index.mdx") {
        arrayOfFiles.push(filePath);
      }
    }
  });

  return arrayOfFiles;
};

const generateIndex = () => {
  const files = getAllFiles(docsDir);
  const index = files.map((filePath) => {
    const content = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(content);
    // Get relative path from docsDir and remove extension
    const relativePath = path.relative(docsDir, filePath);
    const slug = relativePath.replace(/\.(mdx|md)$/, "");
    return { ...data, slug };
  });

  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
};

generateIndex();
