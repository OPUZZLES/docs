#!/bin/bash

# Script to audit MDX files for placeholder links and missing references

echo "=== MDX Documentation Audit Report ==="
echo "Generated on: $(date)"
echo ""

# Function to check a file for issues
check_file() {
    local file="$1"
    local has_issues=false
    local issues=""
    
    # Check for placeholder hrefs
    if grep -E 'href="#"|href="/"' "$file" > /dev/null 2>&1; then
        local placeholders=$(grep -n -E 'href="#"|href="/"' "$file" | sed 's/^/    Line /')
        if [ ! -z "$placeholders" ]; then
            issues="${issues}  Placeholder links found:\n$placeholders\n"
            has_issues=true
        fi
    fi
    
    # Check for FAQ references without links
    if grep -i -E 'FAQ|frequently asked questions' "$file" > /dev/null 2>&1; then
        local faq_refs=$(grep -n -i -E 'FAQ|frequently asked questions' "$file" | grep -v 'href=' | sed 's/^/    Line /')
        if [ ! -z "$faq_refs" ]; then
            issues="${issues}  FAQ references without links:\n$faq_refs\n"
            has_issues=true
        fi
    fi
    
    # Check for Community references without links
    if grep -i -E 'community|forum|discord|slack' "$file" > /dev/null 2>&1; then
        local comm_refs=$(grep -n -i -E 'community|forum|discord|slack' "$file" | grep -v 'href=' | sed 's/^/    Line /')
        if [ ! -z "$comm_refs" ]; then
            issues="${issues}  Community references without links:\n$comm_refs\n"
            has_issues=true
        fi
    fi
    
    # Check for common placeholder text
    if grep -i -E 'coming soon|under construction|todo|tbd|placeholder' "$file" > /dev/null 2>&1; then
        local placeholders=$(grep -n -i -E 'coming soon|under construction|todo|tbd|placeholder' "$file" | sed 's/^/    Line /')
        if [ ! -z "$placeholders" ]; then
            issues="${issues}  Placeholder content found:\n$placeholders\n"
            has_issues=true
        fi
    fi
    
    # Check for broken internal links (simplified check)
    if grep -E 'href="/[^"]*"' "$file" > /dev/null 2>&1; then
        local internal_links=$(grep -o -E 'href="/[^"]*"' "$file" | sed 's/href="//;s/"$//' | sort | uniq)
        local broken_links=""
        while IFS= read -r link; do
            # Skip root link
            if [ "$link" = "/" ]; then
                continue
            fi
            # Check if the linked file might exist (basic check)
            local potential_file="/Users/pierreillsley/Documents/GitHub/docs${link}.mdx"
            local potential_dir="/Users/pierreillsley/Documents/GitHub/docs${link}"
            if [ ! -f "$potential_file" ] && [ ! -d "$potential_dir" ] && [ ! -f "${potential_dir}/index.mdx" ]; then
                broken_links="${broken_links}    Potentially broken link: $link\n"
                has_issues=true
            fi
        done <<< "$internal_links"
        if [ ! -z "$broken_links" ]; then
            issues="${issues}  Potentially broken internal links:\n$broken_links"
        fi
    fi
    
    if [ "$has_issues" = true ]; then
        echo "File: $file"
        echo -e "$issues"
        echo "---"
    fi
}

# Process all MDX files
total_files=0
files_with_issues=0

while IFS= read -r file; do
    ((total_files++))
    output=$(check_file "$file")
    if [ ! -z "$output" ]; then
        echo "$output"
        ((files_with_issues++))
    fi
done < <(find /Users/pierreillsley/Documents/GitHub/docs -name "*.mdx" -type f | sort)

echo ""
echo "=== Summary ==="
echo "Total MDX files scanned: $total_files"
echo "Files with issues: $files_with_issues"