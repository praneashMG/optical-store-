const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const newScriptBody = `
    // Active Nav Link Script
    (function() {
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const isHome = currentPath === 'index.html' || currentPath === 'homepage2.html';
      
      // Desktop and Mobile Standard Links
      const navLinks = document.querySelectorAll('#navbar a');
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Skip some links like the logo, register, login
        if(link.closest('.group') && link.querySelector('.fa-eye')) return; 
        if(href === 'login.html' || href === 'signup.html') return;

        if (href === currentPath) {
          if (link.closest('#mobileMenu')) {
            link.classList.add('bg-accent', 'text-white', 'shadow-md');
            link.classList.remove('hover:bg-gray-50', 'dark:hover:bg-white/5');
            const icon = link.querySelector('i');
            if (icon) {
               icon.classList.remove('text-accent');
               icon.classList.add('text-white');
            }
          } else {
            // Desktop active link
            link.classList.add('bg-accent', 'text-white', 'shadow-sm', 'font-bold');
            link.classList.remove('hover:text-primary', 'dark:hover:text-accent');
          }
        } else {
          // Non-active links
          if (!(isHome && (href === 'index.html' || href === 'homepage2.html'))) {
             if (link.closest('#mobileMenu')) {
                link.classList.remove('bg-accent', 'text-white', 'shadow-md');
                // restore original styling
                const icon = link.querySelector('i');
                if (icon) {
                   icon.classList.remove('text-white');
                   icon.classList.add('text-accent');
                }
             } else {
                link.classList.remove('bg-accent', 'text-white', 'shadow-sm', 'font-bold');
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
          if (icon) {
             icon.classList.add('text-accent');
             icon.classList.remove('text-white');
          }
        } else {
          mobileHome.classList.add('bg-accent', 'text-white', 'shadow-md');
          mobileHome.classList.remove('hover:bg-gray-50', 'dark:hover:bg-white/5');
          if (icon) {
             icon.classList.remove('text-accent');
             icon.classList.add('text-white');
          }
        }
      }
    })();
`;

files.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');
  const regex = /\/\/ Active Nav Link Script[\s\S]*?\)\(\);/g;
  html = html.replace(regex, newScriptBody.trim());
  fs.writeFileSync(file, html);
  console.log('Updated ' + file);
});
