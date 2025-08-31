# School Management Project

A mini Next.js project to manage school information. Users can **add new schools** and **view the list of schools**, with images, contact info, and other details.

## Features

- **Add School**: Form to enter school name, address, city, state, contact, email, and upload an image.  
- **View Schools**: Displays all schools in a responsive card layout.  
- **Responsive Design**: Works on both desktop and mobile devices.  
- **Database**: MySQL database stores all school information.  
- **Image Upload**: Stores school images in the `public/schoolImages` folder.

## Setup Instructions

1. **Clone the Repository**

`git clone https://github.com/vaishnavigaware1104/School-management.git`  
`cd School-management`

2. **Install Dependencies**

`npm install`

3. **Setup the MySQL Database**

The project requires a MySQL database to work. An SQL dump file `reno_assignment.sql` is included in the repository.  

- **Create a new database** (any name you like):

`CREATE DATABASE school_management;`

- **Import the provided SQL dump**:

`mysql -u your_username -p school_management < reno_assignment.sql`

> ⚠️ Note: The project will **not work** without importing this SQL dump, as it creates the required table and sample data.

- **Create `.env.local`** in the project root and add your database credentials:

DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=school_management


4. **Run the Project**

`npm run dev`

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the **Add School** page and can view the list of schools.

## Notes for Assessors

- The project uses **Next.js** and **react-hook-form**.  
- All images are stored in `public/schoolImages`.  
- To see the **full functionality** including data, you **must import `reno_assignment.sql`** into MySQL.  
- The project is **responsive** and works on both mobile and desktop.  
- You can see the **UI responsiveness** Vercel, but the database must be set up locally to see the actual school data.
