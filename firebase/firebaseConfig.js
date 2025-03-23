import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBGwSuCNaVEqoV9oNuVe0YXnun_bPl4vfs',
  authDomain: 'relax-with-flex-a87b8.firebaseapp.com',
  projectId: 'relax-with-flex-a87b8',
  storageBucket: 'relax-with-flex-a87b8.appspot.com',
  messagingSenderId: '527053487161',
  appId: '1:527053487161:web:f8b83bde41838432ba21e8',
  measurementId: 'G-DV8GMJT9WR', 
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig); // Only initialize if not already initialized
} else {
  firebase.app(); // If already initialized, use the default app
}

// Export Firebase instance directly (it includes auth and firestore)
export { firebase };

// Firestore References
const db = firebase.firestore(); // Firestore reference
const auth = firebase.auth(); // Firebase Authentication reference

// GitHub Authentication Provider
export const githubProvider = new firebase.auth.GithubAuthProvider();
githubProvider.addScope('read:user');

// GitHub sign-in function (with Redirect)
export const signInWithGithub = async () => {
  try {
    // Use signInWithRedirect() instead of signInWithPopup()
    await auth.signInWithRedirect(githubProvider);

    // Handle the result once the redirect is completed
    const result = await auth.getRedirectResult();
    if (result.user) {
      const user = result.user;

      // Save user info to Firestore if necessary
      const userRef = db.collection('users').doc(user.uid);
      const doc = await userRef.get();
      if (!doc.exists) {
        await userRef.set({
          username: user.displayName,
          email: user.email,
          profileCompleted: true,
          provider: 'GitHub', // Track GitHub as provider
        });
      }
      return user;
    }
  } catch (error) {
    console.error('GitHub login error: ', error.message);
    throw error;
  }
};

// User Profile Data Structure: Function to save user profile data to Firestore
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
        profileCompleted: true, // Set this flag when profile is complete
      });

      console.log('User profile saved successfully!');
    } catch (error) {
      console.error('Error saving user profile: ', error);
    }
  } else {
    console.log('No user is logged in.');
  }
};

// Function to get the current user's profile data from Firestore
export const getUserProfile = async () => {
  const user = auth.currentUser;

  if (user) {
    try {
      const userDoc = await db.collection('users').doc(user.uid).get();

      if (userDoc.exists) {
        return userDoc.data(); // Return user profile data
      } else {
        console.log('User profile does not exist.');
        return null;
      }
    } catch (error) {
      console.error('Error getting user profile: ', error);
      return null;
    }
  } else {
    console.log('No user is logged in.');
    return null;
  }
};

// Function to log the user out
export const logOut = async () => {
  try {
    await auth.signOut();
    console.log('User logged out successfully!');
  } catch (error) {
    console.error('Error logging out: ', error);
  }
};

// Workout Progress: Function to save workout progress to Firestore
export const saveWorkoutProgress = async (workoutData) => {
  const user = auth.currentUser;

  if (user) {
    try {
      await db.collection('workoutProgress').doc(user.uid).set({
        ...workoutData, // Includes workout session data (e.g., date, workout type, duration, etc.)
      });

      console.log('Workout progress saved successfully!');
    } catch (error) {
      console.error('Error saving workout progress: ', error);
    }
  } else {
    console.log('No user is logged in.');
  }
};

// Function to get the workout progress of the current user
export const getWorkoutProgress = async () => {
  const user = auth.currentUser;

  if (user) {
    try {
      const workoutDoc = await db.collection('workoutProgress').doc(user.uid).get();

      if (workoutDoc.exists) {
        return workoutDoc.data(); // Return the workout progress data
      } else {
        console.log('Workout progress does not exist.');
        return null;
      }
    } catch (error) {
      console.error('Error getting workout progress: ', error);
      return null;
    }
  } else {
    console.log('No user is logged in.');
    return null;
  }
};

// Function to get all users' workout progress (useful for analysis or admin view)
export const getAllUsersWorkoutProgress = async () => {
  try {
    const snapshot = await db.collection('workoutProgress').get();
    const allProgress = snapshot.docs.map(doc => doc.data());
    return allProgress;
  } catch (error) {
    console.error('Error getting all workout progress: ', error);
    return null;
  }
};
