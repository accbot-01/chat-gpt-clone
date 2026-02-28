# Deployment Guide

## Vercel Deployment (Recommended)

### Automatic Deployment

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub account
   - Select `chat-gpt-clone` repository
   - Select `development` branch

2. **Configure Build Settings**
   - Framework Preset: **Vite**
   - Root Directory: **code**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Deploy**
   - Click "Deploy"
   - Wait ~2 minutes for build
   - Your app will be live at `your-project.vercel.app`

### Manual Deployment (CLI)

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to code directory
cd code

# Deploy
vercel --prod
```

## Netlify Deployment

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select repository
   - Select `development` branch

2. **Configure Build Settings**
   - Base directory: **code**
   - Build command: `npm run build`
   - Publish directory: `code/dist`

3. **Deploy**
   - Click "Deploy site"
   - Live in ~2 minutes

## GitHub Pages

```bash
# Install gh-pages
cd code
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Update vite.config.ts
export default defineConfig({
  base: '/chat-gpt-clone/',
  // ...
})

# Deploy
npm run deploy
```

Access at: `https://yourusername.github.io/chat-gpt-clone/`

## Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS:
   - Type: `A` / Value: `76.76.21.21`
   - Type: `CNAME` / Value: `cname.vercel-dns.com`

### Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS with provided nameservers

## Environment Variables

This project uses no environment variables (all mock data). For production with real backend:

```env
VITE_API_URL=https://api.openai.com/v1
VITE_API_KEY=sk-...
```

Add in Vercel/Netlify dashboard under Environment Variables.

## Post-Deployment Checklist

- [ ] Test on mobile devices
- [ ] Verify dark mode toggle
- [ ] Test conversation persistence (refresh page)
- [ ] Check code syntax highlighting
- [ ] Verify emoji picker works
- [ ] Test responsive sidebar
- [ ] Run Lighthouse audit (aim for 90+)

## Troubleshooting

**Build fails with "memory exceeded":**
- Increase Node.js memory: `NODE_OPTIONS=--max_old_space_size=4096 npm run build`

**404 on page refresh:**
- Ensure rewrites configured (see vercel.json)
- For Netlify, add `_redirects` file: `/* /index.html 200`

**Slow initial load:**
- Check bundle size with `npm run build -- --mode=production`
- Consider code splitting: dynamic imports for emoji picker

**localStorage not persisting:**
- Check browser privacy settings
- Ensure users aren't in incognito mode

## Performance Optimization

```bash
# Analyze bundle
npm run build
npx vite-bundle-analyzer

# Optimize images (if added)
npm install --save-dev vite-plugin-imagemin

# Enable compression (Vite does this automatically)
```

## Monitoring

**Vercel Analytics:**
- Enable in Project Settings → Analytics
- Get real user metrics

**Lighthouse CI:**
```bash
npm install -g @lhci/cli
lhci autorun --collect.url=https://your-app.vercel.app
```

## Rollback

**Vercel:**
- Go to Deployments → Select previous deployment → Promote to Production

**Netlify:**
- Go to Deploys → Select previous deploy → Publish deploy

**Git:**
```bash
git revert HEAD
git push origin development
```
