// Simple markdown renderer that mimics Docusaurus styling
export const renderMarkdown = (markdown) => {
  if (!markdown) return '';

  let html = markdown;

  // Headers
  html = html.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
  html = html.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold and Italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');

  // Code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');

  // Lists
  html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
  html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
  
  // Wrap consecutive list items in ul/ol
  html = html.replace(/(<li>.*<\/li>)/gs, (match) => {
    const items = match.match(/<li>.*?<\/li>/g);
    if (items && items.length > 0) {
      // Check if it's ordered list (starts with number)
      const isOrdered = markdown.includes(items[0].replace(/<li>(.*?)<\/li>/, '$1').match(/^\d+\./));
      const tag = isOrdered ? 'ol' : 'ul';
      return `<${tag}>${items.join('')}</${tag}>`;
    }
    return match;
  });

  // Blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr>');

  // Tables
  html = html.replace(/\|(.+)\|/g, (match) => {
    const cells = match.split('|').filter(cell => cell.trim());
    if (cells.length > 0) {
      const cellHtml = cells.map(cell => `<td>${cell.trim()}</td>`).join('');
      return `<tr>${cellHtml}</tr>`;
    }
    return match;
  });

  // Wrap table rows in table
  html = html.replace(/(<tr>.*<\/tr>)/gs, (match) => {
    const rows = match.match(/<tr>.*?<\/tr>/g);
    if (rows && rows.length > 0) {
      return `<table>${rows.join('')}</table>`;
    }
    return match;
  });

  // Paragraphs
  html = html.replace(/^(?!<[h|u|o|b|p|t|d|h])(.+)$/gim, '<p>$1</p>');

  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>\s*<\/p>/g, '');

  // Convert line breaks to <br>
  html = html.replace(/\n/g, '<br>');

  return html;
}; 