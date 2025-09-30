# GamePredict 🏀

![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)  
![Built with FastAPI](https://img.shields.io/badge/Backend-FastAPI-blue?style=for-the-badge&logo=fastapi)  
![Frontend React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)  
![Database MongoDB](https://img.shields.io/badge/Database-MongoDB-green?style=for-the-badge&logo=mongodb)  

**GamePredict** is an AI/ML-powered web application that predicts the outcomes of NBA games.  
The platform lets users explore upcoming matchups, view team and player stats, and see predicted results with a clean, interactive interface.  

🔗 **Live Site:** [GamePredict on Vercel](https://vercel.com/ayaank077s-projects/v0-figma-to-html-code)

---

## Features

- **AI-powered predictions** for NBA games  
- **Interactive UI** with pages for home, matches, stats, and settings  
- **Team and player statistics** visualization  
- **Modern full-stack setup** with responsive frontend and scalable backend  

---

## Tech Stack

- **Frontend:** React (JavaScript), Vite, Tailwind CSS  
- **Backend:** FastAPI (Python)  
- **Database:** MongoDB  
- **Hosting:** Vercel (frontend) & backend API endpoints  

---

## Pages

- `index.html` → Landing page  
- `home.jsx` → Homepage with key games and predictions  
- `match.jsx` → Match details and head-to-head predictions  
- `stats.jsx` → Team and player stats visualization  
- `settings.jsx` → User settings and preferences  

---

## Getting Started

Clone and run locally:

```bash
# Clone repo
git clone https://github.com/ayaank077/GamePredict.git

# Navigate into folder
cd GamePredict

# Install dependencies
npm install   # For frontend
pip install -r requirements.txt   # For backend

# Run frontend
npm run dev

# Run backend
uvicorn main:app --reload
