# 🤝 Contributing to Omeans Team Portfolio

Thank you for your interest in contributing to the Omeans Team Portfolio website! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Style Guidelines](#code-style-guidelines)
- [Feature Development](#feature-development)
- [Bug Reports](#bug-reports)
- [Pull Request Process](#pull-request-process)
- [Code Review](#code-review)

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** - Latest LTS version recommended
- **npm or yarn** - Package manager
- **Git** - Version control
- **Code Editor** - VS Code recommended with extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/omeans-team.github.io.git
   cd omeans-team.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🛠️ Development Setup

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run export       # Export static files for GitHub Pages
npm run deploy       # Build and prepare for deployment
```

### Environment Variables

Create a `.env.local` file for local development:

```env
# Google Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# GitHub API (Optional - for enhanced features)
GITHUB_TOKEN=your_github_token_here
```

## 📝 Code Style Guidelines

### TypeScript

- Use **strict TypeScript** configuration
- Define proper interfaces for all props and data structures
- Avoid `any` type - use proper typing
- Use type guards when necessary

```typescript
// ✅ Good
interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// ❌ Bad
const user: any = { name: "John" };
```

### React Components

- Use **functional components** with hooks
- Follow **component naming convention**: PascalCase
- Use **TypeScript interfaces** for props
- Implement **proper error boundaries**

```typescript
// ✅ Good
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false 
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
};
```

### CSS/Styling

- Use **Tailwind CSS** for styling
- Follow **mobile-first** responsive design
- Use **CSS modules** for component-specific styles
- Maintain **consistent spacing** and **color scheme**

```css
/* ✅ Good - Using Tailwind classes */
<div className="flex flex-col md:flex-row gap-4 p-6 bg-gray-900 text-white">
  <h2 className="text-2xl font-bold mb-4">Title</h2>
  <p className="text-gray-300 leading-relaxed">Content</p>
</div>
```

### File Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/             # Basic UI components
│   ├── layout/         # Layout components
│   └── sections/       # Page sections
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── styles/             # Global styles and CSS modules
```

## 🎯 Feature Development

### Before Starting

1. **Check existing issues** - Avoid duplicate work
2. **Create an issue** - Describe the feature/bug
3. **Discuss the approach** - Get feedback from maintainers
4. **Plan the implementation** - Break down into smaller tasks

### Development Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow coding guidelines
   - Write tests if applicable
   - Update documentation

3. **Test thoroughly**
   - Test on different devices/browsers
   - Check accessibility
   - Verify analytics tracking

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

### Commit Message Format

Use **conventional commits** format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -m "feat(contact): add form validation"
git commit -m "fix(video): resolve mobile playback issue"
git commit -m "docs(readme): update installation instructions"
```

## 🐛 Bug Reports

### Before Reporting

1. **Search existing issues** - Check if already reported
2. **Test on latest version** - Ensure issue still exists
3. **Check browser console** - Look for error messages
4. **Test on different devices** - Verify if device-specific

### Bug Report Template

```markdown
## Bug Description
Brief description of the issue

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., Windows 10, macOS, Linux]
- Browser: [e.g., Chrome, Firefox, Safari]
- Version: [e.g., 22]
- Device: [e.g., Desktop, Mobile, Tablet]

## Additional Information
Screenshots, console logs, etc.
```

## 🔄 Pull Request Process

### Before Submitting

1. **Update documentation** - README, comments, etc.
2. **Add tests** - If applicable
3. **Test thoroughly** - Multiple browsers/devices
4. **Check linting** - Run `npm run lint`
5. **Update version** - If needed

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested on tablet
- [ ] Cross-browser testing
- [ ] Accessibility testing

## Screenshots
Add screenshots if UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
- [ ] Analytics tracking added (if applicable)
```

## 👀 Code Review

### Review Process

1. **Automated checks** - CI/CD pipeline
2. **Code review** - Maintainer review
3. **Testing** - Manual testing
4. **Approval** - Maintainer approval

### Review Criteria

- **Code quality** - Clean, readable, maintainable
- **Performance** - No performance regressions
- **Accessibility** - WCAG compliance
- **Security** - No security vulnerabilities
- **Documentation** - Updated and clear

## 📞 Getting Help

### Communication Channels

- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and discussions
- **Pull Requests** - For code reviews and feedback

### Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🎉 Recognition

Contributors will be recognized in:
- **README.md** - Contributors section
- **GitHub** - Contributors tab
- **Release notes** - For significant contributions

---

**Thank you for contributing to Omeans Team Portfolio!** 🚀

Your contributions help make this project better for everyone.
