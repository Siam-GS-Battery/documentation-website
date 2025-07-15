import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = () => {
    const savedDocs = JSON.parse(localStorage.getItem('documents') || '[]');
    setDocuments(savedDocs);
  };

  const deleteDocument = (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      const updatedDocs = documents.filter(doc => doc.id !== id);
      localStorage.setItem('documents', JSON.stringify(updatedDocs));
      setDocuments(updatedDocs);
    }
  };

  const downloadDocument = (doc) => {
    const blob = new Blob([doc.markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredDocuments = documents
    .filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.tags.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

  const categories = ['all', ...new Set(documents.map(doc => doc.category))];

  return (
    <Layout
      title="Documents"
      description="View and manage your created documents"
    >
      <main className="container margin-vert--lg">
        <div className="documents-container">
          <h1>My Documents</h1>
          
          {/* Filters and Search */}
          <div className="filters-section">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-controls">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="category">Sort by Category</option>
              </select>
            </div>
          </div>

          {/* Documents List */}
          <div className="documents-list">
            {filteredDocuments.length === 0 ? (
              <div className="no-documents">
                <p>No documents found. Create your first document!</p>
                <a href="/create-document" className="create-btn">
                  Create Document
                </a>
              </div>
            ) : (
              filteredDocuments.map(doc => (
                <div key={doc.id} className="document-card">
                  <div className="document-header">
                    <h3>{doc.title}</h3>
                    <div className="document-actions">
                      <button
                        onClick={() => downloadDocument(doc)}
                        className="action-btn download-btn"
                        title="Download"
                      >
                        📥
                      </button>
                      <button
                        onClick={() => deleteDocument(doc.id)}
                        className="action-btn delete-btn"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                                     <div className="document-meta">
                     <span className="meta-item">
                       <strong>Category:</strong> {doc.category}
                       {doc.subcategory && ` (${doc.subcategory})`}
                     </span>
                     <span className="meta-item">
                       <strong>Author:</strong> {doc.author || 'Unknown'}
                     </span>
                     <span className="meta-item">
                       <strong>Created:</strong> {new Date(doc.createdAt).toLocaleDateString()}
                     </span>
                     {doc.isSubDocument && doc.parentDocument && (
                       <span className="meta-item">
                         <strong>Parent:</strong> {doc.parentDocument}
                       </span>
                     )}
                   </div>
                  
                  {doc.description && (
                    <p className="document-description">{doc.description}</p>
                  )}
                  
                  {doc.tags && (
                    <div className="document-tags">
                      {doc.tags.split(',').map((tag, index) => (
                        <span key={index} className="tag">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="document-preview">
                    <h4>Preview:</h4>
                    <div 
                      className="preview-content"
                      dangerouslySetInnerHTML={{ 
                        __html: doc.content.substring(0, 200) + (doc.content.length > 200 ? '...' : '') 
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <style jsx>{`
        .documents-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .documents-container h1 {
          color: #2c3e50;
          margin-bottom: 30px;
          text-align: center;
          font-size: 2.5rem;
          font-weight: 600;
        }

        .filters-section {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }

        .search-box {
          flex: 1;
          min-width: 300px;
        }

        .search-input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e9ecef;
          border-radius: 6px;
          font-size: 14px;
          transition: border-color 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
        }

        .filter-controls {
          display: flex;
          gap: 10px;
        }

        .filter-select {
          padding: 10px;
          border: 2px solid #e9ecef;
          border-radius: 6px;
          font-size: 14px;
          background: white;
          cursor: pointer;
        }

        .filter-select:focus {
          outline: none;
          border-color: #007bff;
        }

        .documents-list {
          display: grid;
          gap: 20px;
        }

        .document-card {
          background: white;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.2s ease;
        }

        .document-card:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .document-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }

        .document-header h3 {
          margin: 0;
          color: #2c3e50;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .document-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          padding: 8px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.2s ease;
          background: #f8f9fa;
        }

        .action-btn:hover {
          transform: translateY(-1px);
        }

        .download-btn:hover {
          background: #d4edda;
        }

        .delete-btn:hover {
          background: #f8d7da;
        }

        .document-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 15px;
          font-size: 14px;
          color: #6c757d;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .document-description {
          margin-bottom: 15px;
          color: #495057;
          line-height: 1.6;
        }

        .document-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 15px;
        }

        .tag {
          background: #e9ecef;
          color: #495057;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .document-preview {
          border-top: 1px solid #e9ecef;
          padding-top: 15px;
        }

        .document-preview h4 {
          margin: 0 0 10px 0;
          color: #495057;
          font-size: 1rem;
        }

        .preview-content {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 6px;
          font-size: 14px;
          line-height: 1.5;
          color: #495057;
          max-height: 100px;
          overflow: hidden;
        }

        .no-documents {
          text-align: center;
          padding: 60px 20px;
          background: white;
          border: 2px dashed #e9ecef;
          border-radius: 8px;
        }

        .no-documents p {
          margin-bottom: 20px;
          color: #6c757d;
          font-size: 1.1rem;
        }

        .create-btn {
          display: inline-block;
          padding: 12px 24px;
          background: #007bff;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .create-btn:hover {
          background: #0056b3;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
        }

        @media (max-width: 768px) {
          .filters-section {
            flex-direction: column;
            align-items: stretch;
          }

          .search-box {
            min-width: auto;
          }

          .filter-controls {
            flex-direction: column;
          }

          .document-header {
            flex-direction: column;
            gap: 10px;
          }

          .document-meta {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </Layout>
  );
} 