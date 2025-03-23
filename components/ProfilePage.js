import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { firebase } from '../firebase/firebaseConfig'; 
import { Ionicons } from '@expo/vector-icons';

const ProfilePage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        setEmail(user.email);

        // Fetch additional profile data from Firestore
        const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setUsername(userData.username || '');
          setHeight(userData.height || '');
          setWeight(userData.weight || '');
        }
      }
    };

    fetchUserDetails();
  }, []);

  // Handle profile update
  const handleUpdateProfile = async () => {
    setLoading(true);
    const user = firebase.auth().currentUser;

    if (user) {
      try {
        // Update profile in Firebase Authentication
        await user.updateProfile({
          displayName: username,
        });

        // Update profile in Firestore
        await firebase.firestore().collection('users').doc(user.uid).update({
          username: username,
          height: height,
          weight: weight,
        });

        Alert.alert('Success', 'Profile updated successfully!');
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    }

    setLoading(false);
  };

  // Handle password change
  const handleChangePassword = async () => {
    if (!newPassword) {
      Alert.alert('Error', 'New password cannot be empty.');
      return;
    }

    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);

    try {
      await user.reauthenticateWithCredential(credential);
      await user.updatePassword(newPassword);
      Alert.alert('Success', 'Password updated successfully!');
      setPassword('');
      setNewPassword('');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {/* Username */}
      <View style={styles.inputContainer}>
        <Ionicons name="person" size={20} color="#bbb" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#888"
        />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={20} color="#bbb" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          editable={false}  // Disables email editing
          placeholderTextColor="#888"
        />
      </View>

      {/* Height */}
      <View style={styles.inputContainer}>
        <Ionicons name="ribbon" size={20} color="#bbb" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />
      </View>

      {/* Weight */}
      <View style={styles.inputContainer}>
        <Ionicons name="scale" size={20} color="#bbb" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />
      </View>

      {/* Update Profile Button */}
      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Updating...' : 'Update Profile'}</Text>
      </TouchableOpacity>

      <Text style={styles.changePasswordTitle}>Change Password</Text>

      {/* Old Password */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={20} color="#bbb" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#888"
        />
      </View>

      {/* New Password */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={20} color="#bbb" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholderTextColor="#888"
        />
      </View>

      {/* Change Password Button */}
      <TouchableOpacity style={styles.button} onPress={handleChangePassword} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Changing...' : 'Change Password'}</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => firebase.auth().signOut()}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e1e1e',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    color: '#fff',
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#121212',
  },
  changePasswordTitle: {
    fontSize: 20,
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#f44336',  // Red color for logout
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ProfilePage;
