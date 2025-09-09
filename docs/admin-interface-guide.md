# Admin Interface Development Guide

## Overview
This guide provides detailed instructions for developing the admin interface for managing projects and documentation dynamically.

## Admin Panel Features

### 1. Dashboard Overview
The main dashboard provides a bird's-eye view of all content and system status.

```
┌────────────────────────────────────────────────────────┐
│  Admin Dashboard                              [Logout]  │
├────────────────────────────────────────────────────────┤
│                                                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐│
│  │Projects  │ │Documents │ │Users     │ │Analytics ││
│  │   12     │ │   45     │ │   5      │ │  1.2K    ││
│  │  Total   │ │  Total   │ │  Active  │ │  Views   ││
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘│
│                                                        │
│  Recent Activity                                       │
│  ┌────────────────────────────────────────────────┐  │
│  │ • John added new project "AI Assistant"        │  │
│  │ • Sarah updated documentation "API Guide"      │  │
│  │ • Mike uploaded 5 new images                   │  │
│  └────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### 2. Project Management Interface

#### Project List View
```jsx
// components/admin/ProjectList.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Space, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <a href={`/admin/projects/${record.id}`}>{text}</a>
      ),
    },
    {
      title: 'Division',
      dataIndex: 'division',
      key: 'division',
    },
    {
      title: 'Categories',
      dataIndex: 'category',
      key: 'category',
      render: (tags) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag.toUpperCase()}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'orange'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} onClick={() => handlePreview(record)} />
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="project-list">
      <div className="header">
        <h1>Projects Management</h1>
        <Button type="primary" onClick={() => navigate('/admin/projects/new')}>
          Add New Project
        </Button>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={projects}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};
```

#### Project Editor Form
```jsx
// components/admin/ProjectEditor.jsx
import React, { useState } from 'react';
import {
  Form, Input, Select, Button, Upload,
  Card, Tabs, Row, Col, Space, Divider
} from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { TabPane } = Tabs;
const { TextArea } = Input;

const ProjectEditor = ({ project, onSave }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [metrics, setMetrics] = useState(project?.metrics || []);
  const [teamMembers, setTeamMembers] = useState(project?.team_members || []);

  const onFinish = async (values) => {
    const projectData = {
      ...values,
      metrics,
      team_members: teamMembers,
      images: fileList.map(file => file.url),
    };
    
    await onSave(projectData);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={project}
      className="project-editor"
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Basic Information" key="1">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Project Title"
                rules={[{ required: true, message: 'Please enter project title' }]}
              >
                <Input placeholder="Enter project title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value="draft">Draft</Select.Option>
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="archived">Archived</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="division" label="Division">
                <Select>
                  <Select.Option value="it_dm">IT & Data Management</Select.Option>
                  <Select.Option value="pc">Production Control</Select.Option>
                  <Select.Option value="production-procurement">
                    Production & Procurement
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="category" label="Categories">
                <Select mode="multiple">
                  <Select.Option value="ai">AI</Select.Option>
                  <Select.Option value="cloud">Cloud</Select.Option>
                  <Select.Option value="security">Security</Select.Option>
                  <Select.Option value="infrastructure">Infrastructure</Select.Option>
                  <Select.Option value="business">Business</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="Short Description">
            <TextArea rows={4} placeholder="Brief project description" />
          </Form.Item>

          <Form.Item label="Main Image">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </TabPane>

        <TabPane tab="Project Details" key="2">
          <Form.Item 
            name={['sections', 'challenge']} 
            label="Challenge"
          >
            <ReactQuill 
              theme="snow"
              placeholder="Describe the challenges..."
            />
          </Form.Item>

          <Form.Item 
            name={['sections', 'solution']} 
            label="Solution"
          >
            <ReactQuill 
              theme="snow"
              placeholder="Describe the solution..."
            />
          </Form.Item>

          <Form.Item 
            name={['sections', 'impact']} 
            label="Impact"
          >
            <ReactQuill 
              theme="snow"
              placeholder="Describe the impact..."
            />
          </Form.Item>
        </TabPane>

        <TabPane tab="Metrics" key="3">
          <MetricsEditor 
            metrics={metrics} 
            onChange={setMetrics}
          />
        </TabPane>

        <TabPane tab="Team & Tools" key="4">
          <TeamMembersEditor 
            members={teamMembers}
            onChange={setTeamMembers}
          />
          <Divider />
          <ImplementationToolsEditor 
            tools={project?.implementation_tools}
          />
        </TabPane>

        <TabPane tab="Gallery" key="5">
          <ProjectGalleryEditor 
            images={project?.project_images}
          />
        </TabPane>
      </Tabs>

      <div style={{ marginTop: 24, textAlign: 'right' }}>
        <Space>
          <Button>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Save Project
          </Button>
        </Space>
      </div>
    </Form>
  );
};
```

### 3. Documentation Management

#### Markdown Editor with Live Preview
```jsx
// components/admin/DocumentEditor.jsx
import React, { useState } from 'react';
import { Row, Col, Form, Input, Select, Button, Card } from 'antd';
import MonacoEditor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const DocumentEditor = ({ document, onSave }) => {
  const [content, setContent] = useState(document?.content || '');
  const [form] = Form.useForm();

  return (
    <div className="document-editor">
      <Form
        form={form}
        layout="vertical"
        initialValues={document}
        onFinish={(values) => onSave({ ...values, content })}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item 
              name="title" 
              label="Document Title"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter document title" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              name="category_id" 
              label="Category"
            >
              <Select placeholder="Select category">
                <Select.Option value="getting-started">Getting Started</Select.Option>
                <Select.Option value="tutorials">Tutorials</Select.Option>
                <Select.Option value="api-reference">API Reference</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} style={{ height: '600px' }}>
          <Col span={12}>
            <Card title="Markdown Editor" style={{ height: '100%' }}>
              <MonacoEditor
                height="500px"
                language="markdown"
                theme="vs-light"
                value={content}
                onChange={setContent}
                options={{
                  minimap: { enabled: false },
                  wordWrap: 'on',
                  lineNumbers: 'on',
                }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Preview" style={{ height: '100%', overflow: 'auto' }}>
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                className="markdown-preview"
              >
                {content}
              </ReactMarkdown>
            </Card>
          </Col>
        </Row>

        <div style={{ marginTop: 16, textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Save Document
          </Button>
        </div>
      </Form>
    </div>
  );
};
```

### 4. Media Library

```jsx
// components/admin/MediaLibrary.jsx
import React, { useState } from 'react';
import { Upload, Modal, Card, Button, Row, Col, message } from 'antd';
import { InboxOutlined, CopyOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const MediaLibrary = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const uploadProps = {
    name: 'file',
    multiple: true,
    action: '/api/upload/image',
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} uploaded successfully.`);
        fetchFiles();
      } else if (status === 'error') {
        message.error(`${info.file.name} upload failed.`);
      }
    },
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    message.success('URL copied to clipboard!');
  };

  return (
    <div className="media-library">
      <h1>Media Library</h1>
      
      <Dragger {...uploadProps} style={{ marginBottom: 24 }}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag files to upload
        </p>
        <p className="ant-upload-hint">
          Support for single or bulk upload. Images will be automatically optimized.
        </p>
      </Dragger>

      <Row gutter={[16, 16]}>
        {files.map((file) => (
          <Col key={file.id} xs={12} sm={8} md={6} lg={4}>
            <Card
              hoverable
              cover={<img alt={file.name} src={file.url} />}
              actions={[
                <Button 
                  icon={<CopyOutlined />} 
                  onClick={() => copyToClipboard(file.url)}
                >
                  Copy URL
                </Button>
              ]}
            >
              <Card.Meta 
                title={file.name}
                description={`${(file.size / 1024).toFixed(2)} KB`}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
```

## Admin Panel Architecture

### Technology Stack
```json
{
  "framework": "React 18 + TypeScript",
  "ui_components": "Ant Design 5",
  "state_management": "Redux Toolkit + RTK Query",
  "routing": "React Router v6",
  "form_handling": "React Hook Form + Yup",
  "rich_text_editor": "React Quill",
  "markdown_editor": "Monaco Editor",
  "file_upload": "react-dropzone",
  "charts": "Recharts",
  "http_client": "Axios",
  "authentication": "JWT with Axios interceptors"
}
```

### Project Structure
```
admin-panel/
├── src/
│   ├── api/
│   │   ├── auth.api.ts
│   │   ├── projects.api.ts
│   │   ├── documents.api.ts
│   │   └── uploads.api.ts
│   ├── components/
│   │   ├── common/
│   │   │   ├── Layout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── PrivateRoute.tsx
│   │   ├── projects/
│   │   │   ├── ProjectList.tsx
│   │   │   ├── ProjectEditor.tsx
│   │   │   ├── ProjectPreview.tsx
│   │   │   └── MetricsEditor.tsx
│   │   ├── documents/
│   │   │   ├── DocumentList.tsx
│   │   │   ├── DocumentEditor.tsx
│   │   │   └── CategoryTree.tsx
│   │   ├── media/
│   │   │   ├── MediaLibrary.tsx
│   │   │   └── ImageUploader.tsx
│   │   └── dashboard/
│   │       ├── Overview.tsx
│   │       ├── Statistics.tsx
│   │       └── RecentActivity.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useApi.ts
│   │   └── useDebounce.ts
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Projects.tsx
│   │   ├── Documents.tsx
│   │   └── Settings.tsx
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── api.service.ts
│   │   └── storage.service.ts
│   ├── store/
│   │   ├── index.ts
│   │   ├── auth.slice.ts
│   │   ├── projects.slice.ts
│   │   └── documents.slice.ts
│   ├── styles/
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── components/
│   ├── types/
│   │   ├── project.types.ts
│   │   ├── document.types.ts
│   │   └── user.types.ts
│   ├── utils/
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   └── constants.ts
│   ├── App.tsx
│   └── index.tsx
├── public/
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Authentication Flow

### JWT Implementation
```typescript
// services/auth.service.ts
import axios from 'axios';
import { API_BASE_URL } from '@/utils/constants';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    this.loadTokens();
    this.setupInterceptors();
  }

  private loadTokens(): void {
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
  }

  private setupInterceptors(): void {
    // Request interceptor
    axios.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for token refresh
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await this.refreshAccessToken();
            return axios(originalRequest);
          } catch (refreshError) {
            this.logout();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      credentials
    );

    const { accessToken, refreshToken } = response.data;
    
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    
    return { accessToken, refreshToken };
  }

  async refreshAccessToken(): Promise<void> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post(
      `${API_BASE_URL}/auth/refresh`,
      { refreshToken: this.refreshToken }
    );

    const { accessToken } = response.data;
    
    this.accessToken = accessToken;
    localStorage.setItem('accessToken', accessToken);
  }

  logout(): void {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }
}

export default new AuthService();
```

## State Management with Redux Toolkit

```typescript
// store/projects.slice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { projectsAPI } from '@/api/projects.api';

export const fetchProjects = createAsyncThunk(
  'projects/fetchAll',
  async (params: any) => {
    const response = await projectsAPI.getAll(params);
    return response.data;
  }
);

export const createProject = createAsyncThunk(
  'projects/create',
  async (projectData: any) => {
    const response = await projectsAPI.create(projectData);
    return response.data;
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    list: [],
    selectedProject: null,
    loading: false,
    error: null,
  },
  reducers: {
    selectProject: (state, action) => {
      state.selectedProject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.projects;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectProject } = projectsSlice.actions;
export default projectsSlice.reducer;
```

## Deployment Configuration

### Docker Setup for Admin Panel
```dockerfile
# Dockerfile
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name admin.yoursite.com;
    
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://backend:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Security Measures

1. **Role-Based Access Control (RBAC)**
```typescript
// components/common/PrivateRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: string[];
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  children, 
  requiredRole = [] 
}) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole.length > 0 && !requiredRole.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <>{children}</>;
};
```

2. **Input Validation**
```typescript
// utils/validators.ts
import * as Yup from 'yup';

export const projectValidationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  division: Yup.string()
    .required('Division is required'),
  category: Yup.array()
    .min(1, 'At least one category is required'),
  sections: Yup.object({
    challenge: Yup.string()
      .required('Challenge description is required'),
    solution: Yup.string()
      .required('Solution description is required'),
    impact: Yup.string()
      .required('Impact description is required'),
  }),
});
```

3. **XSS Protection**
```typescript
// utils/sanitizer.ts
import DOMPurify from 'dompurify';

export const sanitizeHTML = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'li', 'ol'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
};
```

## Testing Strategy

```typescript
// __tests__/ProjectEditor.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProjectEditor } from '@/components/projects/ProjectEditor';
import { projectsAPI } from '@/api/projects.api';

jest.mock('@/api/projects.api');

describe('ProjectEditor', () => {
  it('should submit form with valid data', async () => {
    const mockSave = jest.fn();
    projectsAPI.create.mockResolvedValue({ data: { id: '123' } });
    
    render(<ProjectEditor onSave={mockSave} />);
    
    fireEvent.change(screen.getByLabelText('Project Title'), {
      target: { value: 'Test Project' },
    });
    
    fireEvent.click(screen.getByText('Save Project'));
    
    await waitFor(() => {
      expect(mockSave).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Project',
        })
      );
    });
  });
});
```

## Conclusion

This admin interface provides a complete solution for managing dynamic content. It includes:
- Secure authentication system
- Intuitive project and document management
- Media library for file uploads
- Real-time preview capabilities
- Responsive design for all devices
- Comprehensive testing coverage

The system is built with modern technologies ensuring scalability, maintainability, and excellent user experience.