const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');

  // Fix Home 1 dropdown link
  html = html.replace(
    /<a href="index\.html" class="py-2 hover:text-accent">Home 1<\/a>/g,
    '<a href="index.html" class="block rounded-lg px-4 py-2 hover:text-accent transition-colors">Home 1</a>'
  );

  // Fix Home 2 dropdown link
  html = html.replace(
    /<a href="homepage2\.html" class="py-2 hover:text-accent">Home 2<\/a>/g,
    '<a href="homepage2.html" class="block rounded-lg px-4 py-2 hover:text-accent transition-colors">Home 2</a>'
  );

  // Also replace if they already have block or other classes just in case
  // But since we just noticed it was `class="py-2 hover:text-accent"`, the above should work.

  fs.writeFileSync(file, html);
  console.log('Fixed mobile dropdown padding in ' + file);
});
