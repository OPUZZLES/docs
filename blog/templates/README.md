# Blog Post Templates

This directory contains templates for different types of blog posts. Each template includes the proper frontmatter structure, content organization, and Mintlify components.

## Available Templates

### 1. Tutorial Template (`tutorial-template.mdx`)
**Use for**: Step-by-step guides, how-to articles, educational content

**Category**: "Tutorial"
**Typical tags**: ["latex", "beginner", "how-to", "tutorial"]
**Structure**: 
- Prerequisites section
- Step-by-step instructions
- Code examples with explanations
- Troubleshooting section
- Complete working example

### 2. User Story Template (`user-story-template.mdx`)
**Use for**: Customer success stories, case studies, transformation journeys

**Category**: "User Stories"  
**Typical tags**: ["user-story", "success-story", "case-study"]
**Structure**:
- User profile and background
- Challenges and pain points
- Journey timeline
- Results and metrics
- Lessons learned

### 3. Tips & Tricks Template (`tips-template.mdx`)
**Use for**: Quick tips, productivity hacks, best practices

**Category**: "Tips & Tricks"
**Typical tags**: ["tips", "productivity", "latex-tricks"]
**Structure**:
- Numbered list of tips
- Before/after code examples
- Quick wins and bonus tips
- Keyboard shortcuts
- Impact assessment

### 4. Platform Updates Template (`platform-update-template.mdx`)
**Use for**: Feature announcements, product updates, changelog posts

**Category**: "Platform Updates"
**Typical tags**: ["new-features", "updates", "platform"]
**Structure**:
- Feature overview and benefits
- How-to-use instructions
- Technical details
- User testimonials
- Availability information

## How to Use Templates

1. **Copy the appropriate template** to the main `/blog` directory
2. **Rename the file** to match your post (e.g., `how-to-create-tables.mdx`)
3. **Update the frontmatter** with your specific details:
   - `title`: Your post title
   - `description`: SEO-friendly description
   - `date`: Publication date (YYYY-MM-DD format)
   - `author`: Your name
   - `category`: Choose appropriate category
   - `tags`: Relevant tags in array format
   - `readTime`: Estimated reading time
   - `image`: Featured image path

4. **Replace placeholder content** with your actual content
5. **Keep the structure** but adapt the sections to your needs
6. **Run the blog index generator** to update the main blog page

## Frontmatter Guidelines

### Required Fields
```yaml
title: "Your Post Title"
description: "Brief description for SEO and previews"
date: "2024-12-29"
author: "Your Name"
category: "One of: Tutorial, Tips & Tricks, Platform Updates, User Stories, General"
```

### Optional Fields
```yaml
tags: ["tag1", "tag2", "tag3"]
readTime: "5 min read"
image: "/blog-images/your-image.png"
```

### Category Options
- **Tutorial**: Step-by-step educational content
- **Tips & Tricks**: Quick tips and productivity advice
- **Platform Updates**: Feature announcements and product news
- **User Stories**: Customer success stories and case studies
- **General**: General LaTeX content that doesn't fit other categories

### Common Tags
- **Content type**: tutorial, tips, case-study, announcement
- **Skill level**: beginner, intermediate, advanced
- **Topic areas**: latex, mathematics, collaboration, productivity
- **Specific features**: tables, figures, citations, templates

## Content Guidelines

### Writing Style
- Use clear, conversational tone
- Include practical examples
- Provide actionable takeaways
- Use Mintlify components for better presentation

### Code Examples
- Always use `<CodeGroup>` for multiple examples
- Include both basic and advanced examples when relevant
- Add comments to explain complex code
- Show expected output when helpful

### Visual Elements
- Use `<Info>`, `<Tip>`, `<Warning>` callouts appropriately
- Include `<CardGroup>` for related information
- Use tables for structured data
- Add images to break up long text sections

### SEO Optimization
- Include target keywords naturally in content
- Use descriptive headings (H2, H3)
- Add internal links to related documentation
- Include relevant external links when helpful

## Regenerating Blog Index

After creating or updating blog posts, run the blog index generator:

```bash
cd /Users/pierreillsley/Documents/GitHub/docs
node scripts/generate-blog-index.js
```

This will:
- Update the main blog index page
- Organize posts by category
- Generate RSS feed
- Update category navigation

## Image Guidelines

### Image Placement
Store blog images in `/public/blog-images/` directory.

### Naming Convention
- Use descriptive names: `tutorial-latex-tables.png`
- Include post topic: `user-story-research-workflow.jpg`
- Use web-optimized formats: PNG for screenshots, JPG for photos

### Image Sizes
- Featured images: 1200x630px (social media optimal)
- Inline images: Max width 800px
- Screenshots: Original size but optimize for web

## Examples

### Good Title Examples
- "5 LaTeX Table Tricks That Will Save You Hours"
- "From Word to LaTeX: Sarah's Research Journey"
- "Real-time Collaboration is Now Available"
- "How to Create Professional CVs in LaTeX"

### Good Description Examples
- "Learn five advanced LaTeX table techniques that will streamline your document creation workflow"
- "Follow Sarah's transformation from Word user to LaTeX expert and discover the key steps in her journey"
- "Introducing real-time collaboration features that enable seamless team editing for all users"

## Best Practices

1. **Keep posts focused** - One main topic per post
2. **Include working examples** - Always provide complete, testable code
3. **Link to related content** - Connect to relevant documentation
4. **Update regularly** - Keep content current with platform changes
5. **Optimize for search** - Use relevant keywords naturally
6. **Make it scannable** - Use headings, lists, and callouts effectively