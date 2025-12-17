# Multi-time Zone Meeting Room

A modern, responsive web application for efficiently managing and booking meeting rooms across multiple time zones. Built with React and Vite for optimal performance and developer experience.

## � Screenshots

### Room Browser

![Room Browser](src/assets/Screenshot%202025-12-17%20230543.png)

### Bookings View

![Bookings View](src/assets/Screenshot%202025-12-17%20230549.png)

### Conflicts Detection

![Conflicts Detection](src/assets/Screenshot%202025-12-17%20230556.png)

## �📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)

## 🎯 Overview

The Multi-time Zone Meeting Room application is designed to streamline the booking and management of meeting rooms in distributed organizations. It intelligently handles time zone conversions to ensure seamless scheduling across global teams.

## ✨ Features

- **Room Management** - Browse and filter available meeting rooms
- **Smart Booking System** - Intuitive booking interface with real-time availability
- **Multi-timezone Support** - Automatic time zone conversion and scheduling
- **Conflict Detection** - Identifies and prevents double-booking
- **Responsive Design** - Works seamlessly across desktop, tablet, and mobile devices
- **Real-time Updates** - Instant synchronization of room availability

## 🛠 Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18
- **Time Management**: Luxon 3.7.2
- **State Management**: React Context API
- **Code Quality**: ESLint 9.39.1
- **Runtime**: ES Modules

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Multi-time-Zone-Meeting-Room
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Build for Production

```bash
npm run build
```

The optimized production build will be generated in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

## 📁 Project Structure

```
Multi-time Zone Meeting Room/
├── src/
│   ├── Components/          # React components
│   │   ├── Bookings/        # Booking-related components
│   │   ├── Conflicts/       # Conflict detection views
│   │   ├── Layout/          # Layout components (Shell, Header, Sidebar)
│   │   └── Rooms/           # Room browser and display components
│   ├── Context/             # React Context for state management
│   ├── Api/                 # API integration layer
│   ├── Data/                # Mock data and fixtures
│   ├── Utils/               # Utility functions (date handling, etc.)
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint configuration
├── package.json            # Project dependencies and scripts
└── README.md              # This file
```

## 🔧 Available Scripts

| Command           | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Start development server with hot module replacement |
| `npm run build`   | Build optimized production bundle                    |
| `npm run preview` | Preview production build locally                     |
| `npm run lint`    | Run ESLint to check code quality                     |

## 📚 Key Components

### Bookings

- **BookingForm** - Form component for creating/editing bookings
- **BookingList** - Displays list of bookings
- **BookingItem** - Individual booking display component

### Rooms

- **RoomBrowser** - Main room browsing interface
- **RoomCard** - Individual room card component
- **RoomFilter** - Filter and search functionality for rooms

### Layout

- **AppShell** - Main application wrapper
- **HeaderBar** - Top navigation bar
- **SideBar** - Navigation sidebar

### Utilities

- **DateUtils** - Time zone conversion and date formatting utilities
- **BookingsApi** - Backend API communication layer

---
