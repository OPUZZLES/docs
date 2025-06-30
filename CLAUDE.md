# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a LaTeX documentation project built with Mintlify for LaTeX Cloud Studio. The site uses MDX (Markdown with JSX) files to create interactive LaTeX learning resources with a focus on user-friendly design and comprehensive coverage.

## Project Goals

- Create comprehensive LaTeX documentation for LaTeX Cloud Studio (https://www.latex-cloud-studio.com/)
- Focus on user-friendly explanations and better design
- Use accent color #FF6037 (orange-red) throughout the site
- Organize content in a logical, progressive learning structure
- Build engaging blog content that complements technical documentation

## Current Focus

**Documentation Quality Standards**:
- Every LaTeX code example must include a "**Rendered output:**" section
- Major documentation pages should exceed 3000 words (surpassing Overleaf)
- Use consistent HTML styling for visual examples
- Maintain proper MDX structure (balanced div tags)
- SEO-optimized titles (< 60 chars) and descriptions (< 160 chars)

## Important Notes

- **DO NOT mention Overleaf** anywhere in the documentation - we are a competitor
- This documentation is specifically for LaTeX Cloud Studio, a cloud-based LaTeX editor
- No installation guides needed since it's a SaaS platform

## Essential Commands

### Development
- `mintlify dev` - Start the local development server (default port 3000)
- `mintlify dev --port 3333` - Start dev server on custom port
- `mintlify broken-links` - Validate all reference links in documentation

### Installation
- `npm i -g mintlify@latest` - Install/update Mintlify CLI globally
- `mint install` - Re-install dependencies if dev environment issues occur

## Content Structure (Overleaf-inspired)

### Main Categories to Implement
```
/learn/                    # Main learning hub
  /latex/                  # Core LaTeX tutorials
    /basics/              # Getting started with LaTeX
    /document-structure/  # Document classes, sections, etc.
    /mathematics/         # Math typesetting
    /tables/              # Creating tables
    /figures/             # Images and figures
    /bibliography/        # Citations and references
    /fonts-formatting/    # Typography and styling
    /lists/               # Enumerated and itemized lists
    /errors/              # Common errors and debugging
  
  /how-to/                # Practical guides and recipes
    /articles/            # Writing articles
    /presentations/       # Beamer presentations
    /cv-resume/          # CVs and resumes
    /thesis/             # Thesis writing
    
  /reference/             # Quick reference guides
    /symbols/            # Symbol reference
    /commands/           # Command reference
    /packages/           # Popular package guides

/templates/               # Ready-to-use templates
/examples/               # Code examples gallery
```

### Navigation Structure
Organize documentation into logical learning paths:
1. **Learn LaTeX**: Progressive tutorials from basics to advanced
2. **How-to Guides**: Task-oriented practical guides
3. **Reference**: Quick lookups for symbols, commands, and packages
4. **Templates**: Ready-to-use document templates
5. **Examples**: Live code examples with previews

## Writing Style Guidelines

### Content Principles
- **User-friendly**: Write for beginners, avoid jargon where possible
- **Progressive**: Build concepts from simple to complex
- **Practical**: Include real-world examples and use cases
- **Visual**: Use diagrams, examples, and visual aids
- **Interactive**: Provide live code examples where possible
- **Comprehensive**: Aim for 3000+ words on major topics (exceeding Overleaf's coverage)

### LaTeX Code Examples
- Always show both the LaTeX code and rendered output
- Use `<CodeGroup>` for alternative approaches
- Include common variations and options
- Highlight important parts of the code
- **CRITICAL**: Every code example MUST have a "**Rendered output:**" section showing the visual result

### Visual Examples Format
For ALL LaTeX code examples that produce visual output, include:

```mdx
<CodeGroup>
\`\`\`latex filename.tex
\documentclass{article}
\begin{document}
% LaTeX code here
\end{document}
\`\`\`
</CodeGroup>

**Rendered output:**

<div style={{ backgroundColor: '#f8f9fa', padding: '1.5em', borderRadius: '8px', margin: '1em 0', border: '1px solid #e9ecef' }}>
<div style={{ marginBottom: '1em', fontSize: '0.9em', color: '#6c757d' }}>Description of what this shows:</div>
{/* HTML representation of the LaTeX output */}
</div>
```

### Table Styling Guidelines
When showing LaTeX table outputs in HTML:
- Use `borderCollapse: 'collapse'` to avoid double borders
- Apply borders to individual cells, not the table element
- Standard font sizes: `1.1em` for content, `0.9em` for captions
- Use `fontFamily: 'Georgia, serif'` for consistency
- Add proper spacing with `padding: '6px 12px'` or `padding: '8px 12px'` for booktabs

Example HTML table structure:
```html
<table style={{ margin: '0 auto', fontFamily: 'Georgia, serif', fontSize: '1.1em', borderCollapse: 'collapse' }}>
<tr>
<td style={{ borderTop: '1px solid #000', borderBottom: '1px solid #000', borderLeft: '1px solid #000', borderRight: '1px solid #000', padding: '6px 12px' }}>Cell content</td>
</tr>
</table>
```

### Better than Overleaf
- More visual examples and diagrams
- Clearer explanations for beginners
- Better navigation and search
- Modern, clean design with #FF6037 accent
- Mobile-friendly responsive design
- Faster page loads
- Comprehensive content (3000+ words for major topics)

## Key Development Notes

### MDX Components for LaTeX Docs
- `<CodeGroup>` - Show LaTeX code alongside rendered output
- `<Info>`, `<Tip>`, `<Warning>` - For LaTeX tips and common pitfalls
- `<Card>`, `<CardGroup>` - For organizing topics and tutorials
- `<Accordion>` - For troubleshooting sections and expandable content
- Custom components for LaTeX symbol tables and command references

### Special Considerations
- Include downloadable .tex files for examples
- Provide copy-paste ready code snippets
- Create visual symbol picker tools
- Add search functionality for commands/symbols
- Include PDF previews where relevant
- **IMPORTANT**: Always verify MDX parsing - ensure all divs are properly closed
- Escape special characters in LaTeX code: `{` → `&#123;`, `}` → `&#125;` when needed

### Common MDX Pitfalls to Avoid
1. **Unclosed divs**: Count opening and closing tags - they must match
2. **Unescaped braces**: In tables column specs like `{|l|c|r|}`, use `&#123;|l|c|r|&#125;`
3. **Complex inline styles**: Keep them simple and consistent
4. **Large code blocks**: Break into smaller, focused examples
5. **Inline matrices**: Always wrap matrix equations in div elements, not inline
6. **JSX comments**: Use `{/* comment */}` not `<!-- comment -->`
7. **Matrix delimiters**: Separate parentheses/brackets into their own span elements

### SEO and Accessibility
- Use descriptive titles for all pages (under 60 characters)
- Include meta descriptions focused on LaTeX learning (under 160 characters)
- Ensure all code examples have proper syntax highlighting
- Provide alt text for all images and diagrams
- Use keywords naturally throughout content
- Structure content with proper heading hierarchy

### SEO Title/Description Format
```yaml
title: LaTeX [Topic] - [Specific Benefit]
description: [Action verb] [topic] in LaTeX. [Key features/benefits]. [Call to action or value prop].
```

Example:
```yaml
title: LaTeX Tables Tutorial - Create Professional Tables
description: Complete LaTeX tables guide. Learn tabular, booktabs, multirow, alignment, formatting. Step-by-step examples included.
```

## Configuration
- **Main config**: `docs.json`
- **Primary color**: #FF6037 (orange-red)
- **Theme**: Clean, modern design focused on readability

## Deployment
- Automatic deployment via GitHub integration
- Changes to default branch deploy to production