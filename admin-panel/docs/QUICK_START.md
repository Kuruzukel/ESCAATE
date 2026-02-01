# Quick Start Guide

## Installation & Setup

### 1. Install Dependencies
```bash
cd admin-panel
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

This will:
- Watch for file changes
- Compile SCSS to CSS
- Start BrowserSync for live reload
- Serve the application at `http://localhost:3000`

### 3. Build for Production
```bash
npm run build:prod
```

## Project Structure at a Glance

```
admin-panel/src/
├── pages/           ← All HTML pages
├── components/      ← Reusable UI components
├── layouts/         ← Master layouts
├── assets/
│   ├── css/         ← Stylesheets
│   ├── js/          ← JavaScript files
│   ├── vendor/      ← Third-party libraries
│   ├── img/         ← Images & icons
│   └── fonts/       ← Font files
└── utils/           ← Helper functions
```

## Main Pages

| Page | Location | Purpose |
|------|----------|---------|
| Dashboard | `src/pages/dashboard.html` | Main analytics view |
| Trainees | `src/pages/manage-trainees.html` | Manage trainees |
| Courses | `src/pages/courses-programs.html` | Manage courses |
| Enrollments | `src/pages/enrollment-records.html` | View enrollments |
| Appointments | `src/pages/appointments.html` | Schedule appointments |
| Inventory | `src/pages/inventory-management.html` | Manage inventory |
| Profile | `src/pages/manage-profile.html` | User profile |
| Settings | `src/pages/change-password.html` | Change password |

## Common Tasks

### Add a New Page
1. Create HTML file in `src/pages/`
2. Use existing pages as templates
3. Update navigation links in components

### Add Styles
1. Create CSS file in `src/assets/css/`
2. Import in main stylesheet or link in HTML
3. Follow naming convention: `feature-name.css`

### Add JavaScript
1. Create JS file in `src/assets/js/`
2. Link in HTML file
3. Follow naming convention: `feature-name.js`

### Add Images
1. Place in `src/assets/img/`
2. Reference as: `../assets/img/image-name.png`

## Build Commands

```bash
# Development
npm run dev              # Watch & serve
npm run build            # Build once

# Production
npm run build:prod       # Production build
npm run build:prod:js    # Build JS only
npm run build:prod:css   # Build CSS only

# Utilities
npm run serve            # Start server
npm run watch            # Watch files
```

## Asset Paths

All paths are relative to the HTML file location (`src/pages/`):

```html
<!-- CSS -->
<link rel="stylesheet" href="../assets/css/style.css" />

<!-- JavaScript -->
<script src="../assets/js/main.js"></script>

<!-- Vendor -->
<script src="../assets/vendor/js/bootstrap.js"></script>

<!-- Images -->
<img src="../assets/img/logo.png" alt="Logo" />
```

## Technologies Used

- **Bootstrap 5** - Responsive framework
- **jQuery 3.5.1** - DOM manipulation
- **ApexCharts** - Data visualization
- **Perfect Scrollbar** - Custom scrollbars
- **Boxicons** - Icon library
- **Gulp** - Build automation
- **Webpack** - Module bundler
- **SCSS** - CSS preprocessing

## Troubleshooting

### Pages not loading?
- Check asset paths are correct
- Ensure relative paths start with `../`
- Verify files exist in `src/assets/`

### Styles not applying?
- Clear browser cache
- Rebuild CSS: `npm run build:css`
- Check CSS file is linked in HTML

### JavaScript errors?
- Check browser console for errors
- Verify script paths are correct
- Ensure jQuery is loaded before other scripts

## Need Help?

Refer to:
- `README.md` - Full project documentation
- `docs/STRUCTURE.md` - Detailed structure guide
- `docs/MIGRATION_GUIDE.md` - Migration information
