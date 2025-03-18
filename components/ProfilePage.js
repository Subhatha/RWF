import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { firebase } from '../firebase/firebaseConfig';  // Import firebase instance

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);  // Loading state while data is being fetched

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      firebase.firestore().collection('users').doc(user.uid).get().then((doc) => {
        if (doc.exists) {
          setUserData(doc.data());
        } else {
          console.log('User data not found');
        }
        setLoading(false);  // Stop loading once data is fetched
      }).catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
    }
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!userData) {
    return <Text>No profile data available</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Information</Text>
      <Text>Name: {userData.username || 'N/A'}</Text>
      <Text>Email: {userData.email || 'N/A'}</Text>
      <Text>Age: {userData.age || 'N/A'}</Text>
      <Text>Height: {userData.height || 'N/A'}</Text>
      <Text>Weight: {userData.weight || 'N/A'}</Text>
      <Text>Body Structure: {userData.body_structure || 'N/A'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
});

export default ProfilePage;
