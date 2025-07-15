---
id: markdown-basics
title: Markdown Basics
sidebar_label: Markdown Basics
description: Learn fundamental Markdown syntax and formatting techniques for creating professional documentation
---

# Markdown Basics

Markdown is a lightweight markup language designed for readability and ease of use. It's perfect for creating documentation, SOPs, and project descriptions.

## Text Formatting

### Headers

Use `#` symbols to create headers of different levels:
# Main Title (H1)
## Section Title (H2)
### Subsection Title (H3)
#### Sub-subsection Title (H4)
##### Small Title (H5)
###### Tiny Title (H6)

```markdown
# Main Title (H1)
## Section Title (H2)
### Subsection Title (H3)
#### Sub-subsection Title (H4)
##### Small Title (H5)
###### Tiny Title (H6)
```

### Emphasis

*Italic text* or _italic text_
```markdown
*Italic text* or _italic text_
```
**Bold text** or __bold text__
```markdown
**Bold text** or __bold text__
```
***Bold italic text*** or ___bold italic text___
```markdown
~~Strikethrough text~~
```
~~Strikethrough text~~
```markdown
~~Strikethrough text~~
```

### Code Formatting

`Inline code` 
```markdown
`Inline code` for short code snippets

```javascript
// Code block for longer code
function hello() {
    console.log("Hello, World!");
}
```

### Lists

#### Unordered Lists
- First item
- Second item
  - Nested item
  - Another nested item
- Third item
```markdown
- First item
- Second item
  - Nested item
  - Another nested item
- Third item

* Alternative bullet style
* Another item
```

#### Ordered Lists
1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step

```markdown
1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step
```

#### Task Lists
- [x] Completed task
- [ ] Pending task
- [ ] Another pending task

```markdown
- [x] Completed task
- [ ] Pending task
- [ ] Another pending task
```

## Links and Images

### Links
[Link text](https://example.com)
[Link with title](https://example.com "Title text")
[Relative link](./other-file.md)
[Anchor link](#section-name)

```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Title text")
[Relative link](./other-file.md)
[Anchor link](#section-name)
```

### Images

```markdown
![Alt text](image-url.jpg)
![Alt text](image-url.jpg "Image title")
![Logo](./images/logo.png)
```

## Tables
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

### Aligned Tables
| Left-aligned | Center-aligned | Right-aligned |
|:-------------|:--------------:|--------------:|
| Left         | Center         | Right         |
| Data         | Data           | Data          |

```markdown
| Left-aligned | Center-aligned | Right-aligned |
|:-------------|:--------------:|--------------:|
| Left         | Center         | Right         |
| Data         | Data           | Data          |
```

## Blockquotes
> This is a blockquote
> 
> It can span multiple lines
> 
> > And can be nested

```markdown
> This is a blockquote
> 
> It can span multiple lines
> 
> > And can be nested
```

## Horizontal Rules
---
***
___

```markdown
---
***
___
```

## Escaping Characters

Use backslash `\` to escape special characters:


```markdown
\*This is not italic\*
\[This is not a link\]
\`This is not code\`
```

## Best Practices

### 1. **Consistent Spacing**
- Use blank lines to separate sections
- Maintain consistent indentation
- Don't overuse emphasis

### 2. **Clear Structure**
- Use headers to organize content
- Keep header hierarchy logical
- Use descriptive header names

### 3. **Readable Lists**
- Use consistent bullet styles
- Keep list items concise
- Use proper indentation for nested items

### 4. **Effective Tables**
- Align columns appropriately
- Use descriptive headers
- Keep tables simple and readable

### 5. **Code Formatting**
- Use code blocks for multi-line code
- Use inline code for short snippets
- Specify language for syntax highlighting

## Example: Basic Documentation Structure

```markdown
# Project Title

## Overview
Brief description of the project.

## Features
- Feature 1
- Feature 2
- Feature 3

## Installation

### Prerequisites
- Requirement 1
- Requirement 2

### Steps
1. Clone the repository
2. Install dependencies
3. Configure settings
4. Run the application

## Usage

```bash
npm start
```

## Contributing
Guidelines for contributors.

## License
Project license information.
```

## Common Mistakes to Avoid

### ❌ Bad Examples

```markdown
#No space after header
**Too much bold text makes it hard to read**
- Inconsistent
* bullet
- styles
```

### ✅ Good Examples

```markdown
# Proper Header Spacing

**Use bold sparingly** for emphasis only.

- Consistent
- bullet
- styles
```

## Next Steps

Now that you understand the basics, you can:

1. **Practice** - Create simple documents using these elements
2. **Explore** - Learn about [Visual Elements](./visual-elements) for enhanced formatting
3. **Apply** - Start writing your first [SOP](./sop-writing) or [Project Documentation](./project-docs)

Remember: The key to good Markdown is **clarity** and **consistency**. Start simple and gradually add complexity as needed. 