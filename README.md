weabthon - E-commerce Platform
Project Overview
weabthon is a developing e-commerce platform designed to facilitate online shopping for customers and product selling for businesses. It includes robust authentication flows for different user types (customers, companies, and administrators), with a focus on Indian-specific verification mechanisms like Aadhaar, PAN, and GSTIN. The platform aims to provide a clean, minimalist design and responsive user experience.

Features
Core Platform
Modern & Responsive UI: Clean, minimalist design adapting to various screen sizes.
Product Categories: Display of various product categories for easy navigation.
Product Card Component: Reusable component for displaying individual product details.
Authentication & User Management
Customer Signup & Login: Standard customer authentication with email/password.
Aadhaar OTP Verification (for Customers):
Mandatory OTP-based Aadhaar verification during customer signup.
Simulated UIDAI integration for OTP generation and verification.
Strict backend enforcement: No account creation without successful Aadhaar authentication.
Company Signup & Login: Dedicated authentication for businesses.
PAN & GSTIN Verification (for Companies):
Required PAN and GSTIN input and client-side validation during company signup.
Specific formatting and validation rules for Indian PAN (10-char alphanumeric) and GSTIN (15-char).
Admin Signup & Login: Separate portal for administrators with elevated privileges.
Uses a secret admin code for initial signup (simulated).
Provides access to an Admin Dashboard for management.
Admin Portal (Simulated)
Admin Dashboard: Placeholder for managing customer and company accounts.
Customer Management: Simulated display of customer list with a 'Delete' action.
Company Management: Simulated display of company list with a 'Delete' action.
Role-Based Access Control (RBAC): Conceptualized backend architecture to securely manage admin powers.
Technologies Used
Frontend: React.js
Styling: Tailwind CSS v4
Routing: React Router DOM
Build Tool: Vite
Development Environment: Node.js, npm/yarn
Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Make sure you have Node.js (which includes npm) or Yarn installed.

Node.js
Yarn (Optional)
Installation
Clone the repository:

git clone https://github.com/YOUR_USERNAME/weabthon.git
cd weabthon
(Note: Replace YOUR_USERNAME with your GitHub username)

Install dependencies:

npm install
# OR
yarn install
Run the development server:

npm run dev
# OR
yarn dev
The application should now be running at http://localhost:5173 (or another port if 5173 is in use).

Admin Portal Access
To access the administrator features:

Navigate to the Home Page: Open http://localhost:5173 in your browser.
Find the Admin Login Link: Scroll to the footer of the home page and click on the "Admin Login" link.
Login with Demo Credentials:
Username: admin
Password: adminpass
Upon successful login, you will be redirected to the Admin Dashboard (/admin/dashboard).

Aadhaar & Business Verification Notes
Aadhaar Verification: The current implementation for customer signup uses simulated OTP generation and verification. For a production environment, you would integrate with UIDAI's official APIs. Refer to AADHAAR_IMPLEMENTATION.md for detailed production steps and security considerations.

Company Verification: PAN and GSTIN validation are performed client-side. Real-world applications would require backend integration with official government APIs for verification. .