# Omeans Team Website

Welcome to the Omeans Team website repository. This is a private repository containing the source code for our team's website.

## 🚀 Live Site

Our live site is deployed at: https://omeans-team.github.io/omeans-team-live/

## 📁 Repository Structure

- **Main Repository** (Private): `omeans-team/omeans-team.github.io` - Source code (main branch only)
- **Live Repository** (Public): `omeans-team/omeans-team-live` - Static files for GitHub Pages (main branch)

## 🔄 Deployment

This repository uses GitHub Actions to automatically deploy static files to the live repository whenever changes are pushed to the main branch.

**Workflow:**
1. Push to `main` branch in private repository
2. GitHub Actions builds static files
3. Auto-deploy to public live repository
4. GitHub Pages serves the live site

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run setup-live-separate-fixed` - Setup live repository (one-time)

## 🔧 Auto Issue Management

This repository includes automated issue creation and management based on Git commits and pushes.

---

*Last updated: $(date)*
