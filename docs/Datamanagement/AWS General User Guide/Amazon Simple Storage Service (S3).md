---
id: Amazon Simple Storage Service
title: Amazon Simple Storage Service (S3)
sidebar_label: Amazon Simple Storage Service (S3)
description: Guide for uploading and downloading files to/from Amazon S3 using AWS CLI and AWS Management Console. Includes commands, examples, and step-by-step instructions.
---

# Amazon Simple Storage Service (S3)

## 4.1. Upload/download via AWS CLI

##### 1. Open terminal, ensure AWS CLI configured, and user has access to S3.

##### 2. Run this command to upload/copy from local machine to S3.

```bash
aws s3 cp <source file> <s3 uri> --profile <profilename>
```

**Example, copy file0.txt to s3 bucket named p-gsth-dw-s3-temp:**

```bash
aws s3 cp tutorial/file0.txt s3://p-gsth-dw-s3-temp --profile <profilename>
```

![example aws s3 cp](./img/image14.png)

> **Note:** if you command return something like this, it means that the user does not have permission to upload file to s3

Check using `aws s3 ls <s3 uri> --profile <profilename>` command

![example aws s3 ls](./img/image15.png)

If want upload/copy folder that contains files/folder, add `--recursive`:

```bash
aws s3 cp <source folder> <s3 uri> --recursive --profile <profilename>
```

**Example copy entire file/folder to s3 bucket named p-gsth-dw-s3-temp:**

```bash
aws s3 cp tutorial/ s3://p-gsth-dw-s3-temp --recursive --profile <profilename>
```

![aws s3 cp recursive](./img/image16.png)

##### 3. Run this command to download file from S3 to local machine.

```bash
aws s3 cp <s3 uri> <local file> --profile <profilename>
```

**Example download from s3 to current path (can using .):**

```bash
aws s3 cp s3://p-gsth-dw-s3-temp/file0a.txt . --profile <profilename>
```

![aws s3 cp to local](./img/image17.png)

If want upload/copy folder that contains files/folder, add `--recursive`:

```bash
aws s3 cp <s3 uri> <destination> --recursive --profile <profilename>
```

**Example copy folder/files:**

```bash
aws s3 cp s3://p-gsth-dw-s3-temp/dir1/ test123/ --recursive --profile <profilename>
```

![aws s3 cp to local recursive](./img/image18.png)

## 4.2. Upload/download via AWS Management Console

##### 1. Open AWS Management Console, go to S3 page by type s3 in search bar.

![AWS search bar](./img/image19.png)

##### 2. Select the S3 Bucket by clicking it. For example, p-gsth-dw-s3-temp bucket

##### 3. To upload file/folder click the Upload button. If want to upload to specific folder can navigate to folder first or can create new folder if needed.

![AWS S3 Upload](./img/image20.png)

##### 4. Choose want upload file(s) or folder(s) by clicking the Add files or Add folder button.

![S3 Upload files and/or folder](./img/image21.png)

##### 5. After choosing the files or/and folder, the list will appear then click the Upload button.

![AWS S3 Upload](./img/image22.png)

##### 6. There will be upload message status, then click the Close button.

![AWS S3 message status](./img/image23.png)

##### 7. To download file via s3 console only select 1 file, to download multiple files must be via AWS CLI. To download file, select the file then click the Download button.

![AWS S3 download file](./img/image24.png) 