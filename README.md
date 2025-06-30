# PulseVibe - A Language Learning Platform

##  Deployed Link

 [Live Demo on Render](https://pulsevibe1.onrender.com)

##  Test Credentials

You can log in using the following test account:

- **Email**: Test@gmail.com  
- **Password**: 123456789

>  **Note**: For best experience, please open this website on a **laptop or desktop screen**.

---

##  Description

PulseVibe is a full-stack language learning platform where you can improve your English communication skills with the help of friends, embedded learning tools, and voice-based interactions.

It is equipped with **video call** and **voice call** features to connect and practice with your connections in real time.

---

##  Core Features

-  **VoiceMate** – A text-to-speech feature supporting over **100 English accents** for immersive listening and pronunciation practice.
-  **Transcripto** – A speech-to-text feature that converts your voice into text. Useful for:
-  **Video Calling** – Talk face-to-face with your peers to build fluency and confidence.
-  **Voice Calling** – Practice speaking without typing.
-  **Fully Responsive UI** – Works smoothly across devices (though best viewed on desktops/laptops).
-  **Real-time Chat Support** – Integrated messaging system for learners.
-  **Clean and Modern Design** – Built with React, Tailwind CSS, and Vite for a fast and responsive user interface.

---

##  Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **WebRTC:** Video and voice calling
- **Real-Time Communication:** Socket.io
- **Cloud/Deployment:** Render.com

---

##  Folder Structure

```bash
pulsevibe/
├── backend/        # Node.js & Express backend
└── frontend/       # React frontend built with Vite
```
---

##  Getting Started

Follow these steps to set up **PulseVibe** locally.

---

###  1. Clone the Repository

```bash
git clone https://github.com/hemantporwal/pulsevibe.git
cd pulsevibe
```

###  2. Install Dependencies
PulseVibe may have separate folders for backend and frontend ( named **frontend** and **backend** )

- Install Backend Dependencies

```bash
cd backend
npm install

```

-  Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

###  3. Configure Environment Variables

- Create a `.env` file inside the **backend** folder and add:

```bash
PORT               =  5001
MONGODB_URI        =  your_mongodb_connection_string
STEAM_API_KEY      =  your_steam_api_key
STEAM_API_SECRET   =  your_steam_api_secret
JWT_SECRET_KEY     =  your_jwt_secret_key
NODE_ENV           =  production
```

- Then create a .env file inside the frontend folder and add:

```bash
VITE_STREAM_API_KEY  =  STEAM_API_KEY  # used in backend

```

### 4. Start the Backend Server

```bash
cd backend
npm start

```

- The backend will start at: http://localhost:5001

### 5. Start the Frontend Server

Open a new terminal:

```bash
cd frontend
npm run dev

```
- The frontend will run at: http://localhost:5173

## Login with Test Credentials

- Email: Test@gmail.com

- Password: 123456789


## Connect with Me 

- **Name**: Hemant Porwal  
- **Email**: [hemantporwal2k3@gmail.com](mailto:hemantporwal2k3@gmail.com)  
- **LinkedIn**: [https://www.linkedin.com/in/hemantporwal/](https://www.linkedin.com/in/hemant-porwal-462b1b258/)
   


