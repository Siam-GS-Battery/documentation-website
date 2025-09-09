---
id: How to Setting Dashboard
title: How to Setting Dashboard
sidebar_label: How to Setting Dashboard
description: Comprehensive guide for configuring and customizing the AWS QuickSight Production Planning Dashboard. This document covers visual modifications, color settings, and parameter configurations for stock targets and MOS (Months of Supply) settings.
---

# How to Setting Dashboard

Comprehensive guide for configuring and customizing the AWS QuickSight Production Planning Dashboard. This document covers visual modifications, color settings, and parameter configurations for stock targets and MOS (Months of Supply) settings.

## 3.1 Change Title and Subtitle

To modify the title or subtitle of a visual in AWS QuickSight, please follow the steps below:

1. **Select the visual** you wish to edit. Once selected, a small toolbar will appear in the top-right corner of the chart.
2. **Click on 'Format visual' button** (📊). This will open the Properties panel on the right side of the screen.

![Figure 6. Properties icon](./img/image(6).png)

3. In the **Display setting** section, click the brush icon (🖌️) next to the Title or Subtitle that you wish to change, as shown in Figure 8.

![Figure 8. Edit title of visual](./img/image(8).png)

4. A pop-up will appear, as the Figure 9, allowing you to edit the visual's title as desired.

![Figure 9. Title edition popup](./img/image(9).png)

## 3.2 Change Color of Data Series

1. **Click the visual** to activate the toolbar.
2. **Right click on the data series** that needs to change, as shown in the Figure 8

![Figure 8. Change data series color](./img/image(10).png)

3. **Click on the color icon** next to the series you want to change.
4. **Choose a new color** from the palette or input a custom color code.

## 3.3 Setting Stock Target and MOS

1. **Click the parameter** activate the toolbar, as shown in the Figure 11.

![Figure 11. Parameter panel](./img/image(11).png)

2. **Search for Target** on the parameter panel, as shown in the Figure 12. And for the definition of parameter, you could see more details on the table below

![Figure 12. Search parameter](./img/image(12).png)

### Parameter Definition Table

| No. | Parameter | Type | Market | Batt. | Description |
|-----|-----------|------|---------|--------|-------------|
| 1 | 0011TotalAllMosMax | Mos | All | All | Max Mos of all market and all battery type. |
| 2 | 0011TotalAllMosTarget | Mos | All | All | Target Mos of all market and all battery type. |
| 3 | 0012TotalAllMosMin | Mos | All | All | Min Mos of all market and all battery type. |
| 4 | 0021TotalAllStockMax | Stock | All | All | Max stock of all market and all battery type. |
| 5 | 0022TotalAllStockTarget | Stock | All | All | Target stock of all market and all battery type. |
| 6 | 0023TotalAllStockMin | Stock | All | All | Min stock of all market and all battery type. |
| 7 | 0111TotalREMMosMax | Mos | REM | All | Max Mos of REM market for all battery type. |
| 8 | 0112TotalREMMosTarget | Mos | REM | All | Target Mos of REM market for all battery type. |
| 9 | 0113TotalREMMosMin | Mos | REM | All | Min Mos of REM market for all battery type. |
| 10 | 0121TotalREMStockMax | Stock | REM | All | Max stock of REM market for all battery type. |
| 11 | 0122TotalREMStockTarget | Stock | REM | All | Target stock of REM market for all battery type. |
| 12 | 0123TotalREMStockMin | Stock | REM | All | Min stock of REM market for all battery type. |
| 13 | 0211TotalOEMMosMax | Mos | OEM | All | Max Mos of OEM market for all battery type. |
| 14 | 0212TotalOEMMosTarget | Mos | OEM | All | Target Mos of OEM market for all battery type. |
| 15 | 0213TotalOEMMosMin | Mos | OEM | All | Min Mos of OEM market for all battery type. |
| 16 | 0221TotalOEMStockMax | Stock | OEM | All | Max stock of OEM market for all battery type. |
| 17 | 0222TotalOEMStockTarget | Stock | OEM | All | Target stock of OEM market for all battery type. |
| 18 | 0223TotalOEMStockMin | Stock | OEM | All | Min stock of OEM market for all battery type. |
| 19 | 0311TotalEXPMosMax | Mos | EXP | All | Max Mos of EXP market for all battery type. |
| 20 | 0312TotalEXPMosTarget | Mos | EXP | All | Target Mos of EXP market for all battery type. |
| 21 | 0313TotalEXPMosMin | Mos | EXP | All | Min Mos of EXP market for all battery type. |
| 22 | 0321TotalEXPStockMax | Stock | EXP | All | Max stock of EXP market for all battery type. |
| 23 | 0322TotalEXPStockTarget | Stock | EXP | All | Target stock of EXP market for all battery type. |
| 24 | 0323TotalEXPStockMin | Stock | EXP | All | Min stock of EXP market for all battery type. |
| 25 | 1011FGAllMosMax | Mos | All | FG | Max Mos of all market for FG |
| 26 | 1012FGAllMosTarget | Mos | All | FG | Target Mos of all market for FG |
| 27 | 1013FGAllMosMin | Mos | All | FG | Min Mos of all market for FG |
| 28 | 1021FGStockMax | Stock | All | FG | Max stock of all market for FG |
| 29 | 1022FGStockTarget | Stock | All | FG | Target stock of all market for FG |
| 30 | 1023FGStockMin | Stock | All | FG | Min stock of all market for FG |
| 31 | 1112FGREMMosTarget | Mos | REM | FG | Target Mos of REM market for FG |
| 32 | 1121FGREMStockMax | Stock | REM | FG | Max stock of REM market for FG |
| 33 | 1122FGREMStockTarget | Stock | REM | FG | Target stock of REM market for FG |
| 34 | 1123FGREMStockMin | Stock | REM | FG | Min stock of REM market for FG |
| 35 | 1212FGOEMMosTarget | Mos | OEM | FG | Target Mos of OEM market for FG |
| 36 | 1221FGOEMStockMax | Stock | OEM | FG | Max stock of OEM market for FG |
| 37 | 1222FGOEMStockTarget | Stock | OEM | FG | Target stock of OEM market for FG |
| 38 | 1223FGOEMStockMin | Stock | OEM | FG | Min stock of OEM market for FG |
| 39 | 1312FGEXPMosTarget | Mos | EXP | FG | Target Mos of EXP market for FG |
| 40 | 1321FGEXPStockMax | Stock | EXP | FG | Max stock of EXP market for FG |
| 41 | 1322FGEXPStockTarget | Stock | EXP | FG | Target stock of EXP market for FG |
| 42 | 1323FGEXPStockMin | Stock | EXP | FG | Min stock of EXP market for FG |
| 43 | 2011UNCAllMosMax | Mos | All | UNC | Max Mos of all market for Uncharge |
| 44 | 2012UNCAllMosTarget | Mos | All | UNC | Target Mos of all market for Uncharge |
| 45 | 2013UNCAllMosMin | Mos | All | UNC | Min Mos of all market for Uncharge |
| 46 | 2021UNCAllStockMax | Stock | All | UNC | Max stock of all market for Uncharge |
| 47 | 2022UNCAllStockTarget | Stock | All | UNC | Target stock of all market for Uncharge |
| 48 | 2023UNCAllStockMin | Stock | All | UNC | Min stock of all market for Uncharge |
| 49 | 2112UNCREMMosTarget | Mos | REM | UNC | Target Mos of REM market for Uncharge |
| 50 | 2121UNCREMStockMax | Stock | REM | UNC | Max stock of REM market for Uncharge |
| 51 | 2122UNCREMStockTarget | Stock | REM | UNC | Target stock of REM market for Uncharge |
| 52 | 2123UNCREMStockMin | Stock | REM | UNC | Min stock of REM market for Uncharge |
| 53 | 2212UNCOEMMosTarget | Mos | OEM | UNC | Target Mos of OEM market for Uncharge |
| 54 | 2221UNCOEMStockMax | Stock | OEM | UNC | Max stock of OEM market for Uncharge |
| 55 | 2222UNCOEMStockTarget | Stock | OEM | UNC | Target stock of OEM market for Uncharge |
| 56 | 2223UNCOEMStockMin | Stock | OEM | UNC | Min stock of OEM market for Uncharge |
| 57 | 2312UNCEXPMosTarget | Mos | EXP | UNC | Target Mos of EXP market for Uncharge |
| 58 | 2321UNCEXPStockMax | Stock | EXP | UNC | Max stock of EXP market for Uncharge |
| 59 | 2322UNCEXPStockTarget | Stock | EXP | UNC | Target stock of EXP market for Uncharge |
| 60 | 2323UNCEXPStockMin | Stock | EXP | UNC | Min stock of EXP market for Uncharge |

3. Then **click on the 3 point button** to show pop-up window, then select **'Edit parameter'** as the Figure 13.

![Figure 13. Edit parameter](./img/image(13).png)

4. Then **edit the target** in each visual on the dashboard and click **update button** as shown in the Figure 14.

![Figure 14. Update parameter](./img/image(14).png)