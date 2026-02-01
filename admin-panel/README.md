# CAATE Admin Panel

Professional admin dashboard for CAATE (Center for Advanced Aesthetic and Technical Education).

## Project Structure

```
admin-panel/
├── src/
│   ├── pages/                    # Page templates (HTML)
│   │   ├── dashboard.html        # Main dashboard
│   │   ├── manage-trainees.html  # Trainee management
│   │   ├── courses-programs.html # Course management
│   │   ├── enrollment-records.html
│   │   ├── appointments.html     # Appointment scheduling
│   │   ├── inventory-management.html
│   │   ├── manage-profile.html   # User profile
│   │   ├── change-password.html  # Password management
│   │   ├── auth-login.html       # Login page
│   │   ├── auth-register.html    # Registration page
│   │   └── auth-forgot-password.html
│   ├── components/               # Reusable components (navbar, sidebar, etc.)
│   ├── layouts/                  # Layout templates
│   ├── assets/
│   │   ├── css/                  # Stylesheets
│   │   │   ├── custom-theme.css
│   │   │   ├── demo.css
│   │   │   └── ...
│   │   ├── js/                   # JavaScript files
│   │   │   ├── main.js
│   │   │   ├── dashboards-analytics.js
│   │   │   ├── menu-toggle.js
│   │   │   └── ...
│   │   ├── vendor/               # Third-party libraries
│   │   │   ├── css/
│   │   │   ├── js/
│   │   │   ├── fonts/
│   │   │   └── libs/
│   │   ├── img/                  # Images and icons
│   │   └── fonts/                # Custom fonts
│   └── utils/                    # Utility functions
├── public/                       # Static files
├── config/                       # Configuration files
├── docs/                         # Documentation
├── gulpfile.js                   # Gulp build configuration
├── webpack.config.js             # Webpack configuration
├── package.json                  # Dependencies
└── README.md                     # This file
```

## Pages Overview

### Dashboard Pages
- **dashboard.html** - Main analytics dashboard with enrollment statistics
- **manage-trainees.html** - Trainee management interface
- **courses-programs.html** - Course and program management
- **enrollment-records.html** - Enrollment tracking and records
- **appointments.html** - Appointment scheduling system
- **inventory-management.html** - Inventory tracking

### User Management
- **manage-profile.html** - User profile management
- **change-password.html** - Password change interface

### Authentication
- **auth-login.html** - Login page
- **auth-register.html** - Registration page
- **auth-forgot-password.html** - Password recovery

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build:prod
```

### Serve

```bash
npm run serve
```

## Features

- Responsive Bootstrap 5 design
- Modern admin dashboard with analytics
- User management system
- Course and program management
- Enrollment tracking
- Appointment scheduling
- Inventory management
- Authentication system
- Perfect Scrollbar integration
- ApexCharts for data visualization

## Technologies

- Bootstrap 5
- jQuery 3.5.1
- SCSS/CSS
- Gulp (Build tool)
- Webpack
- ApexCharts
- Perfect Scrollbar
- Boxicons

## File Naming Conventions

- **Pages**: `page-name.html` (e.g., `dashboard.html`)
- **Styles**: `feature-name.css` (e.g., `custom-theme.css`)
- **Scripts**: `feature-name.js` (e.g., `dashboards-analytics.js`)
- **Images**: `descriptive-name.png` (e.g., `ADMINCAATELOGO.png`)

## Asset Paths

All asset paths in HTML files reference:
- CSS: `../assets/css/`
- JS: `../assets/js/`
- Vendor: `../assets/vendor/`
- Images: `../assets/img/`
- Fonts: `../assets/fonts/`

## Build Scripts

- `npm run build` - Development build
- `npm run build:prod` - Production build
- `npm run build:js` - Build JavaScript only
- `npm run build:css` - Build CSS only
- `npm run watch` - Watch for changes
- `npm run serve` - Start development server

## License

MIT
