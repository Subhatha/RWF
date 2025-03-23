import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { firebase } from '../firebase/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
  if (!email || !username || !password) {
    Alert.alert('Error', 'All fields are required!');
    return;
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    Alert.alert('Error', 'Please enter a valid email address!');
    return;
  }

  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    await firebase.firestore().collection('users').doc(user.uid).set({
      uid: user.uid,
      email: email,
      username: username,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    Alert.alert('Success', 'Account created! Please complete your profile.');
    navigation.replace('ProfileSetup');
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};

  return (
    <LinearGradient colors={['#1e1e1e', '#121212']} style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={20} color="#bbb" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#888"
        />
      </View>
      
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

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={20} color="#bbb" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={20} color="#bbb" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>SIGN UP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace('Login')}>
        <Text style={styles.loginLink}>Already have an account? <Text style={{ fontWeight: 'bold', color: '#FFD700' }}>Login</Text></Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
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
  signupButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#121212',
  },
  loginLink: {
    color: '#fff',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default SignupScreen;
