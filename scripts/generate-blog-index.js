#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Configuration
const BLOG_DIR = path.join(__dirname, '../blog');
const OUTPUT_FILE = path.join(BLOG_DIR, 'index.mdx');

// Ensure blog directory exists
if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

// Get all MDX files from blog directory
function getBlogPosts() {
  const files = fs.readdirSync(BLOG_DIR)
    .filter(file => file.endsWith('.mdx') && file !== 'index.mdx');
  
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

// Generate the index page
function generateBlogIndex(posts) {
  const postsByYear = {};
  const postsByCategory = {};
  const allCategories = new Set();
  const allTags = new Set();
  
  // Group posts by year and category
  posts.forEach(post => {
    const year = new Date(post.date).getFullYear();
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
    
    if (!postsByCategory[post.category]) {
      postsByCategory[post.category] = [];
    }
    postsByCategory[post.category].push(post);
    
    allCategories.add(post.category);
    post.tags.forEach(tag => allTags.add(tag));
  });
  
  let content = `---
title: Blog
description: Insights, tutorials, and updates from the LaTeX Cloud Studio team
---

# LaTeX Cloud Studio Blog

Stay updated with the latest LaTeX tips, tutorials, and platform updates.

## Categories

Browse posts by category:

<CardGroup cols={3}>
${Array.from(allCategories).map(category => {
  const count = postsByCategory[category].length;
  const icon = getCategoryIcon(category);
  return `<Card title="${category}" icon="${icon}" href="#category-${category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')}">
  ${count} post${count !== 1 ? 's' : ''}
</Card>`;
}).join('\n')}
</CardGroup>

## All Posts

`;

  // Generate posts by year
  Object.keys(postsByYear)
    .sort((a, b) => b - a)
    .forEach(year => {
      content += `## ${year}\n\n`;
      
      postsByYear[year].forEach(post => {
        const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric'
        });
        
        content += `<Card title="${post.title}" icon="${getCategoryIcon(post.category)}" href="/blog/${post.slug}">
  **${post.category}** • ${formattedDate} • ${post.author} • ${post.readTime}
  
  ${post.description}
  ${post.tags.length > 0 ? `
  
  Tags: ${post.tags.join(', ')}` : ''}
</Card>

`;
      });
    });

  // Add category sections
  content += `\n## Posts by Category\n\n`;
  
  Object.keys(postsByCategory)
    .sort()
    .forEach(category => {
      content += `### ${category} {#category-${category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')}}\n\n`;
      
      postsByCategory[category].forEach(post => {
        const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
        
        content += `<Card title="${post.title}" icon="${getCategoryIcon(post.category)}" href="/blog/${post.slug}">
  ${formattedDate} • ${post.readTime}
  
  ${post.description}
</Card>

`;
      });
    });

  // Add RSS feed link
  content += `
---

<Info>
  Subscribe to our RSS feed to stay updated with the latest posts.
  
  [RSS Feed](/blog/rss.xml)
</Info>`;

  fs.writeFileSync(OUTPUT_FILE, content);
  console.log(`Generated blog index with ${posts.length} posts`);
}

// Generate RSS feed
function generateRSSFeed(posts) {
  const baseUrl = 'https://docs.latex-cloud-studio.com';
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>LaTeX Cloud Studio Blog</title>
    <description>Insights, tutorials, and updates from the LaTeX Cloud Studio team</description>
    <link>${baseUrl}/blog</link>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts.slice(0, 20).map(post => `
    <item>
      <title>${post.title}</title>
      <description>${post.description}</description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${post.author}</author>
      ${post.tags.map(tag => `<category>${tag}</category>`).join('\n      ')}
    </item>`).join('')}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(BLOG_DIR, 'rss.xml'), rss);
  console.log('Generated RSS feed');
}

// Main execution
const posts = getBlogPosts();
generateBlogIndex(posts);
generateRSSFeed(posts);