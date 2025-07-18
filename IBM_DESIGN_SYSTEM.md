# IBM Design System Implementation

## Overview

This document outlines the IBM Design System implementation for the IT Documentation website. The design system follows IBM's official design principles and provides a consistent, professional appearance.

## Color Palette

### Primary Colors
- **IBM Blue 60** (`#0062FF`) - Primary brand color
- **IBM Blue 70** (`#0043CE`) - Darker blue for hover states
- **IBM Blue 50** (`#0F62FE`) - Lighter blue for active states
- **IBM Blue 40** (`#78A9FF`) - Light blue for backgrounds
- **IBM Blue 30** (`#A7C7E7`) - Very light blue for subtle accents

### Gray Scale
- **Gray 100** (`#161616`) - Darkest gray (text)
- **Gray 90** (`#262626`) - Very dark gray
- **Gray 80** (`#393939`) - Dark gray
- **Gray 70** (`#525252`) - Medium dark gray (secondary text)
- **Gray 60** (`#6F6F6F`) - Medium gray
- **Gray 50** (`#8D8D8D`) - Medium light gray (tertiary text)
- **Gray 40** (`#A8A8A8`) - Light gray
- **Gray 30** (`#C1C1C1`) - Very light gray
- **Gray 20** (`#DDE1E6`) - Lightest gray (borders)
- **Gray 10** (`#F4F4F4`) - Background gray
- **Gray 5** (`#FAFAFA`) - Very light background

### Semantic Colors
- **Green 60** (`#24A148`) - Success states
- **Red 60** (`#DA1E28`) - Error states
- **Orange 60** (`#FF832B`) - Warning states
- **Purple 60** (`#8A3FFC`) - Purple accent
- **Teal 60** (`#0072C3`) - Teal accent

## Typography

### Font Family
- **Primary**: IBM Plex Sans
- **Fallback**: Inter, system-ui, -apple-system, sans-serif
- **Monospace**: IBM Plex Mono

### Type Scale
- **Heading 01**: 2.25rem (36px) - Page titles
- **Heading 02**: 1.75rem (28px) - Section titles
- **Heading 03**: 1.5rem (24px) - Subsection titles
- **Heading 04**: 1.25rem (20px) - Card titles
- **Body Long 01**: 1rem (16px) - Body text
- **Body Long 02**: 0.875rem (14px) - Smaller body text
- **Body Short 01**: 1rem (16px) - Short body text
- **Body Short 02**: 0.875rem (14px) - Smaller short text
- **Caption 01**: 0.75rem (12px) - Captions
- **Label 01**: 0.75rem (12px) - Form labels

## Spacing System

Based on 8px grid system:
- **01**: 0.125rem (2px)
- **02**: 0.25rem (4px)
- **03**: 0.5rem (8px)
- **04**: 0.75rem (12px)
- **05**: 1rem (16px)
- **06**: 1.5rem (24px)
- **07**: 2rem (32px)
- **08**: 2.5rem (40px)
- **09**: 3rem (48px)
- **10**: 4rem (64px)
- **11**: 5rem (80px)
- **12**: 6rem (96px)

## Border Radius
- **Small**: 2px
- **Medium**: 4px
- **Large**: 8px

## Transitions
- **Fast**: 0.1s ease
- **Medium**: 0.2s ease
- **Slow**: 0.3s ease

## CSS Variables

All IBM Design System values are available as CSS custom properties:

```css
/* Colors */
--ibm-blue-60: #0062FF;
--ibm-gray-100: #161616;
--ibm-green-60: #24A148;

/* Typography */
--ifm-font-family-base: 'IBM Plex Sans', 'Inter', system-ui, -apple-system, sans-serif;

/* Spacing */
--ibm-spacing-05: 1rem;
--ibm-spacing-06: 1.5rem;

/* Borders */
--ibm-border-radius-medium: 4px;

/* Transitions */
--ibm-transition-medium: 0.2s ease;
```

## Utility Classes

### Typography Utilities
```css
.ibm-text--heading-01
.ibm-text--heading-02
.ibm-text--heading-03
.ibm-text--heading-04
.ibm-text--body-long-01
.ibm-text--body-long-02
.ibm-text--body-short-01
.ibm-text--body-short-02
.ibm-text--caption-01
.ibm-text--label-01
```

### Color Utilities
```css
.ibm-color--blue-60
.ibm-color--gray-100
.ibm-color--green-60
.ibm-bg--blue-60
.ibm-bg--gray-10
.ibm-bg--green-60
```

### Spacing Utilities
```css
.ibm-padding--05
.ibm-padding--06
.ibm-margin--05
.ibm-margin--06
```

### Border Utilities
```css
.ibm-border--light
.ibm-border--medium
.ibm-border--dark
.ibm-border-radius--small
.ibm-border-radius--medium
.ibm-border-radius--large
```

### Shadow Utilities
```css
.ibm-shadow--light
.ibm-shadow--medium
.ibm-shadow--dark
```

### Transition Utilities
```css
.ibm-transition--fast
.ibm-transition--medium
.ibm-transition--slow
```

## Layout System

### Grid System
```css
.ibm-grid
.ibm-grid--2
.ibm-grid--3
.ibm-grid--4
```

### Container System
```css
.ibm-container
.ibm-container--narrow
.ibm-container--wide
```

## Usage Examples

### Basic Card Component
```html
<div class="ibm-container ibm-padding--06">
  <div class="ibm-border--light ibm-border-radius--medium ibm-padding--06">
    <h3 class="ibm-text--heading-03 ibm-color--gray-100">Card Title</h3>
    <p class="ibm-text--body-long-01 ibm-color--gray-70">Card content goes here.</p>
  </div>
</div>
```

### Button Component
```html
<button class="ibm-bg--blue-60 ibm-color--white ibm-padding--03 ibm-border-radius--small ibm-transition--medium">
  Primary Button
</button>
```

### Navigation Item
```html
<a href="#" class="ibm-color--gray-100 ibm-text--body-short-01 ibm-transition--medium">
  Navigation Link
</a>
```

## Implementation Status

### ✅ Completed
- [x] IBM Color Palette implementation
- [x] IBM Typography system
- [x] IBM Spacing system
- [x] CSS Variables and utility classes
- [x] Basic layout system

### 🔄 In Progress
- [ ] Navbar styling with IBM design
- [ ] Sidebar styling with IBM design
- [ ] Footer styling with IBM design
- [ ] Component styling (buttons, cards, forms)

### 📋 Planned
- [ ] Interactive elements (hover, focus states)
- [ ] Animation and transitions
- [ ] Responsive design improvements
- [ ] Dark mode implementation
- [ ] Accessibility improvements

## Browser Support

This implementation supports:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Considerations

- IBM Plex Sans font is loaded from Google Fonts with display=swap
- CSS variables are used for efficient theming
- Utility classes are optimized for minimal CSS output
- Transitions are hardware-accelerated where possible

## Accessibility

The IBM Design System implementation follows WCAG 2.1 AA guidelines:
- Color contrast ratios meet accessibility standards
- Focus states are clearly visible
- Typography is readable at all sizes
- Interactive elements have sufficient touch targets

## Maintenance

To maintain consistency:
1. Always use IBM Design System variables and utilities
2. Follow the 8px grid spacing system
3. Use IBM Plex Sans for all text
4. Maintain color contrast ratios
5. Test across different screen sizes and browsers 