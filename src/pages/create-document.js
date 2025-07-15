import React from 'react';
import Layout from '@theme/Layout';
import ContentSubmissionForm from '../components/ContentSubmissionForm';

export default function CreateDocument() {
  return (
    <Layout
      title="Create Document"
      description="Create new documents with our rich text editor"
    >
      <main className="container margin-vert--lg">
        <ContentSubmissionForm />
      </main>
    </Layout>
  );
} 