# Deploy to Netlify

## Via Netlify Dashboard (Recommended)

1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub → Select `accbot-01/chat-gpt-clone`
4. Branch: `development`
5. Build settings:
   - Base directory: `code`
   - Build command: `npm run build`
   - Publish directory: `code/dist`
6. Click "Deploy site"

## Via Netlify CLI

```bash
npm install -g netlify-cli
cd code
npm install
npm run build
netlify deploy --prod
```

## Post-Deployment

- Custom domain: Settings → Domain management
- Environment variables: Site settings → Environment variables
- Analytics: Enable Netlify Analytics (optional)

## Expected Deployment URL

After deployment, your site will be available at:
- `https://[site-name].netlify.app`
- You can customize the site name in Netlify dashboard

## Troubleshooting

- If build fails, check Node version is 18+
- Ensure all dependencies are in package.json
- Check build logs in Netlify dashboard for errors
- Verify dist folder is created during build

## Performance

- Expected bundle size: ~140KB (optimized with Vite)
- Build time: ~1-2 minutes
- Deploy time: ~30 seconds
