---
id: Business as Usual Operation
title: Business as Usual Operation
sidebar_label: Business as Usual Operation
description: Guide for business as usual operations including Excel file preparation, processing, Redshift cluster management, and data pipeline operations.
---

# Business as Usual Operation

## 7.1. Preparing Excel File

### Prerequisites:

1. Excel file for the system 
2. Access to the AWS account of GS

One of the data sources for current dashboard on QuickSight is manually processed Excel file. List of Excel files that were processed as of now was as follows:

a. `PLAN-AMB-{MMM}-{YYYYY}-{REV No.}.xlsx` 
b. `STOCK-TARGET-FY{YYYY}_Rev{REV No.}.xlsx` 
c. `CAP-And-Sales-Rolling_N12.xlsx` 
d. `PLATE-TARGET-FY{YYYY}.xlsx`
e. `PLATE-MASTERLIST_{YYYYMMDD}.xlsx`
f. `PLATE CAP and Sales Rolling N12.xlsx`
g. `LEAD SHEET CAP and Sales Rolling N12.xlsx`

This excel file will need to be uploaded into S3 bucket that has been configured during the project implementation which is available at the `p-gsth-dw-s3-data`:

![S3 bucket structure](./img/image47.png)

And compiled on the Excel folder:

![Excel folder structure](./img/image48.png)

Each of the corresponding Excel files also has their own folder on the S3 location to be uploaded to for further processing of said file. 

| No | S3 Folder | Excel File |
|----|-----------|------------|
| 1 | `lead_sheet_production` | `LEAD-SHEET-CAP-and-Sales-Rolling-N12.xlsx` |
| 2 | `material_aging_plate_masterlist` | `PLATE-MASTERLIST.xlsx` |
| 3 | `material_aging_plate_target` | `PLATE-TARGET-FY{YYYY}_Rev{RevNo.}.xlsx` |
| 4 | `plate_production` | `PLATE-CAP-and-Sales-Rolling-N12.xlsx` |
| 5 | `production_battery` | `STOCK-CAP-and-Sales-Rolling-N12_Rev1.xlsx` |
| 6 | `stock_plan` | `PLAN-AMB-{MMM}-{YYYYY}-{REVNo.}.xlsx` |
| 7 | `stock_target` | `STOCK-TARGET-FY{YYYY}_Rev{RevNo.}.xlsx` |

Before uploading the file however, there's a step that needs to be done to prepare the file:

### Processing `LEAD-SHEET-CAP-and-Sales-Rolling-N12.xlsx`:

a. **Open the Excel File:**

![Open Excel file](./img/image49.png)

b. **On the Sheet Forecast plate, copy the data into Sheet Processing Forecast:**

![Copy data to Processing Forecast](./img/image50.png)
![Copy data to Processing Forecast](./img/image51.png)

c. **Open Data toolbar, and select Queries & Connections:**

![Data toolbar](./img/image52.png)

d. **Refresh the Reference Forecast table:**

![Refresh Reference Forecast](./img/image53.png)

e. **Copy Data from Sheet CAP and copy the data to the Sheet Processing CAP:**

![Copy CAP data](./img/image54.png)
![Copy CAP data](./img/image55.png)

f. **On the Queries & Connection, refresh the Reference CAP tables:**

![Refresh Reference CAP](./img/image56.png)

g. **Save the excel file and upload it to folder `excel/lead_sheet_production`:**

![Upload to lead_sheet_production](./img/image57.png)

### Processing Excel File `PLATE-MASTERLIST.xlsx`:

a. **Open the Excel File:**

![Open PLATE-MASTERLIST](./img/image58.png)

b. **Make sure the data is already updated**

c. **Save the excel file and upload it to folder `excel/material_aging_plate_masterlist`:**

![Upload to material_aging_plate_masterlist](./img/image59.png)

### Processing Excel File `PLATE-TARGET-FY{YYYY}_Rev{RevNo.}.xlsx`

a. **Open the Excel File:**

![Open PLATE-TARGET](./img/image60.png)

b. **Make sure the data is already updated**
c. **Save the excel file and upload it to folder `excel/material_aging_plate_target`:**

![Upload to material_aging_plate_target](./img/image61.png)

### Processing Excel File `PLATE-CAP-and-Sales-Rolling-N12.xlsx`:

a. **Open the Excel File:**

![Open PLATE-CAP](./img/image62.png)

b. **On the Sheet Forecast plate, copy the data to the Sheet Processing Forecast:**

![Copy Forecast data](./img/image63.png)
![Copy Forecast data](./img/image64.png)

c. **Open Data toolbar, and select Queries & Connections:**

![Data toolbar](./img/image65.png)

d. **Refresh the Reference Forecast tables:**

![Refresh Reference Forecast tables](./img/image66.png)

e. **On the Sheet CAP, copy the data to the Sheet Processing CAP:**

![Copy CAP data to Processing](./img/image67.png)
![Refresh Reference CAP tables](./img/image68.png)

f. **On the Queries & Connection, refresh the Reference CAP tables:**

![Refresh Reference CAP tables](./img/image69.png)

g. **Save the excel file and upload it to folder `excel/plate_production`:**

![Upload to plate_production](./img/image70.png)

### Processing Excel File `STOCK-CAP-and-Sales-Rolling-N12_Rev1.xlsx`:

a. **Open the Excel File:**

![Open STOCK-CAP](./img/image71.png)

b. **On the Sheet Sale DATA_FORECAST FY2025, copy the data to the Sheet Processing Data Forcast:**

![Copy Forecast data](./img/image72.png)
![Copy Forecast data](./img/image73.png)

c. **Open Data toolbar, and select Queries & Connections:**

![Data toolbar](./img/image74.png)

d. **Refresh the Reference Forecast tables:**

![Refresh Reference Forecast tables](./img/image75.png)

e. **On the Sheet CAP, copy the data to the Sheet Processing Cap:**

![Copy CAP data](./img/image76.png)
![Copy CAP data](./img/image77.png)

f. **On the Queries & Connection, refresh the Reference CAP tables:**

![Refresh Reference CAP tables](./img/image78.png)

g. **Save the excel file and upload it to folder `excel/production_battery`:**

![Upload to production_battery](./img/image79.png)

### Processing Excel File `PLAN-AMB-{MMM}-{YYYYY}-{REVNo.}.xlsx`

a. **Open the Excel File:**

![Open PLAN-AMB](./img/image80.png)

b. **On the Sheet Processing OEM, copy the data to the Sheet Processing Table section OEM:**

![Copy OEM data](./img/image81.png)
![Copy OEM data](./img/image82.png)

c. **On the Sheet Processing EXP, copy the data to the Sheet Processing Table section EXP:**

![Copy EXP data](./img/image83.png)
![Copy REM data](./img/image84.png)

d. **On the Sheet Processing REM, copy the data to the Sheet Processing Table section REM:**

![Copy REM data](./img/image85.png)
![Copy REM data](./img/image86.png)

e. **Open Data toolbar, and select Queries & Connections:**

![Data toolbar](./img/image87.png)

f. **Refresh all the available tables on the connection:**

![Refresh all tables](./img/image88.png)
![Refresh all tables](./img/image89.png)
![Refresh all tables](./img/image90.png)

g. **Save the excel file and upload it to folder `excel/stock_plan`:**

![Upload to stock_plan](./img/image91.png)

### Processing Excel File `STOCK-TARGET-FY{YYYY}_Rev{RevNo.}.xlsx`:

a. **Open the Excel File:**

![Open STOCK-TARGET](./img/image92.png)

b. **On the Sheet Forecast plate, copy the data to the Sheet Processing Forecast:**

![Copy Forecast data](./img/image93.png)
![Copy Forecast data](./img/image94.png)

c. **Open Data toolbar, and select Queries & Connections:**

![Data toolbar](./img/image95.png)

d. **Refresh the Reference Forecast tables:**

![Refresh Reference Forecast tables](./img/image96.png)

e. **On the Sheet CAP, copy the data to the Sheet Processing CAP:**

![Copy CAP data](./img/image97.png)
![Copy CAP data](./img/image98.png)

f. **On the Queries & Connection, refresh the Reference CAP tables:**

![Refresh Reference CAP tables](./img/image99.png)

g. **Save the excel file and upload it to folder `excel/stock_target`:**

![Upload to stock_target](./img/image100.png)

## 7.2. Processing for the Excel File

Upon uploading the excel files into each of the S3 locations has been finished, processing result can be found on the folder `processed` on the same S3 bucket:

![Processed folder](./img/image101.png)

Each of the excel files that has been processed will be stored here with the naming conventions as `"ExcelFileName"-"SheetName"`:

![Processed files naming](./img/image102.png)

Current configuration is setting up each of the folders available on the S3 to be available on a Table format on Redshift. This configuration is setting up each folder as a directory for an External Table on Redshift, available on the AWS Glue Data Catalog:

![AWS Glue Data Catalog](./img/image103.png)

## 7.3. Initiating Redshift Cluster

Redshift Cluster currently is set to be available on working days and working hours only to further save cost on the Cloud Consumption. This schedule is managed by AWS EventBridge and AWS Lambda. AWS EventBridge is used to set the scheduler for starting and stopping the Redshift cluster and AWS Lambda is the executor for starting and stopping the Redshift cluster. 

Configuration for this can be found on the AWS Lambda `p-gsth-lambda-redshift-cluster-initiator`:

![Lambda redshift cluster initiator](./img/image104.png)

The schedule is currently set to be started and stopped at:
- **7.15 AM GMT+7** or **0.15 AM GMT+0**
- **17.00 AM GMT+7** or **10.00 AM GMT+0**

![Redshift console](./img/image105.png)

Outside of the scheduler that has been set, Redshift can be started manually by resuming the Redshift cluster via the Console:



1. **Open the Redshift console:**

![Redshift cluster](./img/image106.png)

2. **Open the Redshift Cluster ID `p-gsth-dw-redshift`:**

![Redshift cluster](./img/image107.png)

3. **Open the action button on the top right of the screen:**

![Action button](./img/image108.png)

4. **Select the action resume:**

![Resume action](./img/image109.png)

5. **Wait for the cluster status to be Available:**

![Cluster available](./img/image110.png)

<!-- Outside of the scheduler that has been set, Redshift can also be stopped manually by pausing the Redshift cluster via the Console:

1. **Open the Redshift console:**

![Redshift console](./img/Screenshot 2025-07-18 103545.png)

1. **Open the Redshift Cluster ID `p-gsth-dw-redshift`:**

![Redshift cluster](./img/Screenshot 2025-07-18 103604.png)

3. **Open the action button on the top right of the screen:**



4. **Select the Pause resume:**

![Pause action](./img/Screenshot 2025-07-18 103706.png)

5. **Wait for the cluster status to be Stopped:**

![Cluster stopped](./img/Screenshot 2025-07-18 103721.png) -->

## 7.4. Processing for the Redshift Table:

Processing for Redshift table can be run automatically by scheduler and by manual process also. Automatically, the process is set to be run by scheduler set on AWS EventBridge and AWS Lambda. The processing configuration can be found on the Lambda `p-gsth-lambda-dms-task-initiator`:

![Lambda DMS task initiator](./img/image111.png)

Automatic process configuration by schedule can be found on here:

![Automatic process schedule](./img/image112.png)

Schedule is currently being set to run at:
- **7.32AM GMT+7** or **0.32AM GMT+0**
- **12.00AM GMT+7** or **5.00AM GMT+0**

Manual process configuration can be found here:

![Manual process configuration](./img/image113.png)

To execute the process manually, user can upload a `.json` file into a directory `s3://p-gsth-dw-s3-data/control/`:

![Control directory](./img/image114.png)

Example for the `.json` file can be found here:

```json
{
  "uploader_name": "Aldi Christy - Data Engineer"
}
``` 