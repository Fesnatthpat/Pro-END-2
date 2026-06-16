import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.vue')) {
      results.push(fullPath);
    }
  });
  return results;
}

const dirs = [
  'd:/Projects-end/pro-end2/app/pages',
  'd:/Projects-end/pro-end2/app/components'
];

const ignoredFiles = [
  'cp1.vue', 'cp2.vue', 'cp3.vue'
];

let changedCount = 0;

dirs.forEach(dir => {
  const files = walk(dir);
  
  files.forEach(file => {
    // Skip print form files
    if (ignoredFiles.some(ignored => file.endsWith(ignored))) {
      return;
    }

    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // H1
    content = content.replace(/<h1([^>]*)class="([^"]*)"/g, (match, p1, p2) => {
      let cls = p2;
      cls = cls.replace(/text-\[[0-9]+px\]/g, '')
               .replace(/md:text-\[[0-9]+px\]/g, '')
               .replace(/text-[0-9]xl/g, '')
               .replace(/md:text-[0-9]xl/g, '')
               .replace(/lg:text-[0-9]xl/g, '')
               .replace(/font-\w+/g, '')
               .replace(/\s+/g, ' ').trim();
      return `<h1${p1}class="${cls} text-3xl md:text-4xl lg:text-5xl font-black"`;
    });

    // H2
    content = content.replace(/<h2([^>]*)class="([^"]*)"/g, (match, p1, p2) => {
      let cls = p2;
      cls = cls.replace(/text-\[[0-9]+px\]/g, '')
               .replace(/md:text-\[[0-9]+px\]/g, '')
               .replace(/text-[0-9]xl/g, '')
               .replace(/md:text-[0-9]xl/g, '')
               .replace(/font-\w+/g, '')
               .replace(/\s+/g, ' ').trim();
      return `<h2${p1}class="${cls} text-2xl md:text-3xl font-bold"`;
    });

    // H3
    content = content.replace(/<h3([^>]*)class="([^"]*)"/g, (match, p1, p2) => {
      let cls = p2;
      cls = cls.replace(/text-\[[0-9]+px\]/g, '')
               .replace(/md:text-\[[0-9]+px\]/g, '')
               .replace(/text-[0-9]xl/g, '')
               .replace(/md:text-[0-9]xl/g, '')
               .replace(/font-\w+/g, '')
               .replace(/\s+/g, ' ').trim();
      return `<h3${p1}class="${cls} text-xl md:text-2xl font-bold"`;
    });

    // H4
    content = content.replace(/<h4([^>]*)class="([^"]*)"/g, (match, p1, p2) => {
      let cls = p2;
      if (cls.match(/text-\[[0-9]+px\]/)) {
        cls = cls.replace(/text-\[[0-9]+px\]/g, 'text-lg');
      }
      return `<h4${p1}class="${cls}"`;
    });

    // Arbitrary sizes
    content = content.replace(/class="([^"]*)"/g, (match, p1) => {
      let cls = p1;
      cls = cls.replace(/text-\[1[0-2]px\]/g, 'text-xs');
      cls = cls.replace(/text-\[1[3-4]px\]/g, 'text-sm');
      cls = cls.replace(/text-\[1[5-6]px\]/g, 'text-base');
      cls = cls.replace(/text-\[18px\]/g, 'text-lg');
      cls = cls.replace(/text-\[20px\]/g, 'text-xl');
      cls = cls.replace(/text-\[24px\]/g, 'text-2xl');
      cls = cls.replace(/text-\[28px\]/g, 'text-3xl');
      cls = cls.replace(/text-\[32px\]/g, 'text-4xl');
      cls = cls.replace(/text-\[36px\]/g, 'text-5xl');
      
      // Some classes might be md:text-[24px] -> md:text-2xl
      cls = cls.replace(/md:text-\[1[0-2]px\]/g, 'md:text-xs');
      cls = cls.replace(/md:text-\[1[3-4]px\]/g, 'md:text-sm');
      cls = cls.replace(/md:text-\[1[5-6]px\]/g, 'md:text-base');
      cls = cls.replace(/md:text-\[18px\]/g, 'md:text-lg');
      cls = cls.replace(/md:text-\[20px\]/g, 'md:text-xl');
      cls = cls.replace(/md:text-\[24px\]/g, 'md:text-2xl');
      cls = cls.replace(/md:text-\[28px\]/g, 'md:text-3xl');
      cls = cls.replace(/md:text-\[32px\]/g, 'md:text-4xl');
      cls = cls.replace(/md:text-\[36px\]/g, 'md:text-5xl');

      return `class="${cls}"`;
    });

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated typography in: ${file}`);
      changedCount++;
    }
  });
});

console.log(`Finished! Updated ${changedCount} files.`);
