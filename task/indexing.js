import fs from 'fs';
import path from 'path';

const rootContentDir = process.env.PUB_ROOT || 'content/docs';

function setPairs (lines, keySeparator) {  // For fixing key/value pairs
    let key = null;
    let value = null;
    let pos = null;
    let result = [];
    
    lines.forEach(function (line) {
        pos = line.indexOf(keySeparator || '=');
        if (pos > 0) {
            key = line.substring(0,pos).trim();
            value = line.substring(pos + 1).trim();

            if (value === 'true')
                value = true;
            else if (value === 'false')
                value = false;
            else if (value === 'null' || value.trim() === '')
                value = null;
            
                result.push({ key: key, value: value });
        }
    });

    return result;
}

function getKV (list, key) {
    return list?.filter( e => e.key === key )?.[0]?.value
}

function getFrontmatter (content, mark) {
    if (mark && mark.length > 3) return null;
    let lines = content.toString('utf8').split('\n').filter(Boolean);
    if (lines.length == 0) return null;
    if (lines.length == 1) content.toString('utf8').split('\r').filter(Boolean);
    if (lines[0].indexOf(mark || '---') == -1) return null;
    let fm = [];
    for (let i = 1; i < lines.length; i++) {  // Get frontmatter
        if (lines[i].indexOf(mark || '---') == 0)
            break;
        fm.push(lines[i]);
    }
    return fm;
}

function checkFrontmatter (content, mark) {
    let fmMark = mark || '---';
    let fm = getFrontmatter(content, fmMark);
    if (!fm) {  // try again
        fmMark = '+++';
        fm = getFrontmatter(content, fmMark);
    }
    if (!fm) return [null, content];
    let n = content.indexOf(fmMark, 4) + 3;
    let md = content.substr(n);
    let keySeparator = '=';
    if (fmMark == '---') keySeparator = ':';
    fm = setPairs(fm, keySeparator);
    return [fm, md];
}

/**
 * Pushes articles from a given directory to the articles array.
 *
 * @param {string} directory - The directory path where the article is located.
 * @param {string} file - The name of the file containing the article.
 * @param {string} filePath - The full path to the file.
 * @param {Array} articles - The array where the articles will be pushed.
 */
function pushArticles(directory, file, filePath, articles) {
    try {
        const articleContent = fs.readFileSync(filePath, 'utf-8');
        const [fm, markdown] = checkFrontmatter(articleContent);
        const title = getKV(fm, 'title');
        const description = getKV(fm, 'description') || getKV(fm, 'hint');
        const hide = parseInt(getKV(fm, 'hide')) || ((!!title) ? 0 : 2);
        const notable = !!getKV(fm, 'notable');
        const filename = file.slice(0, -3); // Remove '.md' extension
        const path = directory.replace(new RegExp('\\\\','g'), '/').split('/');
        const grade = (path.length > 3) ? path.length - 4 : 0;
        const category = (['en','es'].includes(path[path.length - 1])) ? path[path.length - 2] : path[path.length - 1];
        const language = (['en','es'].includes(path[path.length - 1])) ? path[path.length - 1] : getKV(fm, 'language');
        const tags = getKV(fm, 'tags') || category;
        const url = (['en','es'].includes(path[path.length - 1])) ? path[path.length - 2] + '/' + path[path.length - 1] + '/' + filename :
            path[path.length - 1] + '/' + filename;
        //const url = (['en','es'].includes(path[path.length - 1])) ? '/doc/' + path[path.length - 2] + '/' + path[path.length - 1] + '/' + filename + '.md' :
        //    '/doc/' + path[path.length - 1] + '/' + filename + '.md';
        if (filename !== '_index')
            articles.push({ title, description, tags, hide, notable, filename, grade, category, language, url });
    }
    catch (e) {
        console.log(`Error de FrontMatter en: ${filePath} ~> ${e.message}`);
    }
}

/**
 * Reads articles from a given directory.
 *
 * @param {string} directory - The directory path where the articles are located.
 * @return {Array} The array containing the read articles.
 */
function readArticles(directory) {
    const articles = [];
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            articles.push(...readArticles(filePath));
        } else if (path.extname(file) === '.md') {
            pushArticles(directory, file, filePath, articles)
        }
    }

    return articles;
}

/**
 * Generates the index content based on the provided articles.
 *
 * @param {Array} articles - The array of articles to generate the index for.
 * @return {void} 
 */
function generateIndex(articles) {
    const indexContent = JSON.stringify(articles, null, 2);
    fs.writeFileSync(path.join(rootContentDir, 'public', '_index.json'), indexContent);
}

const articles = readArticles(rootContentDir);
generateIndex(articles);
