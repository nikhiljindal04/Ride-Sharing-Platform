# 🚗 Ride Sharing Platform

A full-stack ride-sharing application built with the MERN stack (MongoDB, Express, React, Node.js) and WebSockets for real-time tracking. This project features separate panels for Users (riders) and Captains (drivers), with live location tracking, fare estimation, and real-time ride matching.

## ✨ Features

- **User & Captain Portals**: Distinct interfaces and authentication flows for riders and drivers.
- **Real-time Tracking**: Live location updates using Socket.io and Google Maps API.
- **Fare Estimation**: Automatic calculation of fares based on distance and time for different vehicle types (Car, Auto, Moto).
- **Ride Matching**: Real-time broadcast of ride requests to nearby drivers.
- **Interactive UI**: Smooth animations and transitions using GSAP.
- **Secure Authentication**: JWT-based authentication with a secure logout mechanism (Blacklisted Tokens).

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 with Vite
- **Styling**: TailwindCSS 4
- **Animations**: GSAP
- **Maps**: React Google Maps API
- **Real-time**: Socket.io-client
- **Routing**: React Router DOM 7

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5
- **Database**: MongoDB with Mongoose
- **Real-time**: Socket.io
- **Authentication**: JWT, bcrypt
- **Validation**: express-validator

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:
- **Node.js** (v18 or higher recommended)
- **MongoDB** (Local instance or MongoDB Atlas cluster)
- **Google Maps API Key** (Make sure to enable Maps JavaScript API, Places API, Distance Matrix API, and Geocoding API)

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd UBER
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory and add the following variables:
```env
PORT=4000
DB_CONNECT=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret Key>
GOOGLE_MAPS_API=<Your Google Maps API Key>
```

Start the backend development server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd Frontend
npm install
```

Create a `.env` file in the `Frontend` directory and add the following variables:
```env
VITE_BASE_URL=http://localhost:4000
VITE_GOOGLE_MAPS_API=<Your Google Maps API Key>
```

Start the frontend development server:
```bash
npm run dev
```

---

## 🏗️ System Architecture Overview

The system uses a modern stack with a clear separation of concerns between the client and server. Real-time features are heavily utilized for ride tracking and status updates using WebSockets.

### 💻 Frontend Architecture (`/Frontend`)

The frontend is a Single Page Application (SPA) built with React and Vite. It serves distinct experiences for **Users** (Riders) and **Captains** (Drivers).

#### 1. File Structure & Routing
- **Entry Point**: `src/main.jsx` and `src/App.jsx`.
- **Routing**: `react-router-dom` is used to navigate between pages.
  - **Public Routes**: Start page, Login and Signup pages for both Users and Captains.
  - **Protected Routes**: Handled via `UserProtectWrapper.jsx` and `CaptainProtectWrapper.jsx` to ensure only authenticated sessions can access the application core.
  - **Core Routes**: `/home` for Users and `/captainHome` for Captains, plus riding specific views (`/userRiding`, `/captainRiding`).

#### 2. State Management & Context
- Global state such as user and captain authentication status/data is managed using React Context (`src/context/`).

#### 3. Key UI Components (`src/Panels/`)
The interface relies heavily on sliding/popup panels to handle the ride lifecycle smoothly:
- **Location & Booking**: `LocationSearchPanel.jsx`, `VehiclePanel.jsx`, `ConfirmedRidePanel.jsx`.
- **Driver Matching**: `LookingForDriver.jsx`, `WaitingForDriver.jsx`.
- **Captain specific**: `CaptainDetails.jsx`, `RidePopupCaptain.jsx`, `ConfirmRidePopupCaptain.jsx`, `FinishRideCaptain.jsx`.
- **Live Tracking**: `LiveTracking.jsx` integrates Google Maps.

#### 4. Real-time & Animations
- **WebSockets**: Uses `socket.io-client` to listen for events like "ride accepted", "driver arrived", and location updates.
- **Animations**: `gsap` (GreenSock) is heavily utilized for smooth panel transitions and UI micro-interactions.

### ⚙️ Backend Architecture (`/Backend`)

The backend is a RESTful API built on Express, coupled with Socket.io for real-time bi-directional communication.

#### 1. Data Layer (`/db` & `/Models`)
MongoDB is used as the database, interfaced via Mongoose.
- **User.models.js**: Stores rider details and authentication credentials.
- **captain.model.js**: Stores driver details, including vehicle information and location status.
- **ride.model.js**: Tracks the lifecycle of a ride (pickup, destination, fare, status, assigned captain).
- **blacklistToken.model.js**: Used for secure JWT invalidation upon logout.

#### 2. MVC Pattern Implementation
The backend strictly follows the Model-View-Controller (or rather Route-Controller-Service) pattern:
- **Routes (`/routes`)**: Define the API endpoints and attach middleware (e.g., auth, input validation).
  - `/users`, `/captains`, `/maps`, `/rides`.
- **Controllers (`/controllers`)**: Extract the request data, invoke the appropriate service, and send the HTTP response.
- **Services (`/services`)**: Contain the core business logic.
  - **Maps Service**: Handles geocoding, distance/time calculation, and auto-complete using Maps APIs.
  - **Ride Service**: Logic for fare calculation, matching algorithms, and updating ride statuses.
  - **User/Captain Services**: Registration and profile management.

#### 3. Middleware (`/middleware`)
- **Authentication**: Validates JWT tokens from cookies or headers and attaches the verified user/captain to the request object.
- **Validation**: Uses `express-validator` to ensure incoming request data is well-formed.

#### 4. Real-time Communication (`socket.js`)
- Manages active WebSocket connections.
- When a user requests a ride, the server emits events to nearby captains.
- As the captain drives, location updates are emitted back to the specific user tracking that ride.

## 🚀 How it works (The Ride Flow in Detail)

1. **Request & Estimation (Frontend to Backend)**: 
   - The User inputs a pickup location and destination.
   - The Frontend triggers an autocomplete API via the Backend (Maps Service).
   - Once selected, the Frontend requests a fare estimate. The Backend calculates the distance and time using the Google Maps API and computes fare estimates for all vehicle types (Car, Auto, Moto).
   - The UI displays these options in the `VehiclePanel`.

2. **Booking the Ride (Database Creation)**: 
   - The User confirms a vehicle type.
   - The Frontend sends a request to the Backend to create a ride.
   - A new `Ride` document is saved in the MongoDB database with a status of `pending`. A unique OTP is generated for this ride to ensure security.
   - The UI transitions to the `LookingForDriver` panel.

3. **Dispatch & Matching (WebSockets - Socket.io)**: 
   - The Backend queries the database for active Captains within a specific radius of the pickup location who match the requested vehicle type.
   - Using `Socket.io`, the Backend emits a `new-ride` event exclusively to these nearby Captains.
   - The Captains' UI pops up with the `RidePopupCaptain`, showing pickup/drop locations and the estimated fare.

4. **Acceptance (State Update & Notification)**: 
   - A Captain clicks "Accept" on their UI.
   - The Backend updates the `Ride` document status to `accepted` and links the Captain's ID to the ride.
   - The Backend emits a `ride-confirmed` event via WebSockets directly to the User who requested the ride.
   - The User's UI updates to `WaitingForDriver`, displaying the Captain's profile, vehicle details, and the Captain's current distance.

5. **Transit & Live Tracking (Continuous WebSocket Stream)**: 
   - The Captain navigates to the pickup location.
   - Once there, the Captain asks the User for the OTP to start the ride (updating status to `ongoing`).
   - During the trip, the Captain's app continuously emits their GPS coordinates to the server via WebSockets.
   - The Backend relays these coordinates to the User's app, which updates the vehicle marker on the Google Map in real-time (`LiveTracking` component).

6. **Completion & Payment**: 
   - Upon reaching the destination, the Captain marks the ride as complete in their UI (`FinishRideCaptain` panel).
   - The Backend updates the Ride status to `completed`.
   - The User receives a WebSocket notification that the ride is finished and is prompted with the final fare details.


