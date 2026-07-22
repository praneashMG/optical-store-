const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const scriptToInject = `
  <script>
    // Active Nav Link Script
    (function() {
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const isHome = currentPath === 'index.html' || currentPath === 'homepage2.html';
      
      // Desktop and Mobile Standard Links
      const navLinks = document.querySelectorAll('#navbar a');
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
          link.classList.add('text-primary', 'dark:text-accent', 'font-bold');
          if (link.closest('#mobileMenu')) {
            link.classList.add('bg-gray-50', 'dark:bg-white/5');
          }
        } else {
          // Ensure non-active links don't have active classes (in case they were hardcoded)
          // except if they are home links and we are on home
          if (!(isHome && (href === 'index.html' || href === 'homepage2.html'))) {
             link.classList.remove('text-primary', 'dark:text-accent', 'font-bold');
             if (link.closest('#mobileMenu') && !link.classList.contains('hover:bg-gray-50')) {
                link.classList.remove('bg-gray-50', 'dark:bg-white/5');
             }
          }
        }
      });
      
      // Desktop Home Trigger
      const desktopHome = document.querySelector('.home-trigger');
      if (desktopHome) {
        if (!isHome) {
          desktopHome.classList.remove('bg-accent', 'text-white', 'shadow-sm', 'font-bold');
          desktopHome.classList.add('hover:text-primary', 'dark:hover:text-accent');
        } else {
          desktopHome.classList.add('bg-accent', 'text-white', 'shadow-sm', 'font-bold');
          desktopHome.classList.remove('hover:text-primary', 'dark:hover:text-accent');
        }
      }
      
      // Mobile Home Summary
      const mobileHome = document.querySelector('details.group summary');
      if (mobileHome) {
        const icon = mobileHome.querySelector('i.fa-home');
        if (!isHome) {
          mobileHome.classList.remove('bg-accent', 'text-white', 'shadow-md');
          mobileHome.classList.add('hover:bg-gray-50', 'dark:hover:bg-white/5');
          if (icon) icon.classList.add('text-accent');
        } else {
          mobileHome.classList.add('bg-accent', 'text-white', 'shadow-md');
          mobileHome.classList.remove('hover:bg-gray-50', 'dark:hover:bg-white/5');
          if (icon) icon.classList.remove('text-accent');
        }
      }
    })();
  </script>
`;

files.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('// Active Nav Link Script')) {
    // Replace the last </script> with </script> \n scriptToInject
    // Or just place it right before </body>
    html = html.replace('</body>', scriptToInject + '\\n</body>');
    fs.writeFileSync(file, html);
    console.log('Updated ' + file);
  }
});
