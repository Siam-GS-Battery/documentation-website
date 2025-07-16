import React, { useState, useEffect, useRef } from 'react';
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
  const [uploadedImages, setUploadedImages] = useState([]);
  const fileInputRef = useRef(null);

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

  // Handle file upload
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    processImageFiles(files);
  };

  // Process image files
  const processImageFiles = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = {
          id: Date.now() + Math.random(),
          name: file.name,
          data: e.target.result,
          type: file.type,
          size: file.size
        };
        setUploadedImages(prev => [...prev, imageData]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle drag and drop
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    processImageFiles(files);
  };

  // Insert uploaded image
  const insertUploadedImage = (imageId) => {
    const image = uploadedImages.find(img => img.id === imageId);
    if (image) {
      const altText = selectedText || image.name.split('.')[0]; // Use filename without extension as alt text
      // Use short reference format
      const imageText = `![${altText}](${image.name})`;
      insertText(imageText);
    }
  };

  // Insert image at cursor position
  const insertImageAtCursor = (imageData, imageName) => {
    const textarea = document.getElementById('content-editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const altText = imageName.split('.')[0];
    // Use short reference format
    const imageText = `![${altText}](${imageName})`;
    
    const newContent = formData.content.substring(0, start) + imageText + formData.content.substring(end);
    handleContentChange(newContent);
    
    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + imageText.length, start + imageText.length);
    }, 0);
  };

  // Remove uploaded image
  const removeUploadedImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
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

    // Process content for preview
    let processedContent = content
      // Convert task list syntax
      .replace(/- \[ \]/g, '☐')
      .replace(/- \[x\]/g, '☑')
      // Convert highlight syntax
      .replace(/===(.*?)===|==(.*?)==/g, '<mark>$1$2</mark>')
      // Convert code blocks with language
      .replace(/```(\w+)\n([\s\S]*?)```/g, (match, lang, code) => (
        `<pre class="language-${lang}"><code class="language-${lang}">${code}</code></pre>`
      ))
      // Convert inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>');

    const markdown = frontMatterString + processedContent;
    
    // For preview, replace short image references with actual data URLs
    let previewContent = markdown;
    uploadedImages.forEach(image => {
      const shortRef = `./images/${image.name}`;
      previewContent = previewContent.replace(new RegExp(`\\(${shortRef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g'), `(${image.data})`);
    });
    
    setPreview(previewContent);
    return markdown;
  };

  const handleSave = () => {
    const markdown = generateMarkdown();
    const documents = JSON.parse(localStorage.getItem('documents') || '[]');
    const newDocument = {
      id: Date.now(),
      ...formData,
      markdown,
      uploadedImages, // Save uploaded images with document
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
    setUploadedImages([]);
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

  // Download as ZIP with images
  const downloadAsZip = async () => {
    if (uploadedImages.length === 0) {
      downloadMarkdown();
      return;
    }

    try {
      // Import JSZip dynamically
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();

      // Add markdown file
      zip.file(`${formData.title}.md`, preview);

      // Add images in root level (same as markdown file)
      uploadedImages.forEach(image => {
        // Convert base64 to blob
        const base64Data = image.data.split(',')[1];
        zip.file(image.name, base64Data, { base64: true });
      });

      // Generate and download ZIP
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${formData.title}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error creating ZIP:', error);
      alert('Error creating ZIP file. Downloading markdown only.');
      downloadMarkdown();
    }
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
    let list;
    switch (type) {
      case 'ordered':
        list = `1. ${listItem}`;
        break;
      case 'task':
        list = `- [ ] ${listItem}`;
        break;
      default:
        list = `- ${listItem}`;
    }
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
              <option value="training">Training Material</option>
              <option value="reference">Reference Guide</option>
            </select>
          </div>
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

      {/* Image Upload Section */}
      <div className="form-section">
        <h3>Image Management</h3>
        <div 
          className={`image-upload-section ${isDragOver ? 'drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="upload-controls">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              multiple
              style={{ display: 'none' }}
            />
            <div className="upload-area">
              <div className="upload-icon">📁</div>
              <div className="upload-text">
                <h4>Upload Images</h4>
                <p>Drag & drop images here, or click to browse</p>
                <p className="upload-info">Supported: JPG, PNG, GIF, WebP</p>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="upload-btn"
              >
                Choose Files
              </button>
            </div>
          </div>
          
          {uploadedImages.length > 0 && (
            <div className="uploaded-images">
              <h4>Uploaded Images ({uploadedImages.length})</h4>
              <div className="image-grid">
                {uploadedImages.map(image => (
                  <div key={image.id} className="image-item">
                    <img src={image.data} alt={image.name} />
                    <div className="image-info">
                      <span className="image-name">{image.name}</span>
                      <span className="image-size">{(image.size / 1024).toFixed(1)} KB</span>
                    </div>
                    <div className="image-actions">
                      <button
                        type="button"
                        onClick={() => insertUploadedImage(image.id)}
                        className="insert-btn"
                        title="Insert into document"
                      >
                        📝 Insert
                      </button>
                      <button
                        type="button"
                        onClick={() => removeUploadedImage(image.id)}
                        className="remove-btn"
                        title="Remove image"
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="editor-section">
        <h3>Content Editor</h3>
        
        {/* Rich Text Toolbar */}
        <div className="editor-toolbar">
          <div className="toolbar-group headings">
            <button type="button" onClick={() => insertHeading(1)} title="Heading 1">H1</button>
            <button type="button" onClick={() => insertHeading(2)} title="Heading 2">H2</button>
            <button type="button" onClick={() => insertHeading(3)} title="Heading 3">H3</button>
            <button type="button" onClick={() => insertHeading(4)} title="Heading 4">H4</button>
            <button type="button" onClick={() => insertHeading(5)} title="Heading 5">H5</button>
            <button type="button" onClick={() => insertHeading(6)} title="Heading 6">H6</button>
          </div>
          
          <div className="toolbar-group text-formatting">
            <button type="button" onClick={() => insertText('**' + (selectedText || 'bold') + '**')} title="Bold (Ctrl+B)">
              <span role="img" aria-label="bold">𝐁</span>
            </button>
            <button type="button" onClick={() => insertText('*' + (selectedText || 'italic') + '*')} title="Italic (Ctrl+I)">
              <span role="img" aria-label="italic">𝐼</span>
            </button>
            <button type="button" onClick={() => insertText('~~' + (selectedText || 'strikethrough') + '~~')} title="Strikethrough">
              <span role="img" aria-label="strikethrough">S̶</span>
            </button>
            <button type="button" onClick={() => insertText('`' + (selectedText || 'code') + '`')} title="Inline Code">
              <span role="img" aria-label="code">{'<>'}</span>
            </button>
            <button type="button" onClick={() => insertText('===' + (selectedText || 'highlight') + '===')} title="Highlight">
              <span role="img" aria-label="highlight">🖍️</span>
            </button>
          </div>
          
          <div className="toolbar-group lists">
            <button type="button" onClick={() => insertList('unordered')} title="Unordered List">
              <span role="img" aria-label="bullet list">•</span>
            </button>
            <button type="button" onClick={() => insertList('ordered')} title="Ordered List">
              <span role="img" aria-label="numbered list">1.</span>
            </button>
            <button type="button" onClick={() => insertList('task')} title="Task List">
              <span role="img" aria-label="task list">☐</span>
            </button>
            <button type="button" onClick={() => insertText('> ' + (selectedText || 'blockquote'))} title="Blockquote">
              <span role="img" aria-label="quote">"</span>
            </button>
          </div>
          
          <div className="toolbar-group code-blocks">
            <button type="button" onClick={insertCodeBlock} title="Code Block">
              <span role="img" aria-label="code block">{ '```' }</span>
            </button>
            <select 
              onChange={(e) => {
                if (e.target.value) {
                  insertText('\n```' + e.target.value + '\n' + (selectedText || '// code here') + '\n```\n');
                  e.target.value = '';
                }
              }}
              title="Insert Code Block with Language"
            >
              <option value="">Select Language</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="csharp">C#</option>
              <option value="php">PHP</option>
              <option value="ruby">Ruby</option>
              <option value="swift">Swift</option>
              <option value="sql">SQL</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="bash">Bash</option>
              <option value="json">JSON</option>
              <option value="yaml">YAML</option>
              <option value="markdown">Markdown</option>
            </select>
          </div>
          
          <div className="toolbar-group tables">
            <button type="button" onClick={insertTable} title="Insert Table">
              <span role="img" aria-label="table">📊</span>
            </button>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  const [rows, cols] = e.target.value.split('x');
                  const header = '|' + ' Header |'.repeat(parseInt(cols));
                  const separator = '|' + ' --- |'.repeat(parseInt(cols));
                  const row = '|' + ' Cell |'.repeat(parseInt(cols));
                  const table = '\n' + header + '\n' + separator + '\n' + (row + '\n').repeat(parseInt(rows));
                  insertText(table);
                  e.target.value = '';
                }
              }}
              title="Insert Table with Size"
            >
              <option value="">Table Size</option>
              <option value="2x2">2x2</option>
              <option value="2x3">2x3</option>
              <option value="3x2">3x2</option>
              <option value="3x3">3x3</option>
              <option value="3x4">3x4</option>
              <option value="4x3">4x3</option>
              <option value="4x4">4x4</option>
            </select>
          </div>
          
          <div className="toolbar-group links">
            <button type="button" onClick={insertLink} title="Insert Link (Ctrl+K)">
              <span role="img" aria-label="link">🔗</span>
            </button>
            <button type="button" onClick={() => {
              const footnote = '[^' + (document.querySelectorAll('[id^="footnote-"]').length + 1) + ']';
              insertText(footnote);
              insertText('\n\n' + footnote + ': ' + (selectedText || 'Enter footnote text here'));
            }} title="Insert Footnote">
              <span role="img" aria-label="footnote">†</span>
            </button>
          </div>
          
          <div className="toolbar-group media">
            <div className="image-insert">
              <input
                type="text"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && insertImage()}
              />
              <button type="button" onClick={insertImage} title="Insert Image from URL">
                <span role="img" aria-label="image">🌐</span>
              </button>
            </div>
            
            {uploadedImages.length > 0 && (
              <select 
                onChange={(e) => {
                  if (e.target.value) {
                    const image = uploadedImages.find(img => img.id == e.target.value);
                    if (image) {
                      insertImageAtCursor(image.data, image.name);
                    }
                    e.target.value = '';
                  }
                }}
                title="Insert uploaded image"
              >
                <option value="">📸 Insert Image</option>
                {uploadedImages.map(image => (
                  <option key={image.id} value={image.id}>
                    {image.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          
          <div className="toolbar-group misc">
            <button type="button" onClick={() => insertText('\n---\n')} title="Horizontal Rule">
              <span role="img" aria-label="horizontal rule">—</span>
            </button>
            <button type="button" onClick={() => {
              const date = new Date().toISOString().split('T')[0];
              insertText(date);
            }} title="Insert Date">
              <span role="img" aria-label="date">📅</span>
            </button>
            <button type="button" onClick={() => insertText('::: note\n' + (selectedText || 'Note content') + '\n:::')} title="Add Note">
              <span role="img" aria-label="note">📝</span>
            </button>
            <button type="button" onClick={() => insertText('::: warning\n' + (selectedText || 'Warning content') + '\n:::')} title="Add Warning">
              <span role="img" aria-label="warning">⚠️</span>
            </button>
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

      {/* Action Buttons */}
      <div className="actions-section">
        <div className="action-buttons">
          <button type="button" onClick={copyToClipboard} className="btn-secondary">
            📋 Copy Markdown
          </button>
          <button type="button" onClick={downloadMarkdown} className="btn-secondary">
            📄 Download MD
          </button>
          <button type="button" onClick={downloadAsZip} className="btn-primary">
            📦 Download ZIP
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentSubmissionForm; 