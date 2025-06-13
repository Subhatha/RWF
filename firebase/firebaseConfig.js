import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCf3RZctXuQkEf-hPLhrzu-B3nhsAYKGqk',
  authDomain: 'r-w-f-fde9d.firebaseapp.com',
  projectId: 'r-w-f-fde9d',
  storageBucket: 'r-w-f-fde9d.firebasestorage.app',
  messagingSenderId: '967770399161',
  appId: '1:967770399161:web:f3cc5533391a7eecdd5668',
  measurementId: 'G-32Z8Y50ZMW',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

export { firebase, auth, db };

// Save User Profile
export const saveUserProfile = async (userData) => {
  const { username, age, height, weight, bodyType, gender } = userData;
  const user = auth.currentUser;

  if (user) {
    try {
      await db.collection('users').doc(user.uid).set({
        username,
        age,
        height,
        weight,
        bodyType,
        gender,
        profileCompleted: true,
      });
      console.log('User profile saved successfully!');
    } catch (error) {
      console.error('Error saving user profile: ', error);
    }
  } else {
    console.log('No user is logged in.');
  }
};

// Get User Profile
export const getUserProfile = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      const doc = await db.collection('users').doc(user.uid).get();
      if (doc.exists) {
        return doc.data();
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile: ', error);
      return null;
    }
  }
  return null;
};

// Log Out
export const logOut = async () => {
  try {
    await auth.signOut();
    console.log('User logged out successfully!');
  } catch (error) {
    console.error('Error logging out: ', error);
  }
};

// Save Workout Progress
export const saveWorkoutProgress = async (workoutData) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await db.collection('workoutProgress').doc(user.uid).set(workoutData);
      console.log('Workout progress saved!');
    } catch (error) {
      console.error('Error saving workout progress:', error);
    }
  } else {
    console.log('No user logged in.');
  }
};

// Get Workout Progress
export const getWorkoutProgress = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      const doc = await db.collection('workoutProgress').doc(user.uid).get();
      if (doc.exists) {
        return doc.data();
      }
      return null;
    } catch (error) {
      console.error('Error getting workout progress:', error);
      return null;
    }
  }
  return null;
};
