# IT & Data Management Documentation Website

A comprehensive documentation website built with [Docusaurus](https://docusaurus.io/) for IT & Data Management teams. This website serves as a centralized knowledge base for IT management, development, and data management processes, tools, and best practices.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Content Management](#content-management)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🎯 Project Overview

This documentation website is designed to provide comprehensive documentation for IT & Data Management teams. It includes:

- **IT Management**: Project management tools, workflows, and best practices
- **IT Development**: Development guidelines, coding standards, and technical documentation
- **Data Management**: Data governance, database management, and analytics processes
- **General Documentation**: Tutorials, guides, and reference materials

The website is built using Docusaurus, a modern static website generator that provides excellent documentation features, search functionality, and responsive design.

## ✨ Features

- 📚 **Multi-section Documentation**: Organized into IT Management, IT Development, and Data Management sections
- 🔍 **Full-text Search**: Built-in search functionality across all documentation
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 📖 **Markdown Support**: Write content using Markdown with extended features
- 🏷️ **Tagging System**: Organize content with tags and categories
- 🔗 **Internal Linking**: Easy navigation between related documents
- 📊 **Version Control**: Track changes and maintain documentation versions

## 🔧 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

1. **Node.js** (version 16.0 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **Yarn Package Manager** (version 1.22 or higher)
   - Install via npm: `npm install -g yarn`
   - Verify installation: `yarn --version`

3. **Git** (for version control)
   - Download from [git-scm.com](https://git-scm.com/)
   - Verify installation: `git --version`

### System Requirements

- **Operating System**: Windows 10/11, macOS, or Linux
- **Memory**: Minimum 4GB RAM (8GB recommended)
- **Storage**: At least 1GB free space
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)

## 🚀 Installation

Follow these steps to set up the project on your local machine:

### Step 1: Clone the Repository

```bash
# Clone the repository to your local machine
git clone <repository-url>
cd my-website
```

### Step 2: Install Dependencies

```bash
# Install all required packages using Yarn
yarn install
```

This command will:
- Download all necessary dependencies
- Create a `node_modules` folder
- Generate a `yarn.lock` file for dependency versioning

### Step 3: Verify Installation

```bash
# Check if everything is installed correctly
yarn start
```

If successful, you should see output similar to:
```
[INFO] Starting the development server...
[SUCCESS] Docusaurus website is running at: http://localhost:3000/
```

## 📁 Project Structure

```
my-website/
├── blog/                          # Blog posts and articles
│   ├── 2019-05-28-first-blog-post.md
│   ├── 2019-05-29-long-blog-post.md
│   └── ...
├── docs/                          # Main documentation
│   ├── Datamanagement/           # Data Management section
│   │   ├── intro.md
│   │   └── projecttest.md
│   ├── Itdevelopment/            # IT Development section
│   │   ├── intro.md
│   │   └── Projecttest.md
│   ├── Itmanagement/             # IT Management section
│   │   ├── intro.md
│   │   └── HowtouseAsana.md
│   ├── techstack/                # Technology stack documentation
│   │   └── asana.md
│   └── tutorial-basics/          # Basic tutorials
├── src/
│   ├── components/               # Custom React components
│   ├── css/                      # Custom stylesheets
│   ├── pages/                    # Custom pages
│   └── theme/                    # Theme customizations
├── static/                       # Static assets (images, files)
├── docusaurus.config.js          # Main configuration file
├── sidebars.js                   # Sidebar navigation configuration
├── package.json                  # Project dependencies and scripts
└── README.md                     # This file
```

## 💻 Local Development

### Starting the Development Server

```bash
yarn start
```

This command will:
- Start a local development server (usually at http://localhost:3000)
- Open your default browser automatically
- Enable hot reloading (changes are reflected immediately)
- Show real-time error messages and warnings

### Development Workflow

1. **Make Changes**: Edit files in your preferred code editor
2. **Preview Changes**: View changes in real-time in your browser
3. **Test Functionality**: Navigate through different sections and features
4. **Check Console**: Monitor the terminal for any errors or warnings

### Stopping the Development Server

Press `Ctrl + C` in the terminal to stop the development server.

## 🏗️ Building for Production

### Creating a Production Build

```bash
yarn build
```

This command will:
- Generate optimized static files in the `build` directory
- Minify CSS and JavaScript files
- Optimize images and assets
- Create a production-ready version of your website

### Testing the Production Build

```bash
yarn serve
```

This command serves the built files locally to test the production version.

## 🚀 Deployment

### Option 1: GitHub Pages (Recommended)

#### Using SSH (if you have SSH keys set up):

```bash
USE_SSH=true yarn deploy
```

#### Using HTTPS (if you don't have SSH keys):

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

### Option 2: Manual Deployment

1. **Build the project**:
   ```bash
   yarn build
   ```

2. **Upload the `build` folder** to your web hosting service

### Option 3: Netlify/Vercel

1. Connect your repository to Netlify or Vercel
2. Set build command: `yarn build`
3. Set publish directory: `build`
4. Deploy automatically on every push

## 📝 Content Management

### Adding New Documentation

1. **Create a new Markdown file** in the appropriate `docs/` subdirectory
2. **Add frontmatter** at the top of the file:
   ```markdown
   ---
   id: your-page-id
   title: Your Page Title
   sidebar_label: Sidebar Label
   ---
   ```

3. **Update sidebar configuration** in `sidebars.js` to include your new page

### Writing Content

- Use **Markdown** syntax for formatting
- Include **images** in the `static/img/` directory
- Use **internal links** to connect related documents
- Add **tags** for better organization

### Blog Posts

- Create new posts in the `blog/` directory
- Use the format: `YYYY-MM-DD-title.md`
- Include frontmatter with title, date, and author information

## 🎨 Customization

### Modifying the Theme

1. **Colors and Styling**: Edit `src/css/custom.css`
2. **Navigation**: Modify `docusaurus.config.js` navbar section
3. **Footer**: Update footer links in `docusaurus.config.js`
4. **Components**: Create custom components in `src/components/`

### Configuration Options

Key configuration files:
- `docusaurus.config.js`: Main site configuration
- `sidebars.js`: Navigation sidebar structure
- `package.json`: Dependencies and scripts

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Issue: "Module not found" errors
**Solution**: Run `yarn install` to ensure all dependencies are installed

#### Issue: Port 3000 already in use
**Solution**: 
```bash
# Kill the process using port 3000
npx kill-port 3000
# Or use a different port
yarn start --port 3001
```

#### Issue: Build fails with sidebar errors
**Solution**: Check `sidebars.js` for correct document IDs that match actual file names

#### Issue: Images not displaying
**Solution**: Ensure images are in the `static/` directory and referenced correctly

#### Issue: Changes not reflecting in browser
**Solution**: 
- Clear browser cache
- Restart the development server
- Check for JavaScript errors in browser console

### Getting Help

1. **Check the terminal** for error messages
2. **Review browser console** for JavaScript errors
3. **Consult Docusaurus documentation**: [docusaurus.io/docs](https://docusaurus.io/docs)
4. **Check GitHub issues** for similar problems

## 🤝 Contributing

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes**
4. **Test your changes**: `yarn start` and `yarn build`
5. **Commit your changes**: `git commit -m "Add your feature description"`
6. **Push to your branch**: `git push origin feature/your-feature-name`
7. **Create a Pull Request**

### Code Style Guidelines

- Follow existing code formatting
- Add comments for complex logic
- Test changes thoroughly
- Update documentation when adding new features

## 📞 Support

For questions, issues, or support:

- **Email**: it-support@company.com
- **Phone**: +66-2-123-4567
- **Documentation**: Check the website's documentation sections
- **Issues**: Create an issue in the repository

## 📄 License

This project is proprietary software owned by Siam GS Battery. All rights reserved.

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Maintained by**: IT & Data Management Team
