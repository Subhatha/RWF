import firebase from 'firebase'; // Import the Firebase package

// Firebase configuration object (replace with your own Firebase credentials)
const firebaseConfig = {
  apiKey: 'AIzaSyBGwSuCNaVEqoV9oNuVe0YXnun_bPl4vfs',
  authDomain: 'relax-with-flex-a87b8.firebaseapp.com',
  projectId: 'relax-with-flex-a87b8',
  storageBucket: 'relax-with-flex-a87b8.firebasestorage.app',
  messagingSenderId: '527053487161',
  appId: '1:527053487161:web:f8b83bde41838432ba21e8',
  measurementId: 'G-DV8GMJT9WR', // Optional
};

// Initialize Firebase (if not already initialized)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig); // Only initialize if not already initialized
} else {
  firebase.app(); // If already initialized, use the default app
}

// Export Firebase instance directly (it includes auth and firestore)
export { firebase };
