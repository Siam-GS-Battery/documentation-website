import React from 'react';
import Layout from '@theme/Layout';
import ContentSubmissionForm from '@site/src/components/ContentSubmissionForm';

export default function ContentSubmissionPage() {
  return (
    <Layout
      title="Create Markdown Document"
      description="Create Markdown documents for Docusaurus"
    >
      <main>
        <ContentSubmissionForm />
      </main>
    </Layout>
  );
} 