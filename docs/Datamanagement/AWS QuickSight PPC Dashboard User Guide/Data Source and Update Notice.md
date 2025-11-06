---
id: Data Source and Update Notice
title: Data Source & Update Notice
sidebar_label: Data Source & Update Notice
description: Guidelines for data source management and update procedures for the Production Planning Dashboard. This document provides information about related Excel files, naming conventions, and the process for updating data in the dashboard system.
---

# Data Source & Update Notice

Guidelines for data source management and update procedures for the Production Planning Dashboard. This document provides information about related Excel files, naming conventions, and the process for updating data in the dashboard system.

## 2.1 Related Documents

As there is a requirement to update certain data from Excel files into the database, the following is a list of related documents used in the dashboard. Please ensure that the file naming format follows the guidelines specified below.

### Document of Battery Stock & Production Dashboard

| No | Excel Files | Example |
|----|-------------|---------|
| 1 | LEAD-SHEET-CAP-and-Sales-Rolling-N12 | LEAD-SHEET-CAP-and-Sales-Rolling-N12.xlsx |
| 2 | PLATE-MASTERLIST_`{YYYYMMDD-Rev No.}` | PLATE-MASTERLIST_20250301-1.xlsx |
| 3 | PLATE-TARGET-FY`{YYYY-Rev No.}` | PLATE-TARGET-FY2025-1.xlsx |
| 4 | PLATE-CAP-and-Sales-Rolling-N12 | PLATE-CAP-and-Sales-Rolling-N12.xlsx |
| 5 | STOCK-CAP-and-Sales-Rolling-N12_Rev`{Rev No.}` | STOCK-CAP-and-Sales-Rolling-N12_Rev1.xlsx |
| 6 | PLAN-AMB-`{MMM-YYYY-No}` | PLAN-AMB-JUN-2025-1.xlsx |
| 7 | STOCK-TARGET-FY`{YYYY}`-Rev`{Rev No.}` | STOCK-TARGET-FY2025-Rev-1.xlsx |

## 2.2 How to Update Document

To ensure the dashboard reflects the most recent data, you are required to submit updated documents to the Data Engineer. Please follow the steps below:

1. **Update your Excel files** and save them using the files naming format described in section 2.1
2. **Send the updated files** to data engineer via email. Use the following subject line format:
   `[MVP Dashboard] Update Excel files-` `{MMM_YYYY}` (e.g., [MVP Dashboard] Update Excel Files-Jul 2025)
3. **After receiving confirmation**, you may view the updated data on your dashboard.