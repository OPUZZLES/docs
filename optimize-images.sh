#!/bin/bash

# Image optimization script for achieving 100 PageSpeed score

echo "🚀 Starting image optimization..."

# Check if required tools are installed
if ! command -v cwebp &> /dev/null; then
    echo "Installing webp tools..."
    brew install webp
fi

if ! command -v pngquant &> /dev/null; then
    echo "Installing pngquant..."
    brew install pngquant
fi

if ! command -v jpegoptim &> /dev/null; then
    echo "Installing jpegoptim..."
    brew install jpegoptim
fi

# Create optimized versions directory
mkdir -p images/optimized
mkdir -p logo/optimized

# Optimize PNG files
echo "📸 Optimizing PNG files..."
for file in images/*.png logo/*.png; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        dir=$(dirname "$file")
        
        # Create WebP version
        cwebp -q 85 "$file" -o "$dir/optimized/${filename%.*}.webp" 2>/dev/null
        
        # Optimize PNG
        pngquant --quality=65-80 --strip --output "$dir/optimized/$filename" --force "$file" 2>/dev/null
        
        echo "✓ Optimized $file"
    fi
done

# Optimize JPEG files
echo "📸 Optimizing JPEG files..."
for file in images/*.jpg images/*.jpeg; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        dir=$(dirname "$file")
        
        # Create WebP version
        cwebp -q 85 "$file" -o "$dir/optimized/${filename%.*}.webp" 2>/dev/null
        
        # Optimize JPEG
        cp "$file" "$dir/optimized/$filename"
        jpegoptim -m85 --strip-all "$dir/optimized/$filename" 2>/dev/null
        
        echo "✓ Optimized $file"
    fi
done

# Generate sizes report
echo ""
echo "📊 Size comparison:"
echo "Original images:"
du -sh images/*.png images/*.jpg images/*.jpeg logo/*.png 2>/dev/null | sort -hr
echo ""
echo "Optimized images:"
du -sh images/optimized/* logo/optimized/* 2>/dev/null | sort -hr

echo ""
echo "✅ Image optimization complete!"
echo ""
echo "Next steps:"
echo "1. Replace original images with optimized versions"
echo "2. Update MDX files to use WebP with PNG fallback"
echo "3. Test locally with 'mintlify dev'"
echo "4. Deploy and re-test PageSpeed"