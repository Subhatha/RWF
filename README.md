# Sample Snack app

Open the `App.js` file to start writing some code. You can preview the changes directly on your phone or tablet by scanning the **QR code** or use the iOS or Android emulators. When you're done, click **Save** and share the link!

When you're ready to see everything that Expo provides (or if you want to use your own editor) you can **Download** your project and use it with [expo cli](https://docs.expo.dev/get-started/installation/#expo-cli)).

All projects created in Snack are publicly available, so you can easily share the link to this project via link, or embed it on a web page with the `<>` button.

If you're having problems, you can tweet to us [@expo](https://twitter.com/expo) or ask in our [forums](https://forums.expo.dev/c/expo-dev-tools/61) or [Discord](https://chat.expo.dev/).

Snack is Open Source. You can find the code on the [GitHub repo](https://github.com/expo/snack).



Requirements List
1. Functional Requirements
1.1 User Authentication & Profile Management
Users must be able to sign up using email and password.

Users must be able to log in and log out securely.

Users must complete their profile after signing up (name, age, height, weight, body structure, gender).

The app must fetch user profile data from Firebase Firestore upon login.

Users with incomplete profiles must be redirected to the profile creation screen.

1.2 Personalized Workout Plan Generation
The app must generate workout plans based on the user's body type, height, weight, and gender.

Workout plans should be categorized as:

Slim: Muscle gain and endurance workouts.

Medium: Balanced fitness and HIIT.

Fat: Fat burning and core strength workouts.

Additional workout recommendations based on:

Height (short, medium, tall).

Weight (underweight, normal, overweight).

Gender (upper-body vs. lower-body focus).

1.3 Workout Tracking & Logging
Users must be able to select a workout and start it.

Workout sessions should be logged and stored in Firebase.

Users must be able to track workout progress over time.

1.4 UI & Navigation
The app must use React Navigation for smooth screen transitions.

Screens must include:

Login Screen (with a sign-up redirect).

Signup Screen (with Firebase authentication).

Profile Creation Screen (for entering user details).

Home Screen (showing personalized workout plans).

Workout Data Log Screen (to track workout sessions).

1.5 Dark & Light Mode Support
The app must support both light and dark themes.

Users should be able to switch between themes.

2. Non-Functional Requirements
2.1 Performance & Scalability
The app should load workout plans within 3 seconds.

Firebase Firestore should be used for efficient data retrieval.

2.2 Security & Data Protection
User authentication should be handled using Firebase Authentication.

User data must be securely stored in Firestore.

No sensitive information should be stored on the client-side.

2.3 Compatibility
The app must work on both Android and iOS.

Must be optimized for mobile devices with React Native & Expo.

2.4 Usability & UX
The UI should be clean, intuitive, and responsive.

Users should get real-time feedback (e.g., loading indicators).

3. Software & Technology Stack
3.1 Frontend Technologies
React Native → For building the mobile app UI.

React Hooks (useState, useEffect) → For state management.

React Navigation → For screen navigation.

Expo (Optional) → If using Snack Expo for development.

3.2 Backend & Database
Firebase Authentication → For user login/signup.

Firebase Firestore → For storing user data and workout logs.

3.3 Development Tools
Snack Expo → For development without local setup.

VS Code (Recommended) → For coding.

Git & GitHub → For version control (if needed).
