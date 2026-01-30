<<<<<<< HEAD
# Widchat

A real-time chat application with video calling capabilities built using the MERN stack and Stream API.

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS + DaisyUI
- Zustand (state management)
- React Query
- Stream Chat React SDK
- Stream Video React SDK

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Stream Chat API

## Features

- User authentication (signup/login)
- Real-time messaging
- Video calling
- Friend requests and notifications
- Multiple theme options
- Responsive design

## Prerequisites

- Node.js (v18 or higher)
- MongoDB database
- Stream account (for chat and video)

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

### Frontend (.env)
```
VITE_STREAM_API_KEY=your_stream_api_key
```

## Installation

1. Clone the repository
```bash
git clone https://github.com/mzw111/Widchat.git
cd Widchat
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

## Running the Application

### Development

Start the backend server:
```bash
cd backend
npm run dev
```

Start the frontend development server:
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

### Production

Build the frontend:
```bash
cd frontend
npm run build
```

## Project Structure

```
widchat/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## License

ISC
=======
# Widchat
>>>>>>> b52308261adbf7c8ecd9f14127a6a9cd63a48e99
