# Admin Panel Structure Documentation

## Directory Overview

### `/src` - Source Files
Main development directory containing all source code.

#### `/src/pages`
- HTML page templates
- Each page represents a distinct admin section
- Examples: dashboard.html, users.html, courses.html

#### `/src/components`
- Reusable UI components
- Modular HTML snippets
- Examples: navbar.html, sidebar.html, footer.html

#### `/src/layouts`
- Master layout templates
- Base HTML structure for pages
- Examples: main-layout.html, auth-layout.html

#### `/src/assets`
- All static assets

##### `/src/assets/css`
- Stylesheets (CSS/SCSS)
- Global styles, component styles, page-specific styles

##### `/src/assets/js`
- JavaScript files
- Utilities, helpers, page scripts

##### `/src/assets/images`
- Image files (PNG, JPG, SVG)
- Icons, logos, backgrounds

##### `/src/assets/fonts`
- Font files
- Custom fonts, icon fonts

#### `/src/utils`
- Utility functions and helpers
- Shared JavaScript utilities
- API helpers, formatters, validators

### `/public`
- Static files served directly
- Compiled/built files
- Assets that don't need processing

### `/config`
- Configuration files
- Build configuration (gulpfile.js)
- Environment settings

### `/docs`
- Documentation files
- Setup guides
- API documentation

## File Naming Conventions

- **Pages**: `page-name.html` (e.g., `dashboard.html`)
- **Components**: `component-name.html` (e.g., `navbar.html`)
- **Styles**: `feature-name.css` (e.g., `dashboard.css`)
- **Scripts**: `feature-name.js` (e.g., `dashboard.js`)
- **Images**: `descriptive-name.png` (e.g., `logo-caate.png`)

## Best Practices

1. Keep components modular and reusable
2. Use semantic HTML
3. Follow CSS naming conventions (BEM or similar)
4. Organize JavaScript by feature
5. Keep assets organized by type
6. Document complex functionality
7. Use consistent indentation (2 spaces)
