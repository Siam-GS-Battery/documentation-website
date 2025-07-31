import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useParams } from '@docusaurus/router';
import { FiGithub, FiDownload } from 'react-icons/fi';
import projectData from '../data/simple.json';

export default function ProjectDetail() {
  const [copied, setCopied] = useState(false);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const params = useParams();
  
  useEffect(() => {
    // Find project by ID from URL parameter
    const foundProject = projectData.projects.find(p => p.id === params.id);
    
    if (foundProject) {
      setProject(foundProject);
    } else {
      // If project not found, redirect to projects page
      window.location.href = '/project';
    }
    setLoading(false);
  }, [params.id]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const selectImage = (index) => {
    setSelectedImageIndex(index);
  };

  if (loading) {
    return (
      <Layout title="Loading...">
        <div className="bg-white min-h-screen py-8 flex items-center justify-center">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return null; // Will redirect to projects page
  }

  return (
    <Layout title={project.title}>
      <div className="bg-white min-h-screen py-8">
        <div className="max-w-[1200px] mx-auto px-4">
          {/* Project Header */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mt-16 mb-16">{project.title}</h1>

          {/* Metrics Section */}
          <div className="flex flex-row justify-between items-stretch mb-12 w-full">
            {project.metrics && project.metrics.map((metric, index) => (
              <div key={index} className="flex-1 flex flex-col items-start justify-center text-left">
                <div className="border-l border-gray-400 h-full pl-6">
                  <div className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-1">{metric.percentage}</div>
                  <div className="text-lg font-bold mb-1">{metric.title}</div>
                  <div className="text-gray-700 text-base font-normal">{metric.description}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Left Column */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Challenge Section */}
              <section className="scroll-animate">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Challenge</h2>
                <div className="text-gray-700 leading-relaxed">
                  {project.sections.challenge.split('\n\n').map((paragraph, index) => {
                    if (paragraph.includes('\n•')) {
                      // Convert bullet points to proper list
                      const parts = paragraph.split('\n');
                      const introText = parts[0];
                      const items = parts.slice(1).filter(item => item.trim().startsWith('•'));
                      return (
                        <div key={index}>
                          <p className="mb-2">{introText}</p>
                          <ul className="list-disc pl-6 space-y-1">
                            {items.map((item, itemIndex) => (
                              <li key={itemIndex} className="text-gray-700">
                                {item.replace('•', '').trim()}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    } else {
                      return <p key={index} className="mb-2">{paragraph}</p>;
                    }
                  })}
                </div>
              </section>

              {/* Solution Section */}
              <section className="scroll-animate">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Solution</h2>
                <div className="text-gray-700 leading-relaxed">
                  {project.sections.solution.split('\n\n').map((paragraph, index) => {
                    if (paragraph.includes('\n•')) {
                      // Convert bullet points to proper list
                      const parts = paragraph.split('\n');
                      const introText = parts[0];
                      const items = parts.slice(1).filter(item => item.trim().startsWith('•'));
                      return (
                        <div key={index}>
                          <p className="mb-2">{introText}</p>
                          <ul className="list-disc pl-6 space-y-1">
                            {items.map((item, itemIndex) => (
                              <li key={itemIndex} className="text-gray-700">
                                {item.replace('•', '').trim()}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    } else {
                      return <p key={index} className="mb-2">{paragraph}</p>;
                    }
                  })}
                </div>
              </section>

              {/* Impact Section */}
              <section className="scroll-animate">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Impact</h2>
                <div className="text-gray-700 leading-relaxed">
                  {project.sections.impact.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('•')) {
                      // Convert bullet points to proper list
                      const items = paragraph.split('\n').filter(item => item.trim().startsWith('•'));
                      return (
                        <div key={index}>
                          <p className="mb-2">{paragraph.split('\n')[0]}</p>
                          <ul className="list-disc pl-6 space-y-1">
                            {items.map((item, itemIndex) => (
                              <li key={itemIndex} className="text-gray-700">
                                {item.replace('•', '').trim()}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    } else {
                      return <p key={index} className="mb-2">{paragraph}</p>;
                    }
                  })}
                </div>
              </section>

              {/* Project Images Gallery*/}
              {project.projectImages && project.projectImages.length > 0 && (
                <section className="scroll-animate mt-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Project Images</h2>
                  <div className="space-y-4">
                    {/* Main Image */}
                    <div className="relative overflow-hidden rounded-lg shadow-lg">
                      <img 
                        src={project.projectImages[selectedImageIndex]} 
                        alt={`Project image ${selectedImageIndex + 1}`} 
                        className="w-full h-80 object-cover transition-all duration-300"
                      />
                      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {selectedImageIndex + 1} / {project.projectImages.length}
                      </div>
                    </div>
                    
                    {/* Thumbnail Images */}
                    <div className="grid grid-cols-5 gap-3">
                      {project.projectImages.map((image, index) => (
                        <div 
                          key={index} 
                          className={`relative cursor-pointer overflow-hidden rounded-lg shadow-md transition-all duration-300 ${
                            index === selectedImageIndex 
                              ? 'ring-2 ring-blue-500 scale-105' 
                              : 'hover:scale-105'
                          }`}
                          onClick={() => selectImage(index)}
                        >
                          <img 
                            src={image} 
                            alt={`Project image ${index + 1}`} 
                            className="w-full h-20 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <aside className="lg:col-span-1 space-y-8 sticky top-8 self-start">
              {/* About Project */}
              <div className="mt-10">
                <div className="text-xl font-bold text-gray-900 mb-2">About Project</div>
                <div className="text-base font-bold text-gray-900 mb-1">Stakeholder</div>
                <div className="text-base text-gray-500 mb-8">{project.aboutProject.stakeholder}</div>
                <div className="mb-2">
                  <div className="text-base font-bold text-gray-900 mb-2">Key Team Members</div>
                  <ul className="list-none pl-0 text-gray-700">
                    {project.aboutProject.keyTeamMembers.map((member, index) => (
                      <li key={index} className="text-base text-gray-700 mb-4">{member}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <hr className="my-4 border-gray-300" />

              {/* Implementation tools */}
              <div>
                <div className="text-xl font-bold text-gray-900 mb-4">Implementation tools</div>
                {project.implementationTools && project.implementationTools.map((tool, index) => (
                  <div key={index} className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center">
                      <FiGithub className="text-xl text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-base font-bold text-gray-900 leading-tight">{tool.name}</div>
                      <div className="text-base text-gray-500 leading-tight">{tool.description}</div>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="my-4 border-gray-300" />

              {/* Vendors */}
              <div>
                <div className="text-xl font-bold text-gray-900 mb-4">Vendors</div>
                {project.vendors && project.vendors.map((vendor, index) => (
                  <div key={index} className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center">
                      <FiGithub className="text-xl text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-base font-bold text-gray-900 leading-tight">{vendor.name}</div>
                      <div className="text-base text-gray-500 leading-tight">{vendor.type}</div>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="my-4 border-gray-300" />

              {/* File Section */}
              <div>
                <div className="text-xl font-bold text-gray-900 mb-2">File</div>
                <ul className="divide-y divide-gray-100">
                  {project.files && project.files.map((file, idx) => (
                    <li key={idx} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center">
                          {/* Placeholder for file icon */}
                          <div className="w-8 h-8 bg-gray-300 rounded"></div>
                        </div>
                        <div>
                          <div className="text-base font-bold text-gray-900 leading-tight">{file.name}</div>
                          <div className="text-base text-gray-500 leading-tight">{file.date}</div>
                        </div>
                      </div>
                      <a
                        href="/"
                        download
                        className="text-gray-700 hover:text-blue-800 transition flex items-center gap-1"
                        title="Download file"
                      >
                        <FiDownload className="text-lg" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Layout>
  );
}