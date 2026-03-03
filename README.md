<div align="center">

# 🛍️ SnapShop
**Modern, Responsive, and Minimalist E-Commerce Dashboard**

[![React](https://img.shields.io/badge/React-18-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[Explore Features](#-key-features) • [Installation](#-getting-started) • [Tech Stack](#-tech-stack) • [Deployment](#-deployment)

</div>

---

## 📖 Overview

**SnapShop** is a fully responsive, modern, and minimalist E-Commerce Web Application. Built entirely on the frontend using **React (Vite)** and **Tailwind CSS**, it delivers a seamless user experience prioritizing performance and design. It features a robust client-side authentication system, secure protected routes, and intuitive state management—all without relying on a dedicated backend server.

---

## 🚀 Key Features

### 🔐 Authentication & Security
- **Complete User Flow**: End-to-end registration, login, and profile management.
- **Client-Side Storage**: Securely persists user data and session state leveraging browser `localStorage`.
- **Protected Routes**: Restricts unauthorized access to the dashboard and sensitive pages.
- **Auto Session Timeout**: Enhances security by automatically logging users out after 5 minutes of inactivity.

### 🛍️ E-Commerce Experience
- **Dynamic Product Catalog**: Seamlessly fetches and displays real-time products from the [Fake Store API](https://fakestoreapi.com/).
- **Advanced Search & Filtering**: Quickly find products by title or drill down by specific categories.
- **Infinite Scrolling**: Highly performant product loading utilizing the Intersection Observer API for uninterrupted browsing.
- **Smart Cart Management**: Add, remove, and adjust quantities with real-time subtotal, tax, and total order calculations.

### 🎨 UI/UX & State Management
- **Modern Aesthetics**: Exclusively styled with Tailwind CSS utility classes, featuring glassmorphism elements and smooth micro-animations.
- **Dynamic Theming**: Full dark/light mode support with persistent storage and system preference tracking.
- **Custom Notification System**: Zero-dependency toast notifications built from scratch for alerts like successful logins or cart updates.
- **Robust Global State**: Powered by the React Context API and specialized custom hooks (`useAuth`, `useCart`, `useTheme`, `useToast`, `useSessionTimer`).

---

## 🛠 Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Core** | React 18, Vite | Fast, modern frontend framework and build tool |
| **Routing** | React Router DOM v6 | Declarative routing for React applications |
| **Styling** | Tailwind CSS | Utility-first CSS framework for rapid UI development |
| **Icons** | Lucide React | Beautiful, consistent icon set |
| **Data Source** | Fake Store API | Mock REST API for e-commerce data |

---

## 📁 Project Structure

```text
src/
├── components/       # Reusable UI components (Navbar, Sidebar, ProductCard, Layout)
├── context/          # Global state contexts (AuthContext, CartContext, ThemeContext)
├── hooks/            # Custom React hooks (useAuth, useCart, useTheme, useSessionTimer)
├── pages/            # Application routes (Login, Register, Dashboard, Products, Cart)
├── index.css         # Global styles and Tailwind configuration
└── main.jsx          # Application entry point and Provider wrapping
```

---

## 💻 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v16+ recommended) and `npm` installed on your system.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sayantan-dev1003/SnapShop.git
   cd SnapShop
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   *Note: Using `npm ci` is recommended for clean, reproducible builds.*

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **View the application**:
   Open your browser and navigate to the local URL provided by Vite (typically `http://localhost:5173`).

---

## 🚢 Deployment

This project is optimized for automated deployment on modern edge platforms like **Vercel**, **Netlify**, or **Cloudflare Pages**. 

Since it's a frontend-only application powered by Vite, use the following configuration when linking the repository to your hosting provider:
- **Build Command**: `npm run build`
- **Publish/Output Directory**: `dist`

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Sayantan-dev1003/SnapShop/issues) if you want to contribute.

---

<div align="center">
  <i>Developed as an Authentication-Based E-Commerce Dashboard focusing on frontend architecture and UI/UX best practices.</i>
</div>
