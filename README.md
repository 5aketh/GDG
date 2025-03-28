# 🌾 Annadata – AI-Powered Agricultural Advisory System

## 📌 Project Overview
**Annadata** is an AI-driven agricultural advisory system designed to empower small and marginal farmers by providing timely, relevant, and personalized agricultural information. 

The solution addresses key challenges such as:
- 🌦️ **Unpredictable Weather:** Real-time weather updates to help farmers plan effectively.  
- 🌾 **Resource Constraints:** Insights on market prices and farming resources.  
- 🤖 **Information Gap:** AI-powered advisory chatbot offering expert recommendations.  

---

## 🔥 Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js with Firebase Authentication, Firestore, and external APIs
- **Chatbot:** Gemini 2.0 Flash API for intelligent advisory responses
- **External APIs:** Weather and market price data for real-time information
- **Future Plans:** IoT integration (soil sensors, irrigation systems) and a multilingual voice chatbot

---

## 🚀 Features
✅ AI-powered agricultural advisory chatbot using Gemini 2.0 Flash  
✅ Real-time weather and market price updates  
✅ Firebase authentication (email-password) and Firestore for database management  
✅ Multilingual support with Google Translate (planned)  
✅ Future IoT integration for soil testing and automated irrigation  

---

## 🛠️ Setup Instructions

### ✅ Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org) (v18 or later)  
- [Firebase CLI](https://firebase.google.com/docs/cli)  
- [npm](https://www.npmjs.com/)  

---

### ⚙️ Environment Variables
Create a `.env` file in both the **backend** and **frontend** directories with the following variables:

#### **Backend (.env)** 
```env
# Firebase Admin SDK Credentials
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY=your-private-key

# Google AI Studio Gemini API Key
GEMINI_API_KEY=your-gemini-api-key

# External APIs
WEATHER_API_KEY=your-weather-api-key
MARKET_API_KEY=your-market-api-key
```

### ✅ Firebase Credentials:
1. Go to [Firebase Console](https://console.firebase.google.com) → **Project Settings** → **Service accounts** → **Generate new private key**.  
2. Save the `service-account.json` file and extract the necessary values.  

---

### ✅ Gemini API Key:
1. Visit [Google AI Studio](https://aistudio.google.com).  
2. Select your model → **Get API Key**.  

---

## 💻 Running the Project Locally

### Clone the Repository
```bash
git clone <your-github-repo-url>
cd GDG_Project
```

### Setup and local host
Open two terminals (one for frontend, one for backend).
Install dependencies in both directories:
``` bash
# Terminal 1: Frontend
cd frontend
npm install

# Terminal 2: Backend
cd backend
npm install

# Terminal 1: Start Frontend (React)
npm start  # Runs on port 3000

# Terminal 2: Start Backend (Node.js)
node index.js  # Runs on port 5000
```

## 🚀 Future Enhancements

- 🌿 **IoT Integration:** Real-time soil testing with soil sensors  
- 💧 **Irrigation Automation:** Remote and automatic crop irrigation  
- 🌐 **Multilingual Support:**  
  - Google Translate API for UI localization  
  - Voice chatbot with multiple language support  
- 📊 **Data Analytics:** Crop yield prediction and analytics dashboard  
