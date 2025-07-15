---
sidebar_position: 5
---

# วิธีการเพิ่มภาพในโปรเจก

คู่มือการเพิ่มและแสดงภาพในโปรเจก Docusaurus

## ตำแหน่งที่แนะนำสำหรับเก็บภาพ

### 1. ภาพสำหรับใช้ทั่วทั้งเว็บไซต์
เก็บใน `static/img/` - ภาพเหล่านี้จะสามารถเข้าถึงได้จากทุกที่ในเว็บไซต์

### 2. ภาพสำหรับเอกสารเฉพาะ
เก็บใน `docs/images/` - ภาพที่ใช้เฉพาะในเอกสารนั้นๆ

### 3. ภาพสำหรับ Blog
เก็บใน `blog/[post-name]/images/` - ภาพที่ใช้เฉพาะใน blog post

### 4. ภาพสำหรับ Components
เก็บใน `src/assets/` - ภาพที่ใช้ใน React components

## วิธีการแสดงภาพใน Markdown

### วิธีที่ 1: ใช้ภาพจาก static/img/

```markdown
![Docusaurus Logo](/img/docusaurus.png)
```

![Docusaurus Logo](/img/docusaurus.png)

### วิธีที่ 2: ใช้ภาพที่อยู่ใกล้กับไฟล์ markdown

```markdown
![Project Screenshot](./images/project-screenshot.png)
```

### วิธีที่ 3: ใช้ภาพจาก src/assets/ (สำหรับ MDX)

```jsx
import myImage from '@site/src/assets/ai1.png';

<img src={myImage} alt="AI Technology" style={{width: '300px'}} />
```

import myImage from '@site/src/assets/ai1.png';

<img src={myImage} alt="AI Technology" style={{width: '300px'}} />

## ตัวอย่างการใช้งานภาพใน Blog

สำหรับ blog post สามารถเก็บภาพไว้ในโฟลเดอร์เดียวกับไฟล์ markdown:

```markdown
![Blog Image](./docusaurus-plushie-banner.jpeg)
```

## เคล็ดลับการจัดการภาพ

1. **ใช้ชื่อไฟล์ที่สื่อความหมาย** - เช่น `project-screenshot.png`, `user-interface.jpg`

2. **เลือกขนาดไฟล์ที่เหมาะสม** - ใช้ภาพที่มีขนาดไม่ใหญ่เกินไปเพื่อให้เว็บไซต์โหลดเร็ว

3. **ใช้รูปแบบไฟล์ที่เหมาะสม**:
   - `.png` - สำหรับภาพที่มีพื้นหลังโปร่งใส
   - `.jpg` - สำหรับภาพถ่าย
   - `.svg` - สำหรับไอคอนและกราฟิก

4. **เพิ่ม alt text** - เพื่อการเข้าถึงที่ดีขึ้น

## ตัวอย่างการจัดระเบียบโฟลเดอร์

```
my-website/
├── static/
│   └── img/
│       ├── logo.png
│       └── banner.jpg
├── docs/
│   ├── images/
│   │   ├── tutorial-screenshot.png
│   │   └── diagram.svg
│   └── tutorial.md
├── blog/
│   └── 2024-01-01-my-post/
│       ├── index.md
│       └── images/
│           └── post-image.jpg
└── src/
    └── assets/
        └── component-image.png
``` 