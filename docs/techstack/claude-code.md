# Claude Code Installation Guide

Claude Code is Anthropic's official CLI tool that provides an interactive command-line interface for Claude AI, designed specifically for software engineering tasks.

## Prerequisites

Before installing Claude Code, ensure you have:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- An **Anthropic API key** (obtain from [Anthropic Console](https://console.anthropic.com/))
- **Terminal/Command Prompt** access

## Installation Methods

### Method 1: Global Installation via npm (Recommended)

```bash
npm install -g @anthropic-ai/claude-code
```

### Method 2: Global Installation via yarn

```bash
yarn global add @anthropic-ai/claude-code
```

### Method 3: Using npx (No Installation Required)

```bash
npx @anthropic-ai/claude-code
```

## Initial Setup

### 1. API Key Configuration

After installation, you need to configure your Anthropic API key. Choose one of the following methods:

#### Option A: Interactive Setup
```bash
claude-code auth
```
This will prompt you to enter your API key interactively.

#### Option B: Environment Variable
Add your API key to your shell profile:

**For macOS/Linux (bash/zsh):**
```bash
echo 'export ANTHROPIC_API_KEY="your-api-key-here"' >> ~/.bashrc
# or for zsh
echo 'export ANTHROPIC_API_KEY="your-api-key-here"' >> ~/.zshrc
```

**For Windows (PowerShell):**
```powershell
$env:ANTHROPIC_API_KEY="your-api-key-here"
```

#### Option C: Configuration File
Create a configuration file at `~/.config/claude-code/config.json`:
```json
{
  "apiKey": "your-api-key-here"
}
```

### 2. Verify Installation

Test your installation by running:
```bash
claude-code --version
```

You should see the version number of Claude Code displayed.

## Basic Usage

### Starting Claude Code

Navigate to your project directory and run:
```bash
claude-code
```

This will start an interactive session where you can:
- Ask questions about your code
- Request code modifications
- Get help with debugging
- Analyze your codebase

### Command Options

- `claude-code --help` - Display help information
- `claude-code --version` - Show version information
- `claude-code --resume` - Resume a previous session
- `claude-code --model <model>` - Specify which Claude model to use

## IDE Integrations

Claude Code can be integrated with popular IDEs:

### VS Code Integration
1. Install the Claude Code extension from the VS Code marketplace
2. Configure your API key in the extension settings
3. Use the command palette (`Ctrl+Shift+P`) to access Claude Code commands

### Other IDEs
Check the [official documentation](https://docs.anthropic.com/en/docs/claude-code) for integration guides with other IDEs.

## Project Configuration

### CLAUDE.md File
Create a `CLAUDE.md` file in your project root to provide context to Claude Code:

```markdown
# Project Name

## Description
Brief description of your project

## Setup Commands
- `npm install` - Install dependencies
- `npm start` - Start development server
- `npm test` - Run tests

## Architecture
Brief overview of your project structure
```

### Memory Management
Claude Code automatically manages conversation memory, but you can:
- Use `--resume` to continue previous sessions
- Create project-specific context with CLAUDE.md
- Clear memory with the appropriate commands

## Troubleshooting

### Common Issues

#### 1. API Key Not Found
**Error:** `API key not configured`
**Solution:** Ensure your API key is properly set using one of the methods above.

#### 2. Permission Denied
**Error:** `Permission denied` during installation
**Solution:** Use `sudo` for global installation on macOS/Linux:
```bash
sudo npm install -g @anthropic-ai/claude-code
```

#### 3. Network Issues
**Error:** Connection timeouts
**Solution:** Check your internet connection and firewall settings.

#### 4. Node.js Version Issues
**Error:** Unsupported Node.js version
**Solution:** Update Node.js to version 18 or higher:
```bash
# Using nvm
nvm install 18
nvm use 18
```

### Getting Help

- **Documentation:** [https://docs.anthropic.com/en/docs/claude-code](https://docs.anthropic.com/en/docs/claude-code)
- **GitHub Issues:** [https://github.com/anthropics/claude-code/issues](https://github.com/anthropics/claude-code/issues)
- **Community Support:** Join the Anthropic community forums

## Best Practices

1. **Project Context:** Always include a CLAUDE.md file with project details
2. **Clear Instructions:** Be specific about what you want Claude Code to do
3. **Code Review:** Review all code changes before committing
4. **Security:** Never share your API key publicly
5. **Version Control:** Commit your work regularly when using Claude Code

## Advanced Configuration

### Custom Settings
Create a settings file at `~/.config/claude-code/settings.json`:
```json
{
  "defaultModel": "claude-3-sonnet-20240229",
  "maxTokens": 4096,
  "temperature": 0.1
}
```

### Hooks
Configure custom hooks for automated actions:
```json
{
  "hooks": {
    "pre-commit": "npm run lint",
    "post-edit": "npm run format"
  }
}
```

## Conclusion

Claude Code is a powerful tool for enhancing your development workflow. With proper installation and configuration, you can leverage AI assistance directly in your terminal to improve code quality, understand complex codebases, and accelerate development tasks.

For the latest updates and features, regularly check the official documentation and keep Claude Code updated to the latest version.