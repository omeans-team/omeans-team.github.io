# Omeans Team Website

This is a Next.js project for the Omeans Team website, deployed on GitHub Pages.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions.

### Manual Deployment

If you need to deploy manually:

1. Build the project:
   ```bash
   npm run build
   ```

2. The built files will be in the `out/` directory

3. Push to GitHub and the GitHub Actions workflow will automatically deploy to GitHub Pages

### GitHub Pages Configuration

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the sidebar
3. Set the source to "GitHub Actions"
4. The site will be available at: `https://[username].github.io/omeans-team.github.io`

## Project Structure

- `src/app/` - Next.js app directory with pages and components
- `public/` - Static assets
- `.github/workflows/` - GitHub Actions deployment configuration

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
