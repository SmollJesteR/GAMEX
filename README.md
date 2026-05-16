<div align="center">
  <h1>🎮 GAMEX</h1>
  <p>A premium, full-stack video game review platform.</p>
</div>

## 📖 Overview

**GAMEX** is a comprehensive platform for browsing, reading, and managing video game reviews. Designed with a modern, dynamic UI and powered by a robust backend, GAMEX allows users to explore games by genre, read detailed editorial reviews, and provides administrators with a secure dashboard to manage content and media.

## ✨ Features

- **Dynamic Frontend UI:** Premium visual design using modern layout principles, smooth micro-animations (Framer Motion), and responsive typography.
- **Game Browsing:** Explore games categorized by genres, view rich cover and hero images.
- **Editorial Reviews:** Read in-depth game reviews with high/low points, verdicts, and screenshots.
- **Admin Dashboard:** Secure login for editors to manage games and publish reviews.
- **Media Management:** Integrated Cloudinary upload system for game covers, hero images, and review screenshots.
- **External Integrations:** Fetches and synchronizes game data using the RAWG Game Database API.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 with Vite
- **Styling:** TailwindCSS v4
- **Animations:** Motion (Framer Motion)
- **Icons:** Lucide React

### Backend
- **Server:** Node.js, Express
- **Database ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** JWT, bcryptjs
- **Media Storage:** Cloudinary

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- A [PostgreSQL](https://www.postgresql.org/) database
- A [Cloudinary](https://cloudinary.com/) account for media uploads
- A [RAWG API](https://rawg.io/apidocs) key for game data fetching

### Installation & Setup

1. **Clone the repository and navigate to the project directory:**
   ```bash
   git clone <your-repo-url>
   cd GAMEX
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example environment file and fill in your actual credentials.
   ```bash
   cp .env.example .env
   ```
   Open `.env` and set your `DATABASE_URL`, `JWT_SECRET`, `RAWG_API_KEY`, and `CLOUDINARY_*` keys.

4. **Initialize the Database:**
   Push the Prisma schema to your database.
   ```bash
   npx prisma db push
   ```

5. **Seed the Database (Optional but recommended):**
   This will populate the database with initial game genres, sample reviews, and the default admin user.
   ```bash
   npm run seed
   ```

6. **Start the Development Servers:**
   You will need two terminal windows to run both the frontend and backend simultaneously.

   **Terminal 1 (Backend API):**
   ```bash
   npm run server:dev
   ```

   **Terminal 2 (Frontend Vite Server):**
   ```bash
   npm run dev
   ```

7. **Access the Application:**
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:4000
   - **Admin Login:** Navigate to the "Admin" section in the footer or visit the login route to access the CMS (use credentials from `.env` seed).

## 📂 Project Structure

- `/src`: React frontend source code (components, lib, pages).
- `/server`: Node.js/Express backend API (routes, controllers, config).
- `/prisma`: Database schema, migrations, and seed scripts.
- `/uploads`: Temporary local storage for files before Cloudinary upload.

## 📄 License

This project is licensed under the MIT License.
