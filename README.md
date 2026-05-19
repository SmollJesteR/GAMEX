<div align="center">
  <h1>🎮 GAMEX</h1>
  <p>A premium, full-stack video game review platform.</p>
</div>

## 📖 Overview

**GAMEX** is a comprehensive platform for browsing, reading, and managing video game reviews. Designed with a modern, dynamic UI and powered by a robust backend, GAMEX allows users to explore games by genre, read detailed editorial reviews, and provides administrators with a secure dashboard to manage content and media.

## ✨ Features

- **Dynamic Frontend UI:** Premium visual design using modern layout principles, smooth micro-animations (Framer Motion), responsive typography, and borderless cinematic media containers.
- **Game Browsing:** Explore games categorized by genres, view rich cover and hero images, and dynamically generated "Community Recommends" highlights.
- **Editorial Reviews:** Read in-depth game reviews with high/low points, verdicts, precise decimal scoring, and screenshots.
- **Admin Dashboard CMS:** Secure login for editors to manage games, publish reviews, assign genres/sub-genres, and update dynamic profile settings (name, role, avatar).
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

## 📅 Development Log

- **Friday, May 15, 2026**
  - Transitioned the platform from static mock data to a dynamic, functional Content Management System.
  - Established backend persistence using an Express server and Prisma ORM.
  - Integrated API endpoints for managing game reviews and media assets.

- **Saturday, May 16, 2026**
  - Configured environment variables to handle secure API connections (PostgreSQL, Cloudinary, RAWG).
  - Refined the CMS Editorial workflow for creating and editing comprehensive reviews.
  - Developed the structured Review Detail page, syncing UI components to accurately display dynamic content across modular sections.

- **Sunday, May 17, 2026**
  - Increased visual spacing between homepage sections for improved aesthetics.
  - Added the "Fighting" genre and implemented a new "Sub-Genres" system serving as interactive tags.
  - Fixed syntax issues and UI inconsistencies within layout components.

- **Monday, May 18, 2026**
  - Finalized the Admin Dashboard profile settings, allowing dynamic author metadata (name, role, avatar) to reflect globally.
  - Resolved UI interaction issues to ensure smooth horizontal scrolling across the Review Row.

- **Tuesday, May 19, 2026**
  - Enhanced precise decimal score rendering natively on the Review Card hover states.
  - Integrated dynamic platform icon rendering based on live database arrays instead of hardcoded fallbacks.
  - Addressed a CMS taxonomy bug to filter out hidden default sub-genre tags ("Action RPG") from improperly persisting.
  - Polished the Review Detail Visual Spectacle section by removing aesthetic constraints around the cinematic media container.
  - Revamped the "Community Recommends" section to pull directly from the database, rendering dynamic hero images, exact scores, and parsed first-paragraph review snippets.
