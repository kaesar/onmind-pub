import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

const rootDir = process.env.PUB_ROOT;
const siteZip = 'site.zip';

if (!rootDir) {
    console.error('Error: PUB_ROOT variable is undefined, it needs to be assigned.');
    process.exit(1);
}

const distDir = path.join(rootDir, '.vitepress', 'dist');
const zipFilePath = path.join(rootDir, siteZip);

if (!fs.existsSync(distDir)) {
    console.error(`Error: The directory ${distDir} doesn't exists.`);
    process.exit(1);
}

const zip = new AdmZip();
zip.addLocalFolder(distDir, '', (filename) => {
    return true;  // !filename.startsWith('dist');
});

zip.writeZip(zipFilePath);

console.log(`The file ${zipFilePath} has been created succesfully.`);
