import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { firebase } from '../firebase/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password.');
      return;
    }
    setLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setLoading(false);
      // Auth state listener in App.js handles navigation
    } catch (error) {
      setLoading(false);
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <LinearGradient colors={['#1e1e1e', '#121212']} style={styles.container}>
      <Text style={styles.title}>Login to Your Account</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={20} color="#bbb" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={20} color="#bbb" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!showPassword}
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye' : 'eye-off'}
            size={20}
            color="#bbb"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FFD700" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.replace('Signup')}>
        <Text style={styles.signupLink}>
          Don't have an account?{' '}
          <Text style={{ fontWeight: 'bold', color: '#FFD700' }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 40 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  input: { flex: 1, paddingVertical: 15, color: '#fff' },
  icon: { marginRight: 10 },
  button: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: '#121212' },
  signupLink: { color: '#fff', marginTop: 15, textAlign: 'center' },
});

export default LoginScreen;
