# Performance Optimizations for 100 PageSpeed Score

## 1. Image Optimization (High Priority)

### Convert PNG to WebP
```bash
# Install cwebp if not already installed
brew install webp

# Convert images
cwebp -q 85 images/hero-dark.png -o images/hero-dark.webp
cwebp -q 85 images/hero-light.png -o images/hero-light.webp
cwebp -q 90 images/checks-passed.png -o images/checks-passed.webp
cwebp -q 90 logo/LCS-Logo-c-removebg-preview.png -o logo/LCS-Logo-c-removebg-preview.webp
```

### Optimize existing PNGs
```bash
# Install pngquant
brew install pngquant

# Optimize PNGs (keep originals as fallback)
pngquant --quality=65-80 images/*.png
pngquant --quality=65-80 logo/*.png
```

## 2. Mintlify Configuration Updates

Add to `docs.json`:

```json
{
  "performance": {
    "lazyLoadImages": true,
    "preloadFonts": true,
    "optimizeImages": true
  }
}
```

## 3. Create Next-Gen Image Component

Create `components/OptimizedImage.mdx`:

```mdx
export const OptimizedImage = ({ src, alt, width, height }) => {
  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/, '.webp');
  
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img 
        src={src} 
        alt={alt} 
        width={width} 
        height={height}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
};
```

## 4. Font Optimization

Add font preloading to improve LCP:

```json
{
  "metadata": {
    "link": [
      {
        "rel": "preconnect",
        "href": "https://fonts.googleapis.com"
      },
      {
        "rel": "preconnect",
        "href": "https://fonts.gstatic.com",
        "crossorigin": true
      }
    ]
  }
}
```

## 5. Remove Unused JavaScript

Mintlify loads some features by default. Add to `docs.json`:

```json
{
  "features": {
    "feedback": false,
    "darkMode": true,
    "search": true
  }
}
```

## 6. Enable Compression

Ensure your hosting provider has:
- Gzip/Brotli compression enabled
- HTTP/2 enabled
- CDN with edge caching

## 7. Critical CSS

Mintlify handles this automatically, but ensure:
- No custom CSS in head
- All styles are module-based

## 8. Reduce DOM Size

- Break large pages into smaller sections
- Use accordions for lengthy content
- Implement pagination for long lists

## Implementation Steps:

1. Run image optimization commands above
2. Update `docs.json` with performance settings
3. Replace image references in MDX files
4. Test locally with `mintlify dev`
5. Deploy and re-test PageSpeed

These optimizations should get you to 100/100 on PageSpeed Insights.