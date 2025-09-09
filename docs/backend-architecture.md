# Backend Architecture Documentation

## Overview
This document outlines the backend architecture and implementation plan for dynamic content management in the documentation website, eliminating the need for hardcoding projects and documents.

## System Architecture

### 1. Technology Stack

#### Backend Options

**Option A: Node.js + Express + PostgreSQL (Recommended)**
- **Backend Framework**: Express.js / Fastify
- **Database**: PostgreSQL / MySQL
- **ORM**: Prisma / TypeORM
- **Authentication**: JWT + bcrypt
- **File Storage**: AWS S3 / Local Storage
- **API Type**: RESTful API / GraphQL

**Option B: Python + FastAPI + PostgreSQL**
- **Backend Framework**: FastAPI
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Authentication**: JWT + passlib
- **File Storage**: AWS S3 / MinIO
- **API Type**: RESTful API

### 2. Database Schema

```sql
-- Users table for admin authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'editor',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    division VARCHAR(100),
    department VARCHAR(100),
    category JSONB DEFAULT '[]',
    status VARCHAR(50) DEFAULT 'active',
    order_index INTEGER DEFAULT 0,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project sections for flexible content
CREATE TABLE project_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    section_type VARCHAR(100) NOT NULL, -- 'challenge', 'solution', 'impact', etc.
    content TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project metrics
CREATE TABLE project_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    percentage VARCHAR(50),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project team members
CREATE TABLE project_team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255),
    image_url VARCHAR(500),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Implementation tools
CREATE TABLE implementation_tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project images gallery
CREATE TABLE project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    caption VARCHAR(255),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Documentation categories
CREATE TABLE doc_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES doc_categories(id) ON DELETE CASCADE,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Documentation articles
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL, -- Markdown content
    category_id UUID REFERENCES doc_categories(id),
    tags JSONB DEFAULT '[]',
    status VARCHAR(50) DEFAULT 'draft',
    author_id UUID REFERENCES users(id),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP
);

-- File uploads tracking
CREATE TABLE uploads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100),
    size_bytes BIGINT,
    storage_path VARCHAR(500) NOT NULL,
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100),
    entity_id UUID,
    changes JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_division ON projects(division);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_documents_category ON documents(category_id);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
```

### 3. API Endpoints Design

```yaml
# Authentication Endpoints
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/me

# Projects Management
GET    /api/projects              # List all projects (with pagination & filters)
GET    /api/projects/:id          # Get single project details
POST   /api/projects              # Create new project (admin)
PUT    /api/projects/:id          # Update project (admin)
DELETE /api/projects/:id          # Delete project (admin)
POST   /api/projects/:id/publish  # Publish/unpublish project

# Project Related Data
POST   /api/projects/:id/metrics       # Add metric
PUT    /api/projects/:id/metrics/:mid  # Update metric
DELETE /api/projects/:id/metrics/:mid  # Delete metric

POST   /api/projects/:id/images        # Upload project images
DELETE /api/projects/:id/images/:iid   # Delete image

POST   /api/projects/:id/tools         # Add implementation tool
PUT    /api/projects/:id/tools/:tid    # Update tool
DELETE /api/projects/:id/tools/:tid    # Delete tool

# Documentation Management
GET    /api/docs/categories       # List all categories
POST   /api/docs/categories       # Create category (admin)
PUT    /api/docs/categories/:id   # Update category (admin)
DELETE /api/docs/categories/:id   # Delete category (admin)

GET    /api/docs                  # List all documents
GET    /api/docs/:slug            # Get document by slug
POST   /api/docs                  # Create document (admin)
PUT    /api/docs/:id              # Update document (admin)
DELETE /api/docs/:id              # Delete document (admin)
POST   /api/docs/:id/publish      # Publish/unpublish document

# File Upload
POST   /api/upload/image          # Upload image file
POST   /api/upload/document       # Upload document file
GET    /api/uploads               # List uploaded files

# Search
GET    /api/search                # Global search across projects & docs

# Dashboard Statistics
GET    /api/stats/overview        # Get overview statistics
GET    /api/stats/projects        # Project statistics
GET    /api/stats/documents       # Documentation statistics
```

### 4. Backend Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js         # Database connection
│   │   ├── storage.js          # File storage config
│   │   └── constants.js        # App constants
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   ├── documentController.js
│   │   └── uploadController.js
│   ├── middleware/
│   │   ├── auth.js            # JWT authentication
│   │   ├── validation.js      # Request validation
│   │   ├── errorHandler.js    # Error handling
│   │   └── upload.js          # File upload handling
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── Document.js
│   │   └── index.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── project.routes.js
│   │   ├── document.routes.js
│   │   └── index.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── projectService.js
│   │   ├── documentService.js
│   │   ├── searchService.js
│   │   └── storageService.js
│   ├── utils/
│   │   ├── validators.js
│   │   ├── helpers.js
│   │   └── logger.js
│   └── app.js                 # Express app setup
├── migrations/                 # Database migrations
├── seeds/                      # Seed data
├── tests/                      # Test files
├── .env.example
├── package.json
└── server.js                   # Entry point
```

## Admin Interface Design

### Admin Dashboard Features

1. **Project Management**
   - Create/Edit/Delete projects
   - Rich text editor for project sections
   - Image upload with drag-and-drop
   - Project metrics management
   - Team member management
   - Implementation tools management
   - Project preview before publishing

2. **Documentation Management**
   - Markdown editor with live preview
   - Category management (tree structure)
   - Tag management
   - Version history
   - Draft/Published status
   - Search and filter documents

3. **Media Library**
   - Upload images/files
   - Organize in folders
   - Image optimization
   - CDN integration (optional)

4. **User Management**
   - Add/Edit/Delete users
   - Role-based permissions
   - Activity logs

5. **Analytics Dashboard**
   - Project views statistics
   - Document popularity
   - User activity tracking
   - System health monitoring

### Admin UI Technology Options

**Option 1: React Admin Panel (Separate App)**
```json
{
  "framework": "React + TypeScript",
  "UI_library": "Ant Design / Material-UI",
  "state_management": "Redux Toolkit / Zustand",
  "rich_editor": "TinyMCE / Quill",
  "markdown_editor": "Monaco Editor / CodeMirror",
  "charts": "Recharts / Chart.js",
  "file_upload": "react-dropzone"
}
```

**Option 2: Integrated Docusaurus Admin**
```json
{
  "approach": "Custom Docusaurus pages",
  "authentication": "Protected routes",
  "components": "Reuse existing React components",
  "advantage": "Single deployment"
}
```

## Implementation Roadmap

### Phase 1: Backend Development (Week 1-2)
- [ ] Set up Node.js/Express project
- [ ] Configure PostgreSQL database
- [ ] Implement database models with Prisma
- [ ] Create authentication system
- [ ] Develop CRUD APIs for projects
- [ ] Develop CRUD APIs for documents
- [ ] Implement file upload functionality
- [ ] Add validation and error handling
- [ ] Write API documentation

### Phase 2: Admin Interface (Week 3-4)
- [ ] Set up admin React application
- [ ] Implement authentication flow
- [ ] Create project management interface
- [ ] Create documentation management interface
- [ ] Add rich text and markdown editors
- [ ] Implement media library
- [ ] Add user management
- [ ] Create dashboard with statistics

### Phase 3: Frontend Integration (Week 5)
- [ ] Update Docusaurus to fetch from API
- [ ] Modify Home.js to use dynamic data
- [ ] Update project listing pages
- [ ] Update documentation pages
- [ ] Implement search functionality
- [ ] Add loading states and error handling
- [ ] Optimize performance (caching, lazy loading)

### Phase 4: Testing & Deployment (Week 6)
- [ ] Write unit tests for backend
- [ ] Write integration tests
- [ ] Test admin interface
- [ ] Performance optimization
- [ ] Security audit
- [ ] Set up CI/CD pipeline
- [ ] Deploy to production

## Security Considerations

1. **Authentication & Authorization**
   - JWT tokens with refresh tokens
   - Role-based access control (RBAC)
   - Session management
   - Password hashing (bcrypt)

2. **Data Protection**
   - Input validation and sanitization
   - SQL injection prevention (parameterized queries)
   - XSS protection
   - CSRF protection
   - Rate limiting

3. **File Upload Security**
   - File type validation
   - File size limits
   - Virus scanning (optional)
   - Secure file storage

4. **API Security**
   - HTTPS only
   - CORS configuration
   - API key for public endpoints (optional)
   - Request logging and monitoring

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/docsite_db
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10

# JWT
JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# Storage
STORAGE_TYPE=local # or 's3'
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760 # 10MB

# AWS S3 (if using)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_S3_BUCKET=

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001

# Email (optional)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

## Sample API Responses

### Get Projects List
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "title": "BOM OCR System",
        "description": "AI-powered OCR system to automate data extraction...",
        "image_url": "https://example.com/image.jpg",
        "division": "pc",
        "department": "Production Control",
        "category": ["ai", "automation"],
        "status": "active",
        "created_at": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

### Create Project Request
```json
{
  "title": "New Project Title",
  "description": "Project description",
  "division": "it_dm",
  "department": "IT Department",
  "category": ["cloud", "security"],
  "sections": {
    "challenge": "Description of challenges...",
    "solution": "Our solution approach...",
    "impact": "The impact achieved..."
  },
  "metrics": [
    {
      "percentage": "75%",
      "title": "Time Reduction",
      "description": "Reduced processing time"
    }
  ],
  "team_members": [
    {
      "name": "John Doe",
      "position": "Project Manager"
    }
  ]
}
```

## Frontend Integration Example

### Updated Home.js Integration
```javascript
// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects?status=active&limit=6`);
      const data = await response.json();
      
      if (data.success) {
        setProjects(data.data.projects);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Rest of component...
}
```

## Deployment Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   Frontend      │────▶│   Backend API   │────▶│   PostgreSQL    │
│   (Docusaurus)  │     │   (Express)     │     │   Database      │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                       │                        
         │                       │                        
         ▼                       ▼                        
┌─────────────────┐     ┌─────────────────┐              
│                 │     │                 │              
│   Admin Panel   │     │   File Storage  │              
│   (React)       │     │   (S3/Local)    │              
│                 │     │                 │              
└─────────────────┘     └─────────────────┘              
```

## Next Steps

1. **Choose Technology Stack**
   - Decide between Node.js or Python backend
   - Choose database (PostgreSQL recommended)
   - Select admin UI approach

2. **Set Up Development Environment**
   - Install required tools
   - Set up database
   - Configure development environment

3. **Start Implementation**
   - Begin with backend API development
   - Create basic admin interface
   - Integrate with existing frontend

4. **Testing & Refinement**
   - Test all functionality
   - Optimize performance
   - Prepare for deployment

## Conclusion

This architecture provides a scalable, maintainable solution for dynamic content management. The system eliminates hardcoding, provides an intuitive admin interface, and maintains the performance benefits of static site generation through proper caching strategies.