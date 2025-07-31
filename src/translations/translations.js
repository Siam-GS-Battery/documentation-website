const translations = {
  en: {
    loading: 'Loading...',
    welcomeTitle: 'Welcome to IT & Data Management',
    welcomeDescription: 'Explore our documentation, projects, and team members',
    summaryOutcomes: 'Summary Outcomes',
    summaryDescription: 'Key achievements and metrics from our projects',
    viewMore: 'View More',
    totalProjects: 'Total Projects',
    costSaving: 'Cost Saving (M)',
    timeSaving: 'Time Saving (M)',
    projectActivities: 'Projects & Activities',
    readMore: 'Read More',
    viewDetails: 'View Details',
    itTeam: 'IT Team',
    itTeamDescription: 'Meet our dedicated team of IT professionals',
    partner: 'Our Partners',
    positions: {
      asstGeneralManager: 'Asst.General Manager of Information Technology & Data Management',
      asstManager: 'Asst.Manager of Information Technology (Acting)',
      chiefITManagement: 'Chief of IT Management',
      srOfficerIT: 'Sr.Officer IT',
      dataStrategyOperation: 'Data Strategy Operation',
      itDataManagement: 'IT & Data Management',
      projectManagementOfficer: 'Project Management Officer',
      softwareEngineer: 'Software Engineer',
      aiEngineer: 'AI Engineer'
    }
  },
  th: {
    loading: 'กำลังโหลด...',
    welcomeTitle: 'ยินดีต้อนรับสู่ IT & Data Management',
    welcomeDescription: 'สำรวจเอกสาร โครงการ และสมาชิกในทีมของเรา',
    summaryOutcomes: 'สรุปผลลัพธ์',
    summaryDescription: 'ผลสำเร็จและตัวชี้วัดที่สำคัญจากโครงการของเรา',
    viewMore: 'ดูเพิ่มเติม',
    totalProjects: 'จำนวนโครงการทั้งหมด',
    costSaving: 'การประหยัดต้นทุน (ล้าน)',
    timeSaving: 'การประหยัดเวลา (ล้าน)',
    projectActivities: 'โครงการและกิจกรรม',
    readMore: 'อ่านเพิ่มเติม',
    viewDetails: 'ดูรายละเอียด',
    itTeam: 'ทีมไอที',
    itTeamDescription: 'พบกับทีมงานมืออาชีพด้านไอทีของเรา',
    partner: 'พันธมิตรของเรา',
    positions: {
      asstGeneralManager: 'ผู้ช่วยผู้จัดการทั่วไป ฝ่ายเทคโนโลยีสารสนเทศและการจัดการข้อมูล',
      asstManager: 'ผู้ช่วยผู้จัดการ ฝ่ายเทคโนโลยีสารสนเทศ (รักษาการ)',
      chiefITManagement: 'หัวหน้าแผนกจัดการไอที',
      srOfficerIT: 'เจ้าหน้าที่อาวุโส ฝ่ายไอที',
      dataStrategyOperation: 'ปฏิบัติการกลยุทธ์ข้อมูล',
      itDataManagement: 'การจัดการไอทีและข้อมูล',
      projectManagementOfficer: 'เจ้าหน้าที่บริหารโครงการ',
      softwareEngineer: 'วิศวกรซอฟต์แวร์',
      aiEngineer: 'วิศวกรปัญญาประดิษฐ์'
    }
  }
};

export function getTranslation(language, key) {
  const keys = key.split('.');
  let translation = translations[language];
  
  for (const k of keys) {
    if (translation && translation[k]) {
      translation = translation[k];
    } else {
      return key; // Return the key if translation is not found
    }
  }
  
  return translation;
} 