const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  if (file === 'index.html' || file === 'homepage2.html') {
    return; // skip home pages
  }

  let html = fs.readFileSync(file, 'utf8');

  // Desktop Home Trigger
  // Before: class="home-trigger flex items-center gap-1 rounded-md px-2.5 py-1.5 bg-accent text-white font-bold shadow-sm transition-colors"
  html = html.replace(/class="home-trigger ([^"]*)bg-accent text-white font-bold shadow-sm([^"]*)"/g, 'class="home-trigger $1hover:text-primary dark:hover:text-accent$2"');
  
  // Also catch if they are in different order just in case, or just replace the exact string
  html = html.replace('class="home-trigger flex items-center gap-1 rounded-md px-2.5 py-1.5 bg-accent text-white font-bold shadow-sm transition-colors"', 
                      'class="home-trigger flex items-center gap-1 rounded-md px-2.5 py-1.5 hover:text-primary dark:hover:text-accent transition-colors"');

  // Mobile Home Summary
  // Before: class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-lg font-bold list-none bg-accent text-white shadow-md"
  html = html.replace('class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-lg font-bold list-none bg-accent text-white shadow-md"', 
                      'class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-lg font-bold list-none hover:bg-gray-50 dark:hover:bg-white/5"');

  // The mobile Home Icon should have text-accent instead of inheriting text-white
  // Before: <i class="fas fa-home w-6"></i><span>Home</span>
  // But wait, in the active state it has text-white. We need to add text-accent.
  // We can just find `<div class="flex items-center gap-4"><i class="fas fa-home w-6"></i><span>Home</span></div>` and add text-accent
  html = html.replace('<i class="fas fa-home w-6"></i>', '<i class="fas fa-home w-6 text-accent"></i>');

  fs.writeFileSync(file, html);
  console.log('Removed hardcoded Home active state from ' + file);
});
