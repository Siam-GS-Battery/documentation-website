import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useLocation } from '@docusaurus/router';
import { FiDownload, FiArrowLeft } from 'react-icons/fi';
import { 
  AiFillFilePdf, 
  AiFillFileWord, 
  AiFillFileExcel,
  AiFillFileImage,
  AiFillFile 
} from 'react-icons/ai';
import { 
  FaReact, 
  FaNodeJs, 
  FaDocker, 
  FaAws, 
  FaStripe,
  FaGoogle
} from 'react-icons/fa';
import { 
  SiMongodb, 
  SiApachekafka, 
  SiApachespark,
  SiElasticsearch,
  SiTerraform,
  SiHashicorp,
  SiPython,
  SiFastapi,
  SiOpencv
} from 'react-icons/si';
import projectData from '../data/simple.json';
import styles from './Project-detail.module.css';

const getToolIcon = (toolName) => {
  const name = toolName.toLowerCase();
  if (name.includes('react')) return <FaReact style={{ color: '#61DAFB' }} />; // สีฟ้า React
  if (name.includes('node')) return <FaNodeJs style={{ color: '#339933' }} />; // สีเขียว Node.js
  if (name.includes('mongo')) return <SiMongodb style={{ color: '#47A248' }} />; // สีเขียว MongoDB
  if (name.includes('kafka')) return <SiApachekafka style={{ color: '#231F20' }} />; // สีดำ Kafka
  if (name.includes('spark')) return <SiApachespark style={{ color: '#E25A1C' }} />; // สีส้ม Spark
  if (name.includes('elastic')) return <SiElasticsearch style={{ color: '#005571' }} />; // สีน้ำเงิน Elasticsearch
  if (name.includes('terraform')) return <SiTerraform style={{ color: '#7B42BC' }} />; // สีม่วง Terraform
  if (name.includes('docker')) return <FaDocker style={{ color: '#2496ED' }} />; // สีฟ้า Docker
  if (name.includes('ec2') || name.includes('aws')) return <FaAws style={{ color: '#FF9900' }} />; // สีส้ม AWS
  if (name.includes('yolo')) return <SiPython style={{ color: '#3776AB' }} />; // สีน้ำเงิน Python/YOLO
  if (name.includes('paddleocr')) return <SiOpencv style={{ color: '#5C3EE8' }} />; // สีม่วง OpenCV (แทน PaddleOCR)
  if (name.includes('fastapi')) return <SiFastapi style={{ color: '#009688' }} />; // สีเขียว FastAPI
  if (name.includes('qwen')) return <SiPython style={{ color: '#3776AB' }} />; // สีน้ำเงิน Python/Qwen
  return null;
};

const getFileIcon = (fileName) => {
  const extension = fileName.toLowerCase().split('.').pop();
  switch (extension) {
    case 'pdf':
      return <AiFillFilePdf style={{ color: '#ff0000' }} />; // สีแดงสำหรับ PDF
    case 'docx':
    case 'doc':
      return <AiFillFileWord style={{ color: '#2b579a' }} />; // สีน้ำเงินสำหรับ Word
    case 'xlsx':
    case 'xls':
      return <AiFillFileExcel style={{ color: '#217346' }} />; // สีเขียวสำหรับ Excel
    case 'png':
    case 'jpg':
    case 'jpeg':
      return <AiFillFileImage style={{ color: '#4a5568' }} />; // สีเทาสำหรับรูปภาพ
    default:
      return <AiFillFile style={{ color: '#718096' }} />; // สีเทาสำหรับไฟล์ทั่วไป
  }
};

const getVendorIcon = (vendorName) => {
  const name = vendorName.toLowerCase();
  if (name.includes('aws') || name.includes('amazon')) return <FaAws style={{ color: '#FF9900' }} />; // สีส้ม AWS
  if (name.includes('stripe')) return <FaStripe style={{ color: '#008CDD' }} />; // สีฟ้า Stripe
  if (name.includes('google')) return <FaGoogle style={{ color: '#4285F4' }} />; // สีฟ้า Google
  // if (name.includes('confluent')) return <SiConfluent style={{ color: '#023AFF' }} />; // สีน้ำเงิน Confluent - SiConfluent not available
  if (name.includes('hashicorp')) return <SiHashicorp style={{ color: '#000000' }} />; // สีดำ HashiCorp
  return null;
};

export default function ProjectDetail() {
  const [copied, setCopied] = useState(false);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [counters, setCounters] = useState({});
  const location = useLocation();
  
  useEffect(() => {
    // Get project ID from query parameter
    const urlParams = new URLSearchParams(location.search);
    const projectId = parseInt(urlParams.get('id'), 10);
    const foundProject = projectData.projects.find(p => p.id === projectId);
    
    if (foundProject) {
      setProject(foundProject);
    } else {
      // If project not found, redirect to projects page
      window.location.href = '/project';
    }
    setLoading(false);
  }, [location.search]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Effect for number counter animation
  useEffect(() => {
    if (project?.metrics) {
      project.metrics.forEach((metric, index) => {
        const targetValue = parseFloat(metric.percentage);
        if (!isNaN(targetValue)) {
          let startValue = 0;
          const duration = 1000; // 1 seconds duration
          const steps = 60; // 60 steps
          const increment = targetValue / steps;
          const stepDuration = duration / steps;

          const timer = setInterval(() => {
            startValue += increment;
            setCounters(prev => ({
              ...prev,
              [index]: startValue >= targetValue ? targetValue : startValue
            }));

            if (startValue >= targetValue) {
              clearInterval(timer);
            }
          }, stepDuration);

          return () => clearInterval(timer);
        }
      });
    }
  }, [project?.metrics]);

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
        <div className={styles.loadingContainer}>
          <div className={styles.loadingContent}>
            <div className={styles.spinner}></div>
            <div className={styles.loadingText}>Loading project details...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return null; // Will redirect to projects page
  }

  return (
    <Layout title={project.title}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {/* Back Button */}
          <button 
            onClick={() => window.history.back()}
            className={styles.backButton}
          >
            <FiArrowLeft />
            Back to Projects
          </button>
          
          {/* Project Header */}
          <h1 className={styles.projectTitle}>{project.title}</h1>

          {/* Metrics Section */}
          {project.metrics && project.metrics.length > 0 && (
            <div className={styles.metricsContainer}>
              {project.metrics.map((metric, index) => (
                <div key={index} className={styles.metricItem}>
                  <div className={styles.metricBorder}>
                    <div className={styles.metricPercentage}>
                      {typeof counters[index] === 'number' 
                        ? `${counters[index].toFixed(1)}${metric.percentage.includes('%') ? '%' : ''}`
                        : metric.percentage}
                    </div>
                    <div className={styles.metricTitle}>{metric.title}</div>
                    <div className={styles.metricDescription}>{metric.description}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Main Content Area */}
          <div className={styles.contentGrid}>
            {/* Left Column */}
            <div className={styles.leftColumn}>
              {/* Challenge Section */}
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Challenge</h2>
                <div className={styles.sectionContent}>
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
              {project.sections.solution && (
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Solution</h2>
                  <div className={styles.sectionContent}>
                    {project.sections.solution.split('\n\n\n').map((paragraph, index) => {
                      if (paragraph.includes('\n-')) {
                        // Handle bullet points with proper indentation
                        const parts = paragraph.split('\n\n');
                        const titleLine = parts[0].trim();
                        const items = parts.slice(1).join('\n').split('\n').filter(item => item.trim().startsWith('-'));
                        
                        return (
                          <div key={index} className="mb-8">
                            {/* Handle markdown bold in title */}
                            <p className="mb-6 text-xl font-semibold">
                              {titleLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                            </p>
                            <ul className="list-none pl-8 space-y-4 mb-8">
                              {items.map((item, itemIndex) => (
                                <li key={itemIndex} className="text-gray-700 flex items-start">
                                  <span className="mr-4 text-lg">•</span>
                                  <span className="text-base leading-relaxed">
                                    {/* Handle markdown bold in list items */}
                                    {item.replace('-', '').trim().replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      } else {
                        // Handle regular paragraphs with markdown bold
                        return (
                          <p 
                            key={index} 
                            className="mb-4"
                            dangerouslySetInnerHTML={{
                              __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            }}
                          />
                        );
                      }
                    })}
                  </div>
                </section>
              )}

              {/* Impact Section */}
              {project.sections.impact && (
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Impact</h2>
                  <div className={styles.sectionContent}>
                    {project.sections.impact.split('\n\n').map((paragraph, index) => {
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
              )}

              {/* Project Images Gallery*/}
              {project.projectImages && project.projectImages.length > 0 && (
                <section className={`${styles.section} ${styles.gallerySection}`}>
                  <h2 className={styles.galleryTitle}>Project Images</h2>
                  <div>
                    {/* Main Image */}
                    <div className={styles.mainImageContainer}>
                      <img 
                        src={project.projectImages[selectedImageIndex]} 
                        alt={`Project image ${selectedImageIndex + 1}`} 
                        className={styles.mainImage}
                      />
                      <div className={styles.imageCounter}>
                        {selectedImageIndex + 1} / {project.projectImages.length}
                      </div>
                    </div>
                    
                    {/* Thumbnail Images */}
                    <div className={styles.thumbnailGrid}>
                      {project.projectImages.map((image, index) => (
                        <div 
                          key={index} 
                          className={`${styles.thumbnailContainer} ${
                            index === selectedImageIndex ? styles.active : ''
                          }`}
                          onClick={() => selectImage(index)}
                        >
                          <img 
                            src={image} 
                            alt={`Project image ${index + 1}`} 
                            className={styles.thumbnail}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <aside className={styles.sidebar}>
              {/* About Project */}
              {project.aboutProject && (
                <div className={styles.sidebarSection}>
                  <div className={styles.sidebarTitle}>About Project</div>
                  {project.aboutProject.stakeholder && (
                    <>
                      <div className={styles.sidebarSubtitle}>Stakeholder</div>
                      <div className={styles.sidebarText}>{project.aboutProject.stakeholder}</div>
                    </>
                  )}
                  {project.aboutProject.keyTeamMembers && (
                    <div>
                      <div className={styles.sidebarSubtitle}>Key Team Members</div>
                      <ul className={styles.teamMembersList}>
                        {project.aboutProject.keyTeamMembers.map((member, index) => (
                          <li key={index} className={styles.teamMember}>{member}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              <hr className={styles.divider} />

              {/* Implementation tools */}
              <div>
                <div className={styles.sidebarTitle}>Implementation tools</div>
                {project.implementationTools && project.implementationTools.map((tool, index) => (
                  <div key={index} className={styles.toolItem}>
                    <div className={styles.toolIcon}>
                      {getToolIcon(tool.name)}
                    </div>
                    <div className={styles.toolInfo}>
                      <div className={styles.toolName}>{tool.name}</div>
                      <div className={styles.toolDescription}>{tool.description}</div>
                    </div>
                  </div>
                ))}
              </div>
              <hr className={styles.divider} />

              {/* Vendors - Show only if vendors exist and not empty */}
              {project.vendors && project.vendors.length > 0 && (
                <>
                  <div>
                    <div className={styles.sidebarTitle}>Vendors</div>
                    {project.vendors.map((vendor, index) => (
                      <div key={index} className={styles.toolItem}>
                        <div className={styles.toolIcon}>
                          {getVendorIcon(vendor.name)}
                        </div>
                        <div className={styles.toolInfo}>
                          <div className={styles.toolName}>{vendor.name}</div>
                          <div className={styles.toolDescription}>{vendor.type}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <hr className={styles.divider} />
                </>
              )}

              {/* File Section - Show only if files exist and not empty */}
              {project.files && project.files.length > 0 && (
                <div>
                  <div className={styles.sidebarTitle}>File</div>
                  <ul className={styles.filesList}>
                    {project.files.map((file, idx) => (
                      <li key={idx} className={styles.fileItem}>
                        <div className={styles.fileInfo}>
                          <div className={styles.fileIconContainer}>
                            {getFileIcon(file.name)}
                          </div>
                          <div>
                            <div className={styles.fileName}>{file.name}</div>
                            <div className={styles.fileDate}>{file.date}</div>
                          </div>
                        </div>
                        <a
                          href="/"
                          download
                          className={styles.downloadLink}
                          title="Download file"
                        >
                          <FiDownload className={styles.downloadIcon} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </Layout>  
  );
}