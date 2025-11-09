# Cleanup Instructions

The project has been restructured. The following old files/folders can be safely deleted:

## Files to Remove

```powershell
# Remove old vanilla HTML/CSS/JS files (no longer needed)
Remove-Item "styles.css" -Force
Remove-Item "script.js" -Force
Remove-Item "config.js" -Force

# Remove old documentation (outdated)
Remove-Item "IMPLEMENTATION_SUMMARY.md" -Force
Remove-Item "TESTING.md" -Force
Remove-Item "README-CONTROLS.md" -Force -ErrorAction SilentlyContinue

# Remove old refraction-app folder (migrated to new structure)
Remove-Item "refraction-app" -Recurse -Force

# Remove old images folder (moved to public/images)
Remove-Item "images" -Recurse -Force

# Remove empty src folder at root (if exists)
Remove-Item "src" -Recurse -Force -ErrorAction SilentlyContinue
```

## What to Keep

- `/src` - New React application source
- `/public` - Static assets
- `package.json` - Updated dependencies
- `vite.config.js` - Build configuration
- `tailwind.config.js` - Styling configuration
- `postcss.config.js` - PostCSS configuration
- `index.html` - Main entry point
- `.gitignore`, `eslint.config.js` - Configuration files

## Run Cleanup

Execute all cleanup commands at once:

```powershell
Remove-Item "styles.css", "script.js", "config.js", "IMPLEMENTATION_SUMMARY.md", "TESTING.md" -Force -ErrorAction SilentlyContinue
Remove-Item "refraction-app", "images" -Recurse -Force -ErrorAction SilentlyContinue
```

After cleanup, install dependencies and start the dev server:

```powershell
npm install
npm run dev
```
