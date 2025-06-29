#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Configuration
const BLOG_DIR = path.join(__dirname, '../blog');
const INDEX_FILE = path.join(BLOG_DIR, 'index.mdx');

// Get all MDX files from blog directory
function getBlogPosts() {
  const files = fs.readdirSync(BLOG_DIR)
    .filter(file => file.endsWith('.mdx') && file !== 'index.mdx' && file !== 'auto-index.mdx');
  
  const posts = files.map(file => {
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    
    return {
      slug: file.replace('.mdx', ''),
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || new Date().toISOString().split('T')[0],
      author: data.author || 'LaTeX Cloud Studio Team',
      tags: data.tags || [],
      category: data.category || 'General',
      image: data.image || null,
      readTime: data.readTime || '5 min read'
    };
  });
  
  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Update featured posts section
function updateFeaturedPosts() {
  const posts = getBlogPosts();
  const featuredPosts = posts.slice(0, 4); // Take the 4 most recent posts
  
  // Read current index
  const indexContent = fs.readFileSync(INDEX_FILE, 'utf8');
  
  // Generate featured posts cards
  const featuredCardsContent = featuredPosts.map(post => {
    const icon = getCategoryIcon(post.category);
    return `<Card 
  title="${post.title}" 
  icon="${icon}" 
  href="/blog/${post.slug}"
>
  ${post.description}
</Card>`;
  }).join('\n\n');
  
  // Update the featured posts section
  const updatedContent = indexContent.replace(
    /(<CardGroup cols={2}>)([\s\S]*?)(<\/CardGroup>)/,
    `$1\n${featuredCardsContent}\n$3`
  );
  
  fs.writeFileSync(INDEX_FILE, updatedContent);
  console.log(`Updated featured posts with ${featuredPosts.length} posts`);
}

// Get icon for category
function getCategoryIcon(category) {
  const iconMap = {
    'Tutorial': 'book-open',
    'Tips & Tricks': 'lightbulb',
    'Platform Updates': 'rocket',
    'User Stories': 'user-circle',
    'Technical': 'code',
    'General': 'newspaper',
    'LaTeX': 'file-text',
    'Collaboration': 'users',
    'Templates': 'layout-template'
  };
  return iconMap[category] || 'newspaper';
}

// Main execution
if (require.main === module) {
  updateFeaturedPosts();
}

module.exports = { updateFeaturedPosts, getBlogPosts };