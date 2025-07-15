import React, { useState, useEffect } from 'react';
import { renderMarkdown } from '../utils/markdownRenderer';
import './ContentSubmissionForm.css';

const ContentSubmissionForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Documentation',
    subcategory: '',
    description: '',
    author: '',
    tags: '',
    content: '',
    isSubDocument: false,
    parentDocument: ''
  });

  const [preview, setPreview] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [existingDocuments, setExistingDocuments] = useState([]);
  const [selectedText, setSelectedText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Load existing documents for parent document selection
    const savedDocs = JSON.parse(localStorage.getItem('documents') || '[]');
    setExistingDocuments(savedDocs);
  }, []);

  useEffect(() => {
    // Update preview in real-time
    generateMarkdown();
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleContentChange = (newContent) => {
    setFormData(prev => ({
      ...prev,
      content: newContent
    }));
  };

  const generateMarkdown = () => {
    const { title, category, subcategory, description, author, tags, content, isSubDocument, parentDocument } = formData;
    
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    const frontMatter = {
      title,
      description,
      author,
      tags: tagsArray,
      category,
      ...(subcategory && { subcategory }),
      date: new Date().toISOString().split('T')[0],
      ...(isSubDocument && parentDocument && { parent: parentDocument })
    };

    const frontMatterString = `---\n${Object.entries(frontMatter)
      .filter(([_, value]) => value !== '' && value !== null && value !== undefined)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}:\n${value.map(item => `  - ${item}`).join('\n')}`;
        }
        return `${key}: ${value}`;
      })
      .join('\n')}\n---\n\n`;

    const markdown = frontMatterString + content;
    setPreview(markdown);
    return markdown;
  };

  const handleSave = () => {
    const markdown = generateMarkdown();
    const documents = JSON.parse(localStorage.getItem('documents') || '[]');
    const newDocument = {
      id: Date.now(),
      ...formData,
      markdown,
      createdAt: new Date().toISOString()
    };
    
    documents.push(newDocument);
    localStorage.setItem('documents', JSON.stringify(documents));
    alert('Document saved successfully!');
    
    // Reset form
    setFormData({
      title: '',
      category: 'Documentation',
      subcategory: '',
      description: '',
      author: '',
      tags: '',
      content: '',
      isSubDocument: false,
      parentDocument: ''
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(preview);
    alert('Markdown copied to clipboard!');
  };

  const downloadMarkdown = () => {
    const blob = new Blob([preview], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.title}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Rich text editor functions
  const insertText = (text) => {
    const textarea = document.getElementById('content-editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newContent = formData.content.substring(0, start) + text + formData.content.substring(end);
    handleContentChange(newContent);
    
    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  const insertHeading = (level) => {
    const headingText = selectedText || 'Heading';
    const heading = '#'.repeat(level) + ' ' + headingText;
    insertText(heading);
  };

  const insertImage = () => {
    if (imageUrl) {
      const imageText = `![${selectedText || 'Image'}](${imageUrl})`;
      insertText(imageText);
      setImageUrl('');
    }
  };

  const insertLink = () => {
    const linkText = selectedText || 'Link Text';
    const url = prompt('Enter URL:');
    if (url) {
      const link = `[${linkText}](${url})`;
      insertText(link);
    }
  };

  const insertList = (type) => {
    const listItem = selectedText || 'List item';
    const list = type === 'ordered' ? `1. ${listItem}` : `- ${listItem}`;
    insertText(list);
  };

  const insertCode = () => {
    const codeText = selectedText || 'code';
    const code = `\`${codeText}\``;
    insertText(code);
  };

  const insertCodeBlock = () => {
    const codeText = selectedText || '// Your code here';
    const codeBlock = `\`\`\`\n${codeText}\n\`\`\``;
    insertText(codeBlock);
  };

  const insertQuote = () => {
    const quoteText = selectedText || 'Quote text';
    const quote = `> ${quoteText}`;
    insertText(quote);
  };

  const insertTable = () => {
    const table = `
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
`;
    insertText(table);
  };

  const handleTextSelection = () => {
    const textarea = document.getElementById('content-editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    setSelectedText(formData.content.substring(start, end));
  };

  return (
    <div className="content-submission-container">
      <h2>Create New Document</h2>
      
      <div className="form-section">
        <h3>Document Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter document title"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="Documentation">Documentation</option>
              <option value="IT Management">IT Management</option>
              <option value="IT Development">IT Development</option>
              <option value="Data Management">Data Management</option>
            </select>
          </div>
          
          {formData.category === 'Documentation' && (
            <div className="form-group">
              <label htmlFor="subcategory">Subcategory</label>
              <select
                id="subcategory"
                name="subcategory"
                value={formData.subcategory || ''}
                onChange={handleInputChange}
              >
                <option value="">Select subcategory</option>
                <option value="tech-stack">Tech Stack</option>
                <option value="api-docs">API Documentation</option>
                <option value="user-guide">User Guide</option>
                <option value="installation">Installation Guide</option>
                <option value="troubleshooting">Troubleshooting</option>
                <option value="sop">SOP</option>
                <option value="project-document">Project Document</option>
                
                
                
              </select>
            </div>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Brief description of the document"
              rows="3"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Document author"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="tag1, tag2, tag3"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isSubDocument"
                checked={formData.isSubDocument}
                onChange={handleInputChange}
              />
              This is a sub-document
            </label>
          </div>
          
          {formData.isSubDocument && (
            <div className="form-group">
              <label htmlFor="parentDocument">Parent Document</label>
              <select
                id="parentDocument"
                name="parentDocument"
                value={formData.parentDocument}
                onChange={handleInputChange}
              >
                <option value="">Select parent document</option>
                {existingDocuments.map(doc => (
                  <option key={doc.id} value={doc.title}>
                    {doc.title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="editor-section">
        <h3>Content Editor</h3>
        
        {/* Rich Text Toolbar */}
        <div className="editor-toolbar">
          <div className="toolbar-group">
            <button type="button" onClick={() => insertHeading(1)} title="Heading 1">H1</button>
            <button type="button" onClick={() => insertHeading(2)} title="Heading 2">H2</button>
            <button type="button" onClick={() => insertHeading(3)} title="Heading 3">H3</button>
            <button type="button" onClick={() => insertHeading(4)} title="Heading 4">H4</button>
            <button type="button" onClick={() => insertHeading(5)} title="Heading 5">H5</button>
            <button type="button" onClick={() => insertHeading(6)} title="Heading 6">H6</button>
          </div>
          
          <div className="toolbar-group">
            <button type="button" onClick={() => insertText('**' + (selectedText || 'bold') + '**')} title="Bold">B</button>
            <button type="button" onClick={() => insertText('*' + (selectedText || 'italic') + '*')} title="Italic">I</button>
            <button type="button" onClick={() => insertText('~~' + (selectedText || 'strikethrough') + '~~')} title="Strikethrough">S</button>
          </div>
          
          <div className="toolbar-group">
            <button type="button" onClick={() => insertList('unordered')} title="Unordered List">•</button>
            <button type="button" onClick={() => insertList('ordered')} title="Ordered List">1.</button>
            <button type="button" onClick={insertQuote} title="Quote">"</button>
          </div>
          
          <div className="toolbar-group">
            <button type="button" onClick={insertLink} title="Insert Link">🔗</button>
            <button type="button" onClick={insertCode} title="Inline Code">`</button>
            <button type="button" onClick={insertCodeBlock} title="Code Block">```</button>
          </div>
          
          <div className="toolbar-group">
            <button type="button" onClick={insertTable} title="Insert Table">📊</button>
            <button type="button" onClick={() => insertText('---')} title="Horizontal Rule">—</button>
          </div>
          
          <div className="toolbar-group image-insert">
            <input
              type="text"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && insertImage()}
            />
            <button type="button" onClick={insertImage} title="Insert Image">🖼️</button>
          </div>
        </div>

        {/* Editor and Preview Toggle */}
        <div className="editor-toggle">
          <button
            type="button"
            className={!showPreview ? 'active' : ''}
            onClick={() => setShowPreview(false)}
          >
            Editor
          </button>
          <button
            type="button"
            className={showPreview ? 'active' : ''}
            onClick={() => setShowPreview(true)}
          >
            Preview
          </button>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {!showPreview ? (
            <textarea
              id="content-editor"
              name="content"
              value={formData.content}
              onChange={(e) => handleContentChange(e.target.value)}
              onSelect={handleTextSelection}
              placeholder="Start writing your document here... Use the toolbar above to format your content."
              rows="20"
            />
          ) : (
            <div className="preview-area">
              <div className="markdown-preview" dangerouslySetInnerHTML={{ __html: renderMarkdown(formData.content) }} />
            </div>
          )}
        </div>
      </div>

      <div className="actions-section">
        <div className="action-buttons">
          <button type="button" onClick={handleSave} className="btn-primary">
            Save Document
          </button>
          <button type="button" onClick={copyToClipboard} className="btn-secondary">
            Copy Markdown
          </button>
          <button type="button" onClick={downloadMarkdown} className="btn-secondary">
            Download .md
          </button>
        </div>
      </div>

             {/* Real-time Preview Panel */}
       {/* <div className="preview-panel">
         <h3>Real-time Preview</h3>
         <div className="preview-content">
           <div className="markdown-preview" dangerouslySetInnerHTML={{ __html: renderMarkdown(formData.content) }} />
         </div>
       </div> */}
    </div>
  );
};

export default ContentSubmissionForm; 