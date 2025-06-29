# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a LaTeX documentation project built with Mintlify for LaTeX Cloud Studio. The site uses MDX (Markdown with JSX) files to create interactive LaTeX learning resources with a focus on user-friendly design and comprehensive coverage.

## Project Goals

- Create comprehensive LaTeX documentation for LaTeX Cloud Studio (https://www.latex-cloud-studio.com/)
- Focus on user-friendly explanations and better design
- Use accent color #FF6037 (orange-red) throughout the site
- Organize content in a logical, progressive learning structure

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

### LaTeX Code Examples
- Always show both the LaTeX code and rendered output
- Use `<CodeGroup>` for alternative approaches
- Include common variations and options
- Highlight important parts of the code

### Better than Overleaf
- More visual examples and diagrams
- Clearer explanations for beginners
- Better navigation and search
- Modern, clean design with #FF6037 accent
- Mobile-friendly responsive design
- Faster page loads

## Key Development Notes

### MDX Components for LaTeX Docs
- `<CodeGroup>` - Show LaTeX code alongside rendered output
- `<Info>`, `<Tip>`, `<Warning>` - For LaTeX tips and common pitfalls
- `<Card>`, `<CardGroup>` - For organizing topics and tutorials
- Custom components for LaTeX symbol tables and command references

### Special Considerations
- Include downloadable .tex files for examples
- Provide copy-paste ready code snippets
- Create visual symbol picker tools
- Add search functionality for commands/symbols
- Include PDF previews where relevant

### SEO and Accessibility
- Use descriptive titles for all pages
- Include meta descriptions focused on LaTeX learning
- Ensure all code examples have proper syntax highlighting
- Provide alt text for all images and diagrams

## Configuration
- **Main config**: `docs.json`
- **Primary color**: #FF6037 (orange-red)
- **Theme**: Clean, modern design focused on readability

## Deployment
- Automatic deployment via GitHub integration
- Changes to default branch deploy to production