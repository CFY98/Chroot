# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/):

- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Fixed` for any bug fixes.
- `Improved` for performance improvements.

## [[v0.3.0] - React Conversion](https://github.com/CFY98/Chroot/compare/c715cd2...8deb8ab)
### Added
- React component-based UI
- CSS Modules for React components
- Custom hooks for basket state management

### Changed
- React Router in place of custom SPA router
- React components in place of static HTML files

### Improved
- Vanilla JS slideshow and scroll transitions preserved with `useEffect`
- Terminal preserved via `useEffect`

### Fixed
- PDF receipt has custom css module to ensure receipt items don't "break" across pages

## [[v0.2.1] - Vanilla JS](https://github.com/CFY98/Chroot/tree/v0.2.1)
### Added
- Visual mode with point-and-click navigation
- Toast notifications
- Custom SPA router
- Tab autocomplete
- Responsive carousel with caption animations

### Changed
- SPA router with fetch promise-chaining in favor of iframes
- `HTML2PDF` in favor of `window.print()`

### Improved
- Carousel from legacy version includes disablers preventing jumping between slides during manual navigation

## [[v0.2.0] - Prototype](https://github.com/CFY98/Chroot/tree/v0.2.0)
### Added
- Terminal input to utilise Git-style commands for basket UI
- Local Storage to track live basket updates
- PDF generation via the browser's native `window.print()` API
- Custom Screen Reader Announcer via `ARIA` live regions
- Keyboard history navigation via arrow keys

### Changed
- Interactive terminal input in place of Easter-Egg

### Removed
- Image carousel

## [[v0.1.0] - Legacy](https://github.com/CFY98/Chroot/tree/v0.2.1)
### Added
- Multi-page navigation with `anchor` links
- Rotating hero section with previous/next controls for carousel
- Favicon for website tab logo
- Index, pastries, and drinks html pages
- Easter Egg showcasing page path
