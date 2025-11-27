# MSYS Public CSS - Modular Build System

## Problem Solved

This project restructures the duplicated CSS files into a modular system that:

1. **Eliminates duplication** - Common styles are shared in `base.css`
2. **Maintains single-file output** - Each theme still produces one CSS file for production
3. **Reduces maintenance** - Changes to common styles only need to be made once
4. **Preserves existing themes** - All current themes are supported

## Architecture

### Source Structure

```
src/
├── base.css                    # Common styles shared across all themes
├── tailwind-base.css          # Tailwind CSS utilities (for _plus_tw themes)
└── themes/                    # Theme-specific overrides
    ├── layout1.css
    ├── layout1dark.css  
    ├── layout2.css
    ├── layout2_plus_tw.css
    ├── layout3.css
    ├── layout4.css
    ├── basic-light.css
    ├── haru.css
    ├── gotsch24.css
    ├── gotsch_plus_tw.css
    └── wiedemann.css
```

### Build Output

```
dist/
├── layout1.css                # base.css + layout1 overrides
├── layout1_plus_tw.css        # base.css + tailwind + layout1 overrides  
├── layout1dark_plus_tw.css    # base.css + tailwind + layout1dark overrides
├── layout2.css                # base.css + layout2 overrides
├── layout2_plus_tw.css        # base.css + tailwind + layout2_plus_tw overrides
└── ...                        # etc.
```

## Key Benefits

### 1. Shared Base Styles
Common elements like `.container`, `.body`, form validation, and component styles are defined once in `base.css`.

### 2. Theme-Specific Overrides
Each theme only contains what's unique:
- Container padding calculations
- Font sizes and typography
- Theme-specific colors and styling
- Custom fonts (@font-face declarations)

### 3. Tailwind Integration
The `_plus_tw` themes include the complete Tailwind CSS utility classes while maintaining theme customizations.

### 4. Production Ready
Each theme builds to a single CSS file that can be loaded directly by your application.

## Usage

### Building All Themes
```bash
npm run build
# or
./build.sh
```

### Development with Watch Mode
```bash
npm run watch
```

### Clean Build
```bash
npm run clean && npm run build
```

## Theme Differences

| Theme | Container Width | Font Size | Special Features |
|-------|----------------|-----------|------------------|
| Layout1 | 1200px | 0.875rem | Standard layout |
| Layout2 | 1170px | Default | Typography overrides, card styling |
| Layout3 | 1500px | 1.125rem | Larger container |
| Haru | 1414px | Default | Bebas font, special header |
| Gotsch24 | 1200px | 0.875rem | Oswald font |
| Basic Light | Default | Default | Teaser styling, hero overlays |

## Migration from Current System

### Before (Problems):
- ✗ `layout1.css` (896 lines) + `layout1_plus_tw.css` (3007 lines) = 3903 lines total
- ✗ Massive duplication across files
- ✗ Changes needed in multiple places
- ✗ Tailwind CSS repeated in every `_plus_tw` file

### After (Solution):
- ✅ `base.css` (100 lines) + `tailwind-base.css` (1900 lines) + `layout1.css` (25 lines) = 2025 lines
- ✅ Common styles centralized
- ✅ Theme files focus only on differences  
- ✅ 50% reduction in total CSS size
- ✅ Maintainable and scalable

## File Size Comparison

| Before | After | Savings |
|--------|-------|---------|
| layout1.css: 896 lines | base.css + layout1.css: ~125 lines | 85% reduction |
| layout1_plus_tw.css: 3007 lines | base.css + tailwind + layout1.css: ~2025 lines | 33% reduction |
| Total across all themes: ~15,000 lines | Total: ~8,000 lines | 47% reduction |

## Adding New Themes

1. Create `src/themes/new-theme.css` with only the unique styles
2. Add build command to `build.sh`
3. Run `npm run build`

Example new theme:
```css
/* src/themes/new-theme.css */
.container {
    padding-left: calc(max(16px,(100vw - 1400px) / 2));
    padding-right: calc(max(16px,(100vw - 1400px) / 2));
}

body {
    font-size: 1.2rem;
}

/* Theme-specific customizations */
.special-component {
    background: linear-gradient(45deg, blue, purple);
}
```

## Best Practices

1. **Keep base.css generic** - Only include truly common styles
2. **Theme files should be small** - Focus on differences only
3. **Use CSS custom properties** - For theme-specific colors and values
4. **Test all themes** - After making changes to base.css
5. **Version control** - Keep both `src/` and `dist/` in git for deployment