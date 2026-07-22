const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const newScriptBody = `
    // Active Nav Link Script
    (function() {
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const isHome = currentPath === 'index.html' || currentPath === 'homepage2.html';
      
      const navLinks = document.querySelectorAll('#navbar a');
      const desktopHome = document.querySelector('.home-trigger');
      const mobileHome = document.querySelector('details.group summary');
      const mobileHomeIcon = mobileHome ? mobileHome.querySelector('i.fa-home') : null;

      function setLinkActive(link, isActive) {
        if(link.closest('.group') && link.querySelector('.fa-eye')) return; 
        if(link.getAttribute('href') === 'login.html' || link.getAttribute('href') === 'signup.html') return;

        if (link.closest('#mobileMenu')) {
          if (isActive) {
            link.classList.add('bg-accent', 'text-white', 'shadow-md');
            link.classList.remove('hover:bg-gray-50', 'dark:hover:bg-white/5');
            const icon = link.querySelector('i');
            if (icon) {
               icon.classList.remove('text-accent');
               icon.classList.add('text-white');
            }
          } else {
            link.classList.remove('bg-accent', 'text-white', 'shadow-md');
            const icon = link.querySelector('i');
            if (icon && link.closest('#mobileMenu > div > a')) { // only standard mobile links have text-accent on icon normally
               icon.classList.remove('text-white');
               icon.classList.add('text-accent');
            }
          }
        } else {
          // Desktop
          if (isActive) {
            link.classList.add('bg-accent', 'text-white', 'shadow-sm', 'font-bold');
            link.classList.remove('hover:text-primary', 'dark:hover:text-accent');
          } else {
            link.classList.remove('bg-accent', 'text-white', 'shadow-sm', 'font-bold');
            link.classList.add('hover:text-primary', 'dark:hover:text-accent');
          }
        }
      }

      function setHomeActive(isActive) {
        if (desktopHome) {
          if (isActive) {
            desktopHome.classList.add('bg-accent', 'text-white', 'shadow-sm', 'font-bold');
            desktopHome.classList.remove('hover:text-primary', 'dark:hover:text-accent');
          } else {
            desktopHome.classList.remove('bg-accent', 'text-white', 'shadow-sm', 'font-bold');
            desktopHome.classList.add('hover:text-primary', 'dark:hover:text-accent');
          }
        }
        if (mobileHome) {
          if (isActive) {
            mobileHome.classList.add('bg-accent', 'text-white', 'shadow-md');
            mobileHome.classList.remove('hover:bg-gray-50', 'dark:hover:bg-white/5');
            if (mobileHomeIcon) {
               mobileHomeIcon.classList.remove('text-accent');
               mobileHomeIcon.classList.add('text-white');
            }
          } else {
            mobileHome.classList.remove('bg-accent', 'text-white', 'shadow-md');
            mobileHome.classList.add('hover:bg-gray-50', 'dark:hover:bg-white/5');
            if (mobileHomeIcon) {
               mobileHomeIcon.classList.add('text-accent');
               mobileHomeIcon.classList.remove('text-white');
            }
          }
        }
      }

      // Initial state: Home is active, others are inactive
      setHomeActive(true);
      navLinks.forEach(link => {
        setLinkActive(link, false);
      });

      // After 1 second (1000ms), transition to the actual active page
      setTimeout(() => {
        if (!isHome) {
          setHomeActive(false);
        }
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === currentPath) {
            setLinkActive(link, true);
          }
        });
      }, 1000);

    })();
`;

files.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');
  const regex = /\/\/ Active Nav Link Script[\s\S]*?\)\(\);/g;
  html = html.replace(regex, newScriptBody.trim());
  fs.writeFileSync(file, html);
  console.log('Updated ' + file);
});
