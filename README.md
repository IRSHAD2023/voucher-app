# Voucher App

## Overview

The Voucher App is a simple web application that allows users to log in and manage vouchers. This app enables generating QR codes for vouchers, exporting them to PDF format, and offers basic settings for the application. It's built using **Node.js**, **Express.js**, **EJS**, and **PostgreSQL** for the back end, and it's deployed on **Render**.

## Features

- **User Authentication**: Secure login page to access the dashboard.
- **Voucher Generation**: Create a voucher with a unique QR code.
- **PDF Export**: Generate and download a PDF for the voucher.
- **Settings**: Modify the application settings such as expiry time, dimensions, and font sizes.
- **Responsive UI**: Clean and responsive user interface for both mobile and desktop views.

## Technologies Used

- **Frontend**: EJS, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **QR Code Generation**: `qrcode` package
- **PDF Generation**: `pdfkit` package
- **Session Management**: `express-session` for secure login

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/IRSHAD2023/voucher-app.git
Navigate to the Project Folder:

bash
Copy
Edit
cd voucher-app
Install Dependencies:

bash
Copy
Edit
npm install
Set Up Environment Variables: Create a .env file in the root directory with the following configuration:

makefile
Copy
Edit
DB_USER=your_postgresql_user
DB_PASSWORD=your_postgresql_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
SESSION_SECRET=your_secret_key
Start the Application:

bash
Copy
Edit
npm start
The app will run on http://localhost:3000 by default.

Deployment
The app is deployed on Render. You can view it live by visiting:

https://voucher-app.onrender.com/
