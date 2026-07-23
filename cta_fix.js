const fs = require('fs');
const path = require('path');

const directory = '.';
const files = fs.readdirSync(directory).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(directory, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace text names globally
  content = content.replace(/Learn More\b/g, 'Discover More');
  content = content.replace(/>\s*Select\s*</g, '>Choose Option<'); // Only exactly "Select"
  content = content.replace(/See All\s*→/g, 'View All →');
  content = content.replace(/Get started\b/gi, 'Book Now');

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Done!');
