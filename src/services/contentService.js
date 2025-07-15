// Service สำหรับจัดการข้อมูล content และแปลงเป็น markdown

export class ContentService {
  // ฟังก์ชันสำหรับสร้าง markdown จากข้อมูล
  static generateMarkdown(data) {
    const {
      title,
      category,
      content,
      author = '',
      tags = '',
      description = '',
      customFrontMatter = {}
    } = data;

    const currentDate = new Date().toISOString().split('T')[0];
    const id = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');

    // สร้าง front matter
    const frontMatter = {
      id,
      title,
      sidebar_label: title,
      description: description || title,
      keywords: tags ? tags.split(',').map(tag => tag.trim()) : [],
      parent_document: data.parentDocument || null,
      is_sub_document: data.isSubDocument || false,
      ...customFrontMatter
    };

    // แปลง front matter เป็น YAML
    const frontMatterYaml = this.objectToYaml(frontMatter);

    // สร้าง markdown content
    const markdownContent = `---
${frontMatterYaml}
---

# ${title}

${description ? `## Description\n\n${description}\n\n` : ''}

${author ? `**Author:** ${author}  \n` : ''}**Category:** ${category}  \n**Date:** ${currentDate}${data.parentDocument ? `  \n**Parent Document:** ${data.parentDocument}` : ''}

${content}

${tags ? `## Tags\n\n${tags.split(',').map(tag => `\`${tag.trim()}\``).join(' ')}\n\n` : ''}

${data.parentDocument ? `## Related Documents\n\nThis document is part of the **[${data.parentDocument}](./${data.parentDocument.toLowerCase().replace(/\s+/g, '-')})** project.\n\n` : ''}

---

*Last updated: ${currentDate}*
`;

    return {
      content: markdownContent,
      filename: `${id}.md`,
      metadata: {
        id,
        title,
        category,
        author,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        description,
        date: currentDate,
        parentDocument: data.parentDocument || null,
        isSubDocument: data.isSubDocument || false
      }
    };
  }

  // ฟังก์ชันสำหรับแปลง object เป็น YAML
  static objectToYaml(obj, indent = 0) {
    const spaces = '  '.repeat(indent);
    let yaml = '';

    for (const [key, value] of Object.entries(obj)) {
      if (value === null || value === undefined) continue;

      if (Array.isArray(value)) {
        if (value.length === 0) {
          yaml += `${spaces}${key}: []\n`;
        } else {
          yaml += `${spaces}${key}:\n`;
          value.forEach(item => {
            yaml += `${spaces}  - ${item}\n`;
          });
        }
      } else if (typeof value === 'object') {
        yaml += `${spaces}${key}:\n`;
        yaml += this.objectToYaml(value, indent + 1);
      } else {
        yaml += `${spaces}${key}: ${value}\n`;
      }
    }

    return yaml;
  }

  // ฟังก์ชันสำหรับ validate ข้อมูล
  static validateContent(data) {
    const errors = [];

    if (!data.title || data.title.trim().length === 0) {
      errors.push('Document title is required');
    }

    if (!data.category || data.category.trim().length === 0) {
      errors.push('Category is required');
    }

    if (!data.content || data.content.trim().length === 0) {
      errors.push('Content is required');
    }

    if (data.title && data.title.length > 100) {
      errors.push('Document title must not exceed 100 characters');
    }

    if (data.description && data.description.length > 500) {
      errors.push('Description must not exceed 500 characters');
    }

    if (data.isSubDocument && (!data.parentDocument || data.parentDocument.trim().length === 0)) {
      errors.push('Parent document is required for sub-documents');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // ฟังก์ชันสำหรับสร้างตัวอย่าง markdown
  static getMarkdownExample() {
    return `# Example Title

## Description

This is an example description of the document

## Main Content

### Step 1

1. Follow the first step
2. Follow the second step
3. Follow the third step

### Step 2

\`\`\`javascript
// Example code
function example() {
  console.log('Hello World');
}
\`\`\`

### Step 3

- Item 1
- Item 2
- Item 3

## Summary

This is the summary of the document

---

*Last updated: 2025-01-01*`;
  }

  // ฟังก์ชันสำหรับสร้าง template ตามหมวดหมู่
  static getCategoryTemplate(category, isSubDocument = false) {
    const templates = {
      'IT Management': {
        title: 'IT Management Template',
        content: isSubDocument ? 
        `# [Sub-Document Title]

## Overview

[Describe the specific aspect of the parent document]

## Details

[Provide detailed information about this specific topic]

## Implementation

[Describe how to implement this specific aspect]

## Related Information

[Link to other related sub-documents or sections]` :
        `# [Document Title]

## Overview

[Describe the overview of the system or process]

## Objectives

- [Objective 1]
- [Objective 2]
- [Objective 3]

## Scope

[Describe the scope of the system or process]

## Process

### Step 1: [Step Name]

[Describe step 1]

### Step 2: [Step Name]

[Describe step 2]

## Monitoring and Evaluation

[Describe monitoring and evaluation methods]

## Summary

[Document summary]`
      },
      'IT Development': {
        title: 'IT Development Template',
        content: isSubDocument ? 
        `# [Sub-Document Title]

## Overview

[Describe the specific component or feature]

## Technical Details

[Provide technical specifications and requirements]

## Implementation Steps

[Step-by-step implementation guide]

## Code Examples

\`\`\`javascript
// Example code for this specific feature
function example() {
  // Implementation details
}
\`\`\`

## Testing

[Testing procedures for this specific component]` :
        `# [Project Name]

## Overview

[Describe the project overview]

## Technologies Used

- **Frontend:** [Technology]
- **Backend:** [Technology]
- **Database:** [Technology]
- **Others:** [Technology]

## Installation

### System Requirements

\`\`\`bash
# Example installation command
npm install
\`\`\`

### Configuration

[Describe configuration]

## Usage

[Describe how to use]

## Development

### Project Structure

\`\`\`
project/
├── src/
│   ├── components/
│   ├── pages/
│   └── utils/
├── public/
└── package.json
\`\`\`

## Testing

[Describe testing]

## Deployment

[Describe deployment]`
      },
      'Data Management': {
        title: 'Data Management Template',
        content: isSubDocument ? 
        `# [Sub-Document Title]

## Overview

[Describe the specific data management aspect]

## Data Schema

[Define the specific data structure]

## Operations

[Describe specific operations for this data type]

## Examples

\`\`\`sql
-- Example queries for this specific data type
SELECT * FROM table_name WHERE condition;
\`\`\`

## Best Practices

[Best practices for this specific data management aspect]` :
        `# [Data Management System Name]

## Overview

[Describe the overview of the data management system]

## Data Structure

### Main Tables

| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary key |
| name | VARCHAR | Name |

### Relationships

[Describe relationships between tables]

## Data Management

### Insert Data

\`\`\`sql
INSERT INTO table_name (column1, column2) 
VALUES (value1, value2);
\`\`\`

### Update Data

\`\`\`sql
UPDATE table_name 
SET column1 = value1 
WHERE condition;
\`\`\`

### Delete Data

\`\`\`sql
DELETE FROM table_name 
WHERE condition;
\`\`\`

## Backup

[Describe backup procedures]

## Security

[Describe security measures]

## Monitoring and Reporting

[Describe monitoring and reporting]`
      }
    };

    return templates[category] || {
      title: 'General Template',
      content: isSubDocument ? 
      `# [Sub-Document Title]

## Overview

[Describe the specific aspect]

## Details

[Provide detailed information]

## Summary

[Summary of this specific topic]` :
      `# [Document Title]

## Overview

[Describe overview]

## Content

[Main content]

## Summary

[Document summary]`
    };
  }

  // ฟังก์ชันสำหรับบันทึกข้อมูลลง localStorage (สำหรับ demo)
  static saveToLocalStorage(data) {
    try {
      const savedData = JSON.parse(localStorage.getItem('contentSubmissions') || '[]');
      const newSubmission = {
        ...data,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      savedData.push(newSubmission);
      localStorage.setItem('contentSubmissions', JSON.stringify(savedData));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  }

  // ฟังก์ชันสำหรับดึงข้อมูลจาก localStorage
  static getFromLocalStorage() {
    try {
      return JSON.parse(localStorage.getItem('contentSubmissions') || '[]');
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }
} 