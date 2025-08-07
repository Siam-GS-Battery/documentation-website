# Content Submission Guide

## การเพิ่มเอกสารใหม่

### วิธีการง่ายๆ

1. **เพิ่มเอกสารใน `src/data/simple.json`**
```json
{
  "id": "6",
  "title": "AWS S3 Best Practices",
  "description": "Learn best practices for using Amazon S3 storage service",
  "categories": ["datamanagement"],
  "division": "datamanagement",
  "path": "Datamanagement/AWS General User Guide/S3 Best Practices"
}
```

### ระบบจัดหมวดหมู่อัตโนมัติ

ระบบจะจัดหมวดหมู่เอกสารให้อัตโนมัติตามกฎที่กำหนดไว้:

#### 1. การจัดหมวดหมู่ตามคำสำคัญ (Keywords)
- **AWS, S3, EC2, Redshift, QuickSight, CLI** → `["datamanagement", "cloud"]`
- **Database, Data** → `["datamanagement"]`
- **Security** → `["security"]`
- **Infrastructure** → `["infrastructure"]`
- **Business** → `["business"]`
- **AI, Machine Learning, ML** → `["ai"]`

#### 2. การจัดหมวดหมู่ตาม Path
- **Datamanagement/** → `["datamanagement"]`
- **Itmanagement/** → `["itmanagement"]`
- **Itdevelopment/** → `["itdevelopment"]`
- **markdown-create/** → `["markdown"]`

### ตัวอย่างการใช้งาน

#### ตัวอย่างที่ 1: เอกสาร AWS
```json
{
  "id": "7",
  "title": "AWS EC2 Instance Management",
  "description": "Guide for managing EC2 instances",
  "path": "Datamanagement/AWS/EC2 Management"
}
```
**ผลลัพธ์อัตโนมัติ:**
- Categories: `["datamanagement", "cloud"]`
- Division: `"datamanagement"`

#### ตัวอย่างที่ 2: เอกสาร Security
```json
{
  "id": "8",
  "title": "Network Security Protocols",
  "description": "Learn about security protocols for network protection",
  "path": "Security/Network"
}
```
**ผลลัพธ์อัตโนมัติ:**
- Categories: `["security"]`
- Division: `"it-data"`

#### ตัวอย่างที่ 3: เอกสาร AI
```json
{
  "id": "9",
  "title": "Machine Learning Models",
  "description": "Introduction to ML models and algorithms",
  "path": "AI/ML Models"
}
```
**ผลลัพธ์อัตโนมัติ:**
- Categories: `["ai"]`
- Division: `"it-data"`

### การเพิ่มกฎใหม่

หากต้องการเพิ่มกฎใหม่ ให้แก้ไขใน `src/data/simple.json`:

```json
"categorizationRules": {
  "keywords": {
    "NewKeyword": ["category1", "category2"]
  },
  "pathMappings": {
    "NewPath": ["category1"]
  }
}
```

### ข้อดีของระบบนี้

1. **ไม่ต้องเขียนโค้ดใหม่** - เพียงเพิ่มเอกสารใน JSON
2. **จัดหมวดหมู่อัตโนมัติ** - ระบบจะจัดหมวดหมู่ให้เอง
3. **ยืดหยุ่น** - สามารถกำหนดกฎใหม่ได้ง่าย
4. **รองรับหลายหมวดหมู่** - เอกสารหนึ่งสามารถอยู่ในหลายหมวดหมู่ได้
5. **ง่ายต่อการบำรุงรักษา** - จัดการได้จากไฟล์ JSON เดียว 