This folder will contain QRScanner App with Login, QR Code Scanner and Firestore integration.

# QR Scanner App
A simple and secure QR Code Scanner built with **React Native** using **Expo**, featuring:
-  Firebase Authentication (Email & Password login)
-  QR Code Scanning (via `expo-barcode-scanner`)
-  Scan History saved to Firebase Firestore
-  Persistent login with AsyncStorage
-  Logout functionality

##  Features
- Scan QR codes and save data linked to the logged-in user.
- View past scans on the **History screen**.
- Auto-login persists sessions across app restarts.
- Easy logout via the **Home screen**.

## Tech Stack

- React Native (Expo SDK 50)
- Firebase (Auth & Firestore)
- React Navigation
- AsyncStorage for auth state persistence

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

npm install
npm install -g expo-cli
expo start

 Demo Credentials (for testing)
Email: testuser@example.com
Password: 123456

