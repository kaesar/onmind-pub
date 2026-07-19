import fs from 'fs';
import path from 'path';

// Find the repository root by walking up from cwd until a `task` folder exists.
export function findRepoRoot(start = process.cwd()) {
    let dir = path.resolve(start);
    while (true) {
        if (fs.existsSync(path.join(dir, 'task')) && fs.existsSync(path.join(dir, 'package.json'))) {
            return dir;
        }
        const parent = path.dirname(dir);
        if (parent === dir) break;
        dir = parent;
    }
    return path.resolve(start);
}

// Resolve a site folder argument (e.g. "andrey", "sites/andrey", or an
// absolute path) against the repo root.
export function resolveSiteFolder(arg, repoRoot) {
    if (!arg) return null;
    if (path.isAbsolute(arg)) return arg;
    // Already includes the "sites/" prefix?
    const withPrefix = path.join(repoRoot, arg);
    if (fs.existsSync(withPrefix)) return withPrefix;
    // Treat as a bare site name under sites/.
    const underSites = path.join(repoRoot, 'sites', arg);
    if (fs.existsSync(underSites)) return underSites;
    return withPrefix;
}
