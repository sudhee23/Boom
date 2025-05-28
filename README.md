# Boom 🎥 - Client (Frontend)

The frontend of **Boom**, a video-based web application where users can purchase videos, gift creators, and view profiles. Built with **React**, **Vite**, **Tailwind CSS**, and **React Router**.

---

## 🚀 Features

- 🔐 Authentication (Login / Register)
- 👤 Profile page with:
  - Wallet balance
  - Purchased videos
  - Gifts sent
- 💳 Video purchase and gifting system
- 📱 Responsive UI (mobile-friendly)
- 🧭 Sidebar navigation + Navbar with search
- 🎁 Tooltip and Avatar interactions
- 📦 UI built with **shadcn/ui**, **Lucide icons**, and **Radix UI**

---

## 📁 Project Structure

Client/
├── public/
│ └── ...
├── src/
│ ├── api/ # API functions (auth, videos, etc.)
│ ├── components/
│ │ ├── Navbar.jsx
│ │ ├── SidebarContent.jsx
│ │ ├── Sidebar.jsx
│ │ ├── Footer.jsx
│ │ ├── VideoCard.jsx
│ │ └── ui/ # Reusable UI components (Button, Avatar, Tooltip etc.)
│ ├── pages/
│ │ ├── ProfilePage.jsx
│ │ └── ...
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── .env
├── vite.config.js
└── package.json


---

## 🔧 Setup & Development

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/boom-client.git
   cd boom-client
npm install
npm run dev
🛠 Built With
React

Vite

Tailwind CSS

Radix UI

React Router

Lucide Icons

shadcn/ui
