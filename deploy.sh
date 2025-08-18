#!/bin/bash

echo "🚀 Starting deployment to GitHub Pages..."

# Build the project
echo "📦 Building project..."
npm run export

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📁 Files ready for deployment in 'out/' folder:"
    echo "   - index.html (Home page)"
    echo "   - _next/ (Static assets)"
    echo "   - .nojekyll (Disable Jekyll)"
    echo "   - favicon.ico"
    echo "   - All public assets"
    echo ""
    echo "🌐 Next steps:"
    echo "1. Upload all files from 'out/' folder to your GitHub repository"
    echo "2. Go to Settings > Pages in your GitHub repository"
    echo "3. Select 'Deploy from a branch'"
    echo "4. Choose 'main' branch and '/ (root)' folder"
    echo "5. Click Save"
    echo ""
    echo "🎉 Your website will be available at:"
    echo "   https://[username].github.io/[repository-name]/"
    echo ""
    echo "💡 Tip: Use GitHub Actions for automatic deployment!"
    echo "   Check DEPLOYMENT.md for detailed instructions."
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
