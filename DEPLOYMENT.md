# Deployment Guide - Omeans Engine Website

This guide will help you deploy the Omeans Engine website to GitHub Pages. The website features an Unreal Engine-inspired design with dark theme and modern gaming aesthetics.

## 🚀 Quick Deployment

### Prerequisites

1. **GitHub Account**: Make sure you have a GitHub account
2. **Repository**: Create a repository named `omeans-team.github.io`
3. **Git**: Install Git on your local machine

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click "New repository"
3. Name it `omeans-team.github.io`
4. Make it public
5. Don't initialize with README (we already have one)

### Step 2: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Omeans Engine website"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/omeans-team.github.io.git

# Push to main branch
git push -u origin main
```

### Step 3: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "GitHub Actions"
5. This will use the workflow we already configured

### Step 4: Enable GitHub Actions

1. Go to "Actions" tab in your repository
2. You should see the workflow running automatically
3. Wait for the build to complete
4. Your site will be available at: `https://YOUR_USERNAME.github.io/omeans-team.github.io`

## 🔧 Manual Deployment

If you prefer manual deployment:

### Build Locally

```bash
# Install dependencies
npm install

# Build the project
npm run build

# The static files will be in the `out` directory
```

### Upload to GitHub Pages

1. Go to your repository settings
2. Scroll to "Pages" section
3. Under "Source", select "Deploy from a branch"
4. Select "gh-pages" branch
5. Upload the contents of the `out` directory to the gh-pages branch

## 📝 Customization

### Updating Content

Edit `src/app/page.tsx` to update:
- Hero section messaging and branding
- Team member information
- Services offered
- Contact details
- Company description

### Styling

The project uses Tailwind CSS v4. You can customize:
- Colors in `tailwind.config.js`
- Global styles in `src/app/globals.css`
- Animations and effects

### Design Elements

The website features:
- **Dark Theme**: Professional black and dark gray colors
- **Gradient Effects**: Blue to purple to pink gradients
- **Glass Morphism**: Translucent backgrounds with blur
- **Particle Animations**: Floating particles in hero section
- **Hover Effects**: Scale and glow animations

### Add Custom Domain

1. Buy a domain (e.g., from Namecheap, GoDaddy)
2. Add CNAME record pointing to `YOUR_USERNAME.github.io`
3. Create a file named `CNAME` in the `public` folder:
   ```
   yourdomain.com
   ```
4. Commit and push the changes

## 🔍 Troubleshooting

### Build Errors

If you encounter build errors:

1. **TypeScript Errors**: Run `npm run lint` to check for issues
2. **Dependency Issues**: Delete `node_modules` and run `npm install`
3. **Cache Issues**: Clear Next.js cache: `rm -rf .next`
4. **Tailwind Issues**: Ensure Tailwind CSS v4 is properly configured

### GitHub Actions Failures

1. Check the Actions tab for error details
2. Common issues:
   - Node.js version mismatch
   - Missing dependencies
   - Build configuration errors
   - Tailwind CSS v4 compatibility

### Site Not Loading

1. Check if the deployment completed successfully
2. Verify the URL is correct
3. Check browser console for errors
4. Ensure all assets are loading properly

## 📊 Performance Optimization

### Lighthouse Score

The site is optimized for:
- **Performance**: 95+ score
- **Accessibility**: WCAG 2.1 compliant
- **Best Practices**: Modern web standards
- **SEO**: Search engine optimized

### Further Optimization

1. **Images**: Use WebP format and optimize sizes
2. **Fonts**: Use system fonts or optimize web fonts
3. **Code Splitting**: Next.js handles this automatically
4. **Caching**: GitHub Pages provides good caching
5. **Animations**: Optimized for 60fps performance

## 🔄 Continuous Deployment

The GitHub Actions workflow automatically:
1. Builds the project on every push to main
2. Runs tests and linting
3. Deploys to GitHub Pages
4. Provides deployment status

## 🎨 Design Features

### Visual Elements
- **Dark Theme**: Professional gaming aesthetic
- **Gradient Text**: Eye-catching blue to purple to pink gradients
- **Glass Effects**: Modern translucent backgrounds
- **Particle System**: Animated floating elements
- **Smooth Animations**: 300ms transitions throughout

### Interactive Elements
- **Hover Effects**: Scale and glow animations
- **Button Animations**: Gradient backgrounds with shadows
- **Scroll Effects**: Smooth scrolling behavior
- **Custom Scrollbar**: Styled to match the theme

## 📞 Support

If you encounter issues:

1. Check the [GitHub Pages documentation](https://pages.github.com/)
2. Review [Next.js deployment guide](https://nextjs.org/docs/deployment)
3. Check the repository issues for similar problems
4. Verify Tailwind CSS v4 compatibility

## 🎉 Success!

Once deployed, your site will be available at:
`https://YOUR_USERNAME.github.io/omeans-team.github.io`

The site includes:
- ✅ Unreal Engine-inspired design
- ✅ Dark theme with gaming aesthetics
- ✅ Responsive design
- ✅ Smooth animations and effects
- ✅ SEO optimization
- ✅ Fast loading times
- ✅ Modern UI/UX
- ✅ Accessibility features

---

**Made with ❤️ by Omeans Team** 