import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useLocation } from '@docusaurus/router';
import { FiDownload, FiArrowLeft, FiUser, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
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
  SiOpencv,
  SiAnsible,
  SiLinux,
  SiTailwindcss,
  SiPostcss,
  SiMdx,
  SiVmware,
  SiKaspersky
} from 'react-icons/si';
import projectData from '../data/documents.json';
import styles from './Project-detail.module.css';

const getToolIcon = (toolName) => {
  if (!toolName) return null;
  const name = toolName.toLowerCase();
  if (name.includes('react')) return <FaReact style={{ color: '#61DAFB' }} />; // สีฟ้า React
  if (name.includes('node')) return <FaNodeJs style={{ color: '#339933' }} />; // สีเขียว Node.js
  if (name.includes('mongo')) return <SiMongodb style={{ color: '#47A248' }} />; // สีเขียว MongoDB
  if (name.includes('kafka')) return <SiApachekafka style={{ color: '#231F20' }} />; // สีดำ Kafka
  if (name.includes('spark')) return <SiApachespark style={{ color: '#E25A1C' }} />; // สีส้ม Spark
  if (name.includes('elastic')) {
    // Use external SVG for Elastic Stack
    return <img src="https://www.svgrepo.com/show/303574/elasticsearch-logo.svg" alt="Elastic Stack" style={{ width: '100%', height: '100%' }} />;
  }
  if (name.includes('terraform')) return <SiTerraform style={{ color: '#7B42BC' }} />; // สีม่วง Terraform
  if (name.includes('docker')) return <FaDocker style={{ color: '#2496ED' }} />; // สีฟ้า Docker
  if (name.includes('ec2') || name.includes('aws')) return <FaAws style={{ color: '#FF9900' }} />; // สีส้ม AWS
  if (name.includes('yolo')) return <SiPython style={{ color: '#3776AB' }} />; // สีน้ำเงิน Python/YOLO
  if (name.includes('paddleocr')) return <SiOpencv style={{ color: '#5C3EE8' }} />; // สีม่วง OpenCV (แทน PaddleOCR)
  if (name.includes('fastapi')) return <SiFastapi style={{ color: '#009688' }} />; // สีเขียว FastAPI
  if (name.includes('qwen')) return <SiPython style={{ color: '#3776AB' }} />; // สีน้ำเงิน Python/Qwen
  if (name.includes('wazuh')) {
    // Use external PNG for Wazuh
    return <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Wazuh_blue.png" alt="Wazuh" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
  }
  if (name.includes('ansible')) return <SiAnsible style={{ color: '#EE0000' }} />; // สีแดง Ansible
  if (name.includes('linux')) return <SiLinux style={{ color: '#FCC624' }} />; // สีเหลือง Linux
  if (name.includes('docusaurus')) {
    // Use external SVG for Docusaurus
    return <img src="https://docusaurus.io/img/docusaurus.svg" alt="Docusaurus" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
  }
  if (name.includes('tailwind')) return <SiTailwindcss style={{ color: '#06B6D4' }} />; // สีฟ้า TailwindCSS
  if (name.includes('postcss')) return <SiPostcss style={{ color: '#DD3A0A' }} />; // สีแดง PostCSS
  if (name.includes('mdx')) return <SiMdx style={{ color: '#1B1F24' }} />; // สีดำ MDX
  if (name.includes('playwright')) {
    // Use external SVG for Playwright
    return <img src="https://playwright.dev/img/playwright-logo.svg" alt="Playwright" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
  }
  // Windows Server
  if (name.includes('windows server') || name.includes('windows 2025') || name.includes('windows 2022')) {
    return <img src="https://logos-world.net/wp-content/uploads/2020/12/Windows-New-Logo.png" alt="Windows Server" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
  }
  // Microsoft tools - use external image since SiMicrosoft is not available
  if (name.includes('microsoft') || name.includes('365') || name.includes('intune') || name.includes('defender') || name.includes('azure') || name.includes('bitlocker') || name.includes('mfa') || name.includes('multi-factor') || name.includes('entra')) {
    return <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
  }
  // VMware tools
  if (name.includes('vmware') || name.includes('esxi') || name.includes('vcenter') || name.includes('vmotion')) return <SiVmware style={{ color: '#607078' }} />;
  // HPE tools - use external image since SiHpe is not available
  if (name.includes('storeonce') || name.includes('hpe')) {
    return <img src="https://cdn.cs.1worldsync.com/c4/67/c46742b7-6f5e-4d10-859b-72a15d34c064.jpg" alt="HPE" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
  }
  // Kaspersky
  if (name.includes('kaspersky') || name.includes('edr')) return <SiKaspersky style={{ color: '#006d5c' }} />;
  // Veeam
  if (name.includes('veeam')) {
    return <img src="https://www.horizoniq.com/wp-content/uploads/2024/10/Veeam_main_logo_with_contor_RGB.png" alt="Veeam" style={{ width: '120%', height: '120%', objectFit: 'contain', transform: 'scale(1.2)' }} />;
  }
  // NOVEC Fire Suppression
  if (name.includes('novec') || name.includes('fire')) {
    return <img src="https://cdn-icons-png.flaticon.com/512/785/785116.png" alt="Fire Suppression" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
  }
  // Access Control
  if (name.includes('access control') || name.includes('smart access') || name.includes('biometric')) {
    return <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="Access Control" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
  }
  // Water Leak Detection
  if (name.includes('water leak') || name.includes('leak detection')) {
    return <img src="https://cdn-icons-png.flaticon.com/512/2917/2917995.png" alt="Water Leak Detection" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
  }
  // CCTV
  if (name.includes('cctv') || name.includes('monitoring system') || name.includes('surveillance')) {
    return <img src="https://cdn-icons-png.flaticon.com/512/1584/1584808.png" alt="CCTV" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
  }
  // PAM
  if (name.includes('pam') || name.includes('privileged access') || name.includes('password vault') || name.includes('session recording')) {
    return <img src="https://www.crossidentity.com/wp-content/uploads/2021/08/PAM-Main-Image-aug-500x450.png" alt="PAM" style={{ width: '120%', height: '120%', objectFit: 'contain' }} />;
  }
  // DR Site Storage
  if (name.includes('dr site') || name.includes('storage')) {
    return <img src="https://cdn-icons-png.flaticon.com/512/2344/2344147.png" alt="Storage" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
  }
  // SOC Playbooks
  if (name.includes('soc') || name.includes('playbook') || name.includes('incident response')) {
    return <img src="https://cdn-icons-png.flaticon.com/512/2913/2913033.png" alt="SOC" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
  }
  // Automated Alerting
  if (name.includes('automated') || name.includes('alert') || name.includes('reporting')) {
    return <img src="https://cdn-icons-png.flaticon.com/512/1827/1827422.png" alt="Alerting" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
  }
  // Data Loss Prevention
  if (name.includes('dlp') || name.includes('data loss prevention')) {
    return <img src="https://img.freepik.com/premium-vector/data-loss-prevention-icon-vector-image-can-be-used-risk-management_120816-116925.jpg" alt="DLP" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
  }
  // Centralized Management
  if (name.includes('centralized') || name.includes('management console')) {
    return <img src="https://cdn-icons-png.flaticon.com/512/1875/1875208.png" alt="Management" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
  }
  return null;
};

const getFileIcon = (fileName) => {
  if (!fileName) return <AiFillFile />;
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
  if (!vendorName) return null;
  const name = vendorName.toLowerCase();
  if (name.includes('aws') || name.includes('amazon')) return <FaAws style={{ color: '#FF9900' }} />; // สีส้ม AWS
  if (name.includes('stripe')) return <FaStripe style={{ color: '#008CDD' }} />; // สีฟ้า Stripe
  if (name.includes('google')) return <FaGoogle style={{ color: '#4285F4' }} />; // สีฟ้า Google
  // if (name.includes('confluent')) return <SiConfluent style={{ color: '#023AFF' }} />; // สีน้ำเงิน Confluent - SiConfluent not available
  if (name.includes('hashicorp')) return <SiHashicorp style={{ color: '#000000' }} />; // สีดำ HashiCorp
  
  // Return person icon when no specific vendor icon
  return <FiUser style={{ color: '#718096', fontSize: '20px' }} />;
};

export default function ProjectDetail() {
  const [copied, setCopied] = useState(false);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [counters, setCounters] = useState({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
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
        // Check if the value is a pure percentage number
        const percentageMatch = metric.percentage.match(/^(\d+(?:\.\d+)?)%?$/);
        
        if (percentageMatch) {
          // Only animate pure percentage numbers
          const targetValue = parseFloat(percentageMatch[1]);
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
        } else {
          // For non-percentage values (like "800,000 THB" or "120+ hours"), display as-is
          setCounters(prev => ({
            ...prev,
            [index]: metric.percentage
          }));
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

  const openLightbox = (index) => {
    setLightboxImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const navigateLightbox = (direction) => {
    if (direction === 'prev') {
      setLightboxImageIndex((prev) => 
        prev > 0 ? prev - 1 : project.projectImages.length - 1
      );
    } else {
      setLightboxImageIndex((prev) => 
        prev < project.projectImages.length - 1 ? prev + 1 : 0
      );
    }
  };

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      
      switch(e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateLightbox('prev');
          break;
        case 'ArrowRight':
          navigateLightbox('next');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, project]);

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
                      {typeof counters[index] === 'string' 
                        ? counters[index]
                        : typeof counters[index] === 'number' 
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
                        onClick={() => openLightbox(selectedImageIndex)}
                        style={{ cursor: 'pointer' }}
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
                    {project.vendors.map((vendor, index) => {
                      const vendorName = typeof vendor === 'string' ? vendor : vendor.name;
                      const vendorType = typeof vendor === 'string' ? '' : vendor.type;
                      return (
                        <div key={index} className={styles.toolItem}>
                          <div className={styles.toolIcon}>
                            {getVendorIcon(vendorName)}
                          </div>
                          <div className={styles.toolInfo}>
                            <div className={styles.toolName}>{vendorName}</div>
                            {vendorType && <div className={styles.toolDescription}>{vendorType}</div>}
                          </div>
                        </div>
                      );
                    })}
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

      {/* Lightbox Modal */}
      {lightboxOpen && project?.projectImages && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button 
            className={styles.lightboxClose}
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <FiX size={24} />
          </button>
          
          <button 
            className={styles.lightboxPrev}
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('prev');
            }}
            aria-label="Previous image"
          >
            <FiChevronLeft size={32} />
          </button>

          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img 
              src={project.projectImages[lightboxImageIndex]} 
              alt={`Project image ${lightboxImageIndex + 1}`}
              className={styles.lightboxImage}
            />
            <div className={styles.lightboxCounter}>
              {lightboxImageIndex + 1} / {project.projectImages.length}
            </div>
          </div>

          <button 
            className={styles.lightboxNext}
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('next');
            }}
            aria-label="Next image"
          >
            <FiChevronRight size={32} />
          </button>
        </div>
      )}
    </Layout>  
  );
}