# SnapShop - Modern E-Commerce Dashboard

SnapShop is a fully responsive, modern, and minimalist E-Commerce Web Application built entirely on the frontend using React (Vite) and Tailwind CSS. It features a robust client-side authentication system, protected routes, and an intuitive user experience without relying on a dedicated backend server.

## 🚀 Key Features

### 🔐 Authentication & Security
- **Complete User Flow**: Registration, Login, and Profile Management.
- **Client-Side Storage**: Securely stores user data and session state using browser `localStorage`.
- **Protected Routes**: Restricts access to dashboard and specific pages for unauthenticated users.
- **Auto Session Timeout**: Automatically logs users out after 5 minutes of inactivity for enhanced security.

### 🛍️ E-Commerce Functionality
- **Product Browsing**: Fetches and displays products dynamically from the [Fake Store API](https://fakestoreapi.com/).
- **Advanced Filtering**: Search products by title or filter by specific categories.
- **Infinite Scrolling**: Implements a highly performant infinite scroll experience utilizing Intersection Observer for loading products incrementally seamlessly.
- **Cart Management**: Add, remove, and adjust product quantities with real-time subtotal, tax, and order total calculations.

### 🎨 UI / UX & State Management
- **Modern Aesthetics**: Built exclusively with Tailwind CSS utility classes, utilizing glassmorphism and smooth micro-animations.
- **Dark / Light Mode**: Full theme customization with persistent storage and system preference tracking.
- **Custom Toast Notifications**: Fully custom notification system built from scratch without external dependencies for alerts like successful login or cart updates.
- **Global State**: Managed effectively using React Context API alongside specialized custom hooks (`useAuth`, `useCart`, `useTheme`, `useToast`, `useSessionTimer`).

## 🛠 Tech Stack

- **Core**: React 18, Vite
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data Source**: Fake Store API

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

## 💻 Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your system.

### Installation & Setup

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository_url>
   cd snapshop-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to the local URL provided by Vite (usually `http://localhost:5173`) to view the application.

## 🚢 Deployment

This project is perfectly suited for straightforward deployment targeting platforms like Vercel or Netlify. Since it's a frontend-only project utilizing Vite, simply specify `dist` as your build directory and `npm run build` as your build command when linking the repository to your hosting provider.

---
*Developed as an Authentication-Based E-Commerce Dashboard without a traditional backend pipeline.*
