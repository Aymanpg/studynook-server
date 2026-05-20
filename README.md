# StudyNook – Library Study Room Booking

🌐 Live Site: [https://studynook-client.vercel.app](https://studynook-client.vercel.app)

## About StudyNook

StudyNook is a full-stack web application where students and library users can list study rooms, browse available rooms, and book them for specific time slots. The platform automatically prevents double-booking using time-conflict detection.

## Features

- 🔐 **Secure Authentication** – JWT stored in HTTP-only cookies with Google OAuth support
- 🏠 **Room Management** – Add, edit, and delete your own study rooms with full CRUD operations
- 📅 **Smart Booking System** – Book rooms by date and time with automatic conflict detection
- 🔍 **Search & Filter** – Search rooms by name and filter by amenities in real time
- 📱 **Fully Responsive** – Works perfectly on mobile, tablet, and desktop devices
- 🔔 **Toast Notifications** – Clean success and error messages using react-hot-toast
- 🛡️ **Private Routes** – Protected pages that stay accessible on reload without re-login
- ❌ **404 Page** – Custom not found page with navigation back to home

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT (HTTP-only cookies) + Firebase Google OAuth
- **Deployment:** Vercel (Frontend) + Render (Backend)

## Pages

- `/` – Home page with latest rooms
- `/rooms` – All rooms with search and filter
- `/rooms/:id` – Room details with booking
- `/add-room` – Add new room (private)
- `/my-listings` – Manage your rooms (private)
- `/my-bookings` – View and cancel bookings (private)
- `/login` – Login page
- `/register` – Register page
