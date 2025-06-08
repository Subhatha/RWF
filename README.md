# Relax With Flex (RWF) 🧘‍♂️💪

**Relax With Flex** is a mobile fitness app built with **React Native**, **Snack Expo Dev**, and **Firebase**. It helps users personalize their workout plans based on their body type and track their fitness progress. The app also offers gym-related products, workout scheduling, and in-app purchases.

---

## 🚀 Prerequisites

Before you begin, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- npm (comes with Node.js)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Git
- Firebase account
- [Expo Go](https://expo.dev/client) app on your mobile device

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Subhatha/RWF.git
cd RWF
```

### 2. Run on Snack Expo (Recommended for Development)

- Go to [https://snack.expo.dev](https://snack.expo.dev)
- Upload or paste your code
- Scan the QR code using **Expo Go** to run the app on your phone instantly

### 3. Or Install Dependencies Locally

```bash
npx expo install
```

---

## 📱 Running the App

Start the development server:

```bash
npx expo start
```

Then:

- Press **a** for Android emulator  
- Press **i** for iOS simulator  
- Press **w** for web browser  
- Or scan the QR code with **Expo Go**

---

## 🗂 Project Structure

```
RWF/
├── App.js
├── index.js
├── app.json
├── assets/
├── components/
│   ├── EquipmentScreen.js
│   ├── HomeScreen.js
│   ├── LoginScreen.js
│   ├── ProfilePage.js
│   ├── ProfileSetupScreen.js
│   ├── ProgressScreen.js
│   ├── ScheduleScreen.js
│   ├── SignupScreen.js
│   ├── WorkoutDataLogScreen.js
│   └── WorkoutScreen.js
├── firebase/
│   └── firebaseConfig.js
├── theme.js
├── Data/
    └── workoutData.json
├── User Manual
├── README.md
├── package.json

```

---

## 🔑 Features

- 🔐 **User Authentication** (Firebase)
- 👤 **Profile Creation & Management**
- 🧠 **Customized Workout Plans**
  - Based on gender, age, height, weight, body type
  - Uses data from Excel-based plans
- 📅 **Workout Scheduling** *(in progress)*
- 🏋️‍♀️ **Track Workouts** *(upcoming)*
- 🛒 **In-App Shop** (gym gear, protein)
- 🏬 **Gym Order Requests**
- 📷 **Image Uploads (profile pics)**
- ☁️ **Firebase Integration**
- 📱 **Runs on Expo & Snack Dev**

---

## 🔥 Firebase

**Firebase SDK Version**: `8.10`

Used services:

- Firebase Authentication
- Firestore Database
- Firebase Storage

---

## 🛠 Development Tips

- Edit components in `screens/` and `components/`
- Update logic in `utils/workoutGenerator.js`
- Ensure you're connected to the correct Firebase project

---

## 🧯 Troubleshooting

### Clear npm cache

```bash
npm cache clean --force
```

### Reinstall dependencies

```bash
rm -rf node_modules
npx expo install
```

### Clear Expo cache

```bash
expo start -c
```

---

## 📜 License

This project is licensed under the **MIT License** – see the `LICENSE` file for details.

---

## 🌐 Repository

👉 [GitHub – Relax With Flex](https://github.com/Subhatha/RWF)
