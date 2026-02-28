# ChatGPT Clone - Deployment Guide

## Quick Deploy Options

### Option 1: Vercel (Recommended - Fastest)

1. Push code to GitHub (already done ✅)
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select the `chat-gpt-clone` repository
5. Vercel will auto-detect Vite and deploy

**Build Settings:**
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

### Option 2: Netlify

1. Visit [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select `chat-gpt-clone`
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy"

### Option 3: GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"homepage": "https://accbot-01.github.io/chat-gpt-clone",
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Update vite.config.ts base path:
export default defineConfig({
  base: '/chat-gpt-clone/',
  // ... rest of config
})

# Deploy
npm run deploy
```

### Option 4: Self-Hosted (VPS/Server)

```bash
# Build the project
npm run build

# The dist/ folder contains the production build
# Copy it to your web server:
scp -r dist/* user@server:/var/www/html/

# Configure Nginx:
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Environment Variables

None required! This is a frontend-only app with mock backend.

## Performance Checklist

- ✅ Bundle size optimized (< 100 KB gzipped)
- ✅ Code splitting enabled
- ✅ Assets minified
- ✅ CSS purged (Tailwind)
- ✅ Tree-shaking enabled

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS Safari 14+, Chrome Android 90+

## Post-Deployment Testing

1. Open the deployed URL
2. Create a new conversation
3. Send a message and verify streaming
4. Refresh page and verify persistence
5. Test on mobile device
6. Run Lighthouse audit (should score 90+)

## Monitoring (Optional)

Consider adding:
- Google Analytics
- Sentry (error tracking)
- Vercel Analytics
- LogRocket (session replay)

## Troubleshooting

**Issue:** Blank page after deployment
**Fix:** Check that `base` path in `vite.config.ts` matches your deployment path

**Issue:** localStorage not working
**Fix:** Ensure HTTPS is enabled (required for localStorage in production)

**Issue:** Build fails
**Fix:** Run `npm run build` locally first to catch errors

## Next Steps

After deployment:
1. Share the live URL with stakeholders
2. Gather user feedback
3. Monitor performance metrics
4. Plan backend integration (if needed)
