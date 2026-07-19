import fs from 'fs';

// Shared frontmatter parsing used by indexing.js and toc.js.
// Supports YAML-style (`---`) and TOML-style (`+++`) delimiters.

export function getFrontmatterRaw(content, mark) {
    if (mark && mark.length > 3) return null;
    const lines = content.toString('utf8').split('\n').filter(Boolean);
    if (lines.length === 0) return null;
    if (lines[0].indexOf(mark || '---') === -1) return null;
    const fm = [];
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].indexOf(mark || '---') === 0) break;
        fm.push(lines[i]);
    }
    return fm;
}

function setPairs(lines, keySeparator) {
    const result = [];
    lines.forEach(function (line) {
        const pos = line.indexOf(keySeparator || '=');
        if (pos > 0) {
            let key = line.substring(0, pos).trim();
            let value = line.substring(pos + 1).trim();
            if (value === 'true') value = true;
            else if (value === 'false') value = false;
            else if (value === 'null' || value.trim() === '') value = null;
            result.push({ key, value });
        }
    });
    return result;
}

export function parseFrontmatter(content) {
    let fm = getFrontmatterRaw(content, '---');
    let mark = '---';
    if (!fm) {
        fm = getFrontmatterRaw(content, '+++');
        mark = '+++';
    }
    if (!fm) return {};
    const keySeparator = mark === '---' ? ':' : '=';
    const pairs = setPairs(fm, keySeparator);
    const obj = {};
    for (const { key, value } of pairs) obj[key] = value;
    return obj;
}

export function readFileFrontmatter(filePath) {
    try {
        return parseFrontmatter(fs.readFileSync(filePath, 'utf-8'));
    } catch {
        return {};
    }
}
