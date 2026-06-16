const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.vue')) {
      results.push(file);
    }
  });
  return results;
}

const dirs = [
  'd:/Projects-end/pro-end2/app/pages',
  'd:/Projects-end/pro-end2/app/layouts',
  'd:/Projects-end/pro-end2/app/components'
];

let changedCount = 0;

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = walk(dir);
  
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    
    content = content.replace(/(shadow-(?:slate|gray|emerald|amber|indigo|rose|blue|teal|pink|purple|red)-(?:100|200|300)(?:\/[0-9]+)?)(?!\s+dark:shadow)/g, '$1 dark:shadow-none');
    
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      changedCount++;
      console.log('Updated', file);
    }
  });
});

console.log('Total files updated:', changedCount);
