import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const rootDir = process.env.PUB_ROOT;
const sourceDir = process.env.PUB_SOURCE || '/.';

if (!rootDir) {
    console.error('Error: PUB_ROOT variable is undefined, it needs to be assigned.');
    process.exit(1);
}

const fullSourceDir = path.join(rootDir, sourceDir);
const outFile = 'site.pdf';
const outDir = rootDir;

const configPaths = [
    path.join(rootDir, '.vitepress', 'vitepress-pdf.config.js'),
    path.join(rootDir, '.vitepress', 'vitepress-pdf.config.mjs'),
    path.join(rootDir, 'vitepress-pdf.config.js'),
    path.join('common', '.vitepress', 'vitepress-pdf.config.js'),
];

let configFile = null;
for (const configPath of configPaths) {
    if (fs.existsSync(configPath)) {
        configFile = configPath;
        break;
    }
}

const args = [
    'press-export-pdf',
    'export',
    fullSourceDir,
    '--outFile', outFile,
    '--outDir', outDir
];

if (configFile) {
    args.push('--config', configFile);
}

console.log(`Exporting PDF from ${fullSourceDir}/... to ${path.join(outDir, outFile)}`);
if (configFile) {
    console.log(`Using config file: ${configFile}`);
} else {
    console.log(`No config file found, using defaults`);
}

const exportProcess = spawn('npx', args, { stdio: 'inherit' });

exportProcess.on('close', (code) => {
    if (code === 0) {
        console.log(`The file ${path.join(outDir, outFile)} has been created successfully.`);
    } else {
        console.error(`Error: PDF export failed with code ${code}.`);
        process.exit(code);
    }
});
