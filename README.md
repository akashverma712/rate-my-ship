# Rate My Ship

**Live URL:** https://rate-my-ship.onrender.com

---

## Project Overview

**Rate My Ship** is a web-based platform designed to provide users with reliable insights into ships before traveling. The platform enables users to explore ships, rate them across multiple parameters, submit feedback and images, and review feedback shared by other users over time. The objective is to ensure transparency, trust, and informed decision-making for travelers.

---

## Features

### User Authentication
- Users can create an account using a username, email address, and password.
- Email verification is required to activate the account.
- Users can log in using either their username or email along with a password.
- Google Authentication is supported for secure and seamless login.

### Ship Listing, Rating & Feedback
- Users can browse ships listed on the platform.
- Ships can be searched and sorted using built-in search and filter functionality.
- Users can:
  - Rate ships based on multiple parameters
  - Upload images related to the ship
  - Submit detailed feedback
- Users can view ratings and feedback submitted by other users over time.

### Ship Suggestion System
- If a ship is not available on the platform, users can submit a suggestion via an automated form.
- Upon submission:
  - The user receives a confirmation email containing the submitted details.
  - The administrator is notified to review and verify the request and take necessary action.

### User Profile Management
- Users can view and edit their account profile details.
- A logout option is available at the bottom-left section of the profile interface.

---

## Admin & Super Admin Roles

### Admin
- Only users assigned as admins by the Super Admin can access the admin panel.
- Admins can perform full CRUD (Create, Read, Update, Delete) operations:
  - Add ships independently or based on user recommendations
  - Edit ship details such as correcting incorrect names
  - Delete ships when required to maintain platform accuracy

### Super Admin
- The system has a single Super Admin with full access to the Supabase backend.
- Responsibilities include:
  - Creating and managing admin accounts
  - Overseeing all platform operations
  - Banning or deleting users in case of suspicious or unauthorized activities
  - Maintaining overall system security and integrity

---

## Performance Optimizations

- Largest Contentful Paint (LCP): **0.73 seconds** after login/registration (may vary by device)
- Cumulative Layout Shift (CLS): **0**
- Interaction to Next Paint (INP): **8 milliseconds**
- Row Level Security (RLS) enabled on all database tables
- Unnecessary data fetching from Supabase is avoided
- Automated workflows operate with a **100% success rate**, ensuring scalability and reliability

---

## Tech Stack

### Frontend
- React
- Tailwind CSS
- Framer Motion
- GSAP

### Backend & Authentication
- Supabase
- Google Authentication

### Add-ons & Integrations
- n8n (Automation)
- ElevenLabs
- Botpress

---

## Getting Started (Local Setup)

Follow the steps below to run the project locally:

### 1. Fork the Repository
Fork the repository to your GitHub account.

### 2. Install Dependencies
Run the following command to install required packages:

```bash
npm install
