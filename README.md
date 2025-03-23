# Sample Snack app

Open the `App.js` file to start writing some code. You can preview the changes directly on your phone or tablet by scanning the **QR code** or use the iOS or Android emulators. When you're done, click **Save** and share the link!

When you're ready to see everything that Expo provides (or if you want to use your own editor) you can **Download** your project and use it with [expo cli](https://docs.expo.dev/get-started/installation/#expo-cli)).

All projects created in Snack are publicly available, so you can easily share the link to this project via link, or embed it on a web page with the `<>` button.

If you're having problems, you can tweet to us [@expo](https://twitter.com/expo) or ask in our [forums](https://forums.expo.dev/c/expo-dev-tools/61) or [Discord](https://chat.expo.dev/).

Snack is Open Source. You can find the code on the [GitHub repo](https://github.com/expo/snack).



Frontend:
React Native → For building the mobile app.

React Navigation → For handling screen navigation (Stack.Navigator).

React Hooks (useState, useEffect) → For state management and side effects.

React Native Components → Used core components like View, Text, ScrollView, TouchableOpacity, ActivityIndicator, and TextInput.

React Native Stylesheet → Used StyleSheet.create for styling.

Backend & Database:
Firebase Authentication → For user authentication (firebase.auth().currentUser).

Firebase Firestore → For storing and retrieving user data (firebase.firestore().collection('users')).

Firebase SDK for React Native → To integrate Firebase services.

State Management & Logic:
useState → To manage component states (e.g., workoutPlans, loading, error).

useEffect → For fetching user data on component mount.

Other Technologies & Features:
Expo (Possibly) → Since you're using Snack Expo for development.

JavaScript (ES6/ESNext) → Modern JS features like async/await, object destructuring, and arrow functions.

Firestore Querying → Used .doc(user.uid).get() to fetch user-specific data.

Custom Workout Logic → Based on body type, height, weight, and gender.

Potential Add-ons (If Needed)
Redux / Context API (If you later need global state management).

AsyncStorage or Firestore Realtime Database (If you want offline storage or live updates).
