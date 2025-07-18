---
id: redshift
title: Redshift
description: Guide for connecting to Amazon Redshift using DB clients and AWS Console
sidebar_label: Redshift
---

# Redshift

## 6.1. Connect Redshift via DB Client

### Prerequisites

- **DB client** (e.g., DBeaver)
- **Network access** to office network

### Steps

1. **Open DB client** (in this example, DBeaver).

2. **Create a new connection**: Search for "Redshift" then click **Next**.

   ![DBeaver create new connection](./img/image29.png)

3. **Fill in the connection details**:
   - URL
   - Username  
   - Password
   
   > **Note:** Redshift credentials will be shared separately.

   ![Fill URL, username, and password](./img/image30.png)

4. **Test the connection** by clicking the **Test Connection** button.

   > **Note:** For the first time, DBeaver needs to install the Redshift driver. Click **Download** when prompted.

   ![Download Redshift driver](./img/image31.png)

5. **Verify successful connection** - A popup will appear confirming the connection is successful.

   ![Successfully test connection](./img/image32.png)

6. Click **OK** then click **Finish**.

7. **View the connected database** - You will see the page after successfully connecting to Redshift.

   ![After successfully connected to Redshift](./img/image33.png)

---

### Troubleshooting: Database Visibility

If the database is not showing or only showing the `dev` database:

1. **Right-click on the connection**, then click **Edit Connection**.

   ![Only dev database visible](./img/image32.png)

2. **Check the "Show all databases" checkbox**, then click **OK**. 
   
   When prompted to reconnect, click **Yes**.

   ![Show all databases option](./img/image33.png)

---

8. **Run queries** to test your connection.

   ![Query Redshift on DBeaver](./img/image34.png)

---

## 6.2. Connect Redshift via AWS Console

### Steps

1. **Access AWS Console** and navigate to Redshift.

   ![AWS Console search bar](./img/image35.png)

2. **Expand the Redshift menu** by clicking the expand button on the upper left.

   ![Redshift expand menu](./img/image36.png)

3. **Open Query Editor v2** by clicking on it.

   ![Redshift Query Editor v2](./img/image37.png)

4. **Expand the query editor** interface.

   ![Redshift Query Editor v2 page](./img/image38.png)

5. **Create a connection** by filling in:
   - Database name
   - Username
   - Password
   
   Then click the **Create connection** button.

   ![Credentials for Redshift Query Editor v2](./img/image39.png)

6. **Select database** - After successfully logging in, you can choose the database by expanding the menu on the left.

   ![After successfully login](./img/image40.png)

7. **Execute queries** - Write your query and click the **Run** button.

   ![Query on Redshift Query Editor v2](./img/image41.png)
