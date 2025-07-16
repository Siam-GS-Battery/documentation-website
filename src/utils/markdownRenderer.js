// Simple markdown renderer that mimics Docusaurus styling
export const renderMarkdown = (markdown) => {
  if (!markdown) return '';

  let html = markdown;

  // Task Lists - Must be processed before regular lists
  html = html.replace(/^- \[([ x])\] (.*$)/gim , (match, checked, text) => {
    const isChecked = checked === 'x';
    return `<li class="task-list-item">
      <input type="checkbox" class="task-list-item-checkbox" ${isChecked ? 'checked' : ''} disabled>
      <span class="task-list-item-text">${text}</span>
    </li>`;
  });

  // Highlight
  html = html.replace(/===(.*?)===|==(.*?)==/g, '<mark>$1$2</mark>');

  // Code blocks with language
  html = html.replace(/```(\w+)\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre class="language-${lang}"><code class="language-${lang}">${code.trim()}</code></pre>`;
  });

  // Simple code blocks (no language specified)
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

  // Footnotes
  const footnotes = new Map();
  // Find all footnote references and store them
  html = html.replace(/\[\^(\d+)\]:\s*([\s\S]*?)(?=\n\n|\n\[\^|$)/g, (match, ref, content) => {
    footnotes.set(ref, content.trim());
    return '';
  });
  // Replace footnote citations with links
  html = html.replace(/\[\^(\d+)\]/g, (match, ref) => {
    if (footnotes.has(ref)) {
      return `<sup class="footnote-ref"><a href="#footnote-${ref}" id="footnote-ref-${ref}">[${ref}]</a></sup>`;
    }
    return match;
  });
  // Add footnotes section at the end if there are any footnotes
  if (footnotes.size > 0) {
    html += '<div class="footnotes">';
    html += '<hr>';
    html += '<ol>';
    footnotes.forEach((content, ref) => {
      html += `<li id="footnote-${ref}">${content} <a href="#footnote-ref-${ref}" title="Jump back to reference">↩</a></li>`;
    });
    html += '</ol>';
    html += '</div>';
  }

  // Note and Warning blocks
  html = html.replace(/::: (note|warning)\n([\s\S]*?)\n:::/g, (match, type, content) => {
    return `<div class="admonition ${type}">
      <div class="admonition-heading">
        <span class="admonition-icon">${type === 'note' ? '📝' : '⚠️'}</span>
        <h5>${type.charAt(0).toUpperCase() + type.slice(1)}</h5>
      </div>
      <div class="admonition-content">
        ${content.trim()}
      </div>
    </div>`;
  });

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

  // Inline Code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');

  // Lists (excluding task lists that were already processed)
  html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
  html = html.replace(/^- (?!\[[ x]\])(.*$)/gim, '<li>$1</li>');
  
  // Wrap consecutive list items in ul/ol
  html = html.replace(/(<li>.*<\/li>)/gs, (match) => {
    const items = match.match(/<li.*?>.*?<\/li>/g);
    if (items && items.length > 0) {
      // Check if any items are task list items
      const hasTaskItems = items.some(item => item.includes('task-list-item'));
      if (hasTaskItems) {
        return `<ul class="contains-task-list">${items.join('')}</ul>`;
      }
      // Check if it's ordered list (starts with number)
      const isOrdered = markdown.includes(items[0].replace(/<li.*?>(.*?)<\/li>/, '$1').match(/^\d+\./));
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