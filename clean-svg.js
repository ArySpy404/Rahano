const fs = require('fs');
const path = require('path');

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith('.svg')) {
      const src = fs.readFileSync(p, 'utf8');
      const ned = src
        .replace(/<metadata>[\s\S]*?<\/metadata>/g, '')
        .replace(/\s+xmlns:c2pa="[^"]*"/g, '');
      if (ned !== src) {
        fs.writeFileSync(p, ned);
        console.log('ned:', p);
      }
    }
  }
}

walk(process.argv[2] || 'src');