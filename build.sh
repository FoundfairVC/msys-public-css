#!/bin/bash

# CSS Build Script - Combines base CSS with theme overrides

# Create build directory if it doesn't exist
mkdir -p dist

# Function to build a CSS file from base + theme
build_css() {
    local theme_name=$1
    local output_file=$2
    local include_tailwind=${3:-false}
    
    echo "Building $output_file..."
    
    # Start with base CSS
    cat src/base.css > "dist/$output_file"
    
    # Add Tailwind if needed
    if [ "$include_tailwind" = true ]; then
        echo "" >> "dist/$output_file"
        echo "/* Tailwind CSS Utilities */" >> "dist/$output_file"
        cat src/tailwind-base.css >> "dist/$output_file"
    fi
    
    # Add theme-specific overrides
    echo "" >> "dist/$output_file"
    echo "/* Theme-specific overrides */" >> "dist/$output_file"
    cat "src/themes/$theme_name.css" >> "dist/$output_file"
    
    echo "✅ Built $output_file"
}

# Build all theme files
echo "🏗️  Building CSS files..."

# Non-Tailwind themes
build_css "layout1" "layout1.css"
build_css "layout2" "layout2.css" 
build_css "layout3" "layout3.css"
build_css "layout4" "layout4.css" # Will need to create this theme file
build_css "haru" "haru.css"
build_css "gotsch24" "gotsch24.css"
build_css "basic-light" "basic-light.css"
build_css "wiedemann" "wiedemann.css" # Will need to create this theme file

# Tailwind themes
build_css "layout1" "layout1_plus_tw.css" true
build_css "layout1dark" "layout1dark_plus_tw.css" true
build_css "layout2_plus_tw" "layout2_plus_tw.css" true
build_css "layout3" "layout3_plus_tw.css" true
build_css "gotsch_plus_tw" "gotsch_plus_tw.css" true

echo "🎉 Build complete! All CSS files are in the dist/ directory"