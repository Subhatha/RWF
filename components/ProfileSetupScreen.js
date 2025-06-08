import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // use this picker in Expo
import { firebase } from '../firebase/firebaseConfig';
import * as Animatable from 'react-native-animatable';

const ProfileSetupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bodyType, setBodyType] = useState('slim');
  const [gender, setGender] = useState('male');

  const handleSaveProfile = async () => {
    if (!username || !age || !height || !weight || !bodyType || !gender) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    try {
      
      const user = firebase.auth().currentUser;
      if (!user) {
        Alert.alert('Error', 'User not logged in!');
        return;
      }
      await firebase.firestore().collection('users').doc(user.uid).set({
        username,
        age: Number(age),
        height: Number(height),
        weight: Number(weight),
        bodyType,
        gender,
        profileCompleted: true,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
        Alert.alert('Success', 'Profile saved successfully!');
        navigation.replace('Home'); // Navigate to Home (MainTabs)
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'An error occurred while saving your profile.');
    }   
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Complete Your Profile</Text>

        <Animatable.View animation="fadeInUp" delay={300} style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#bbb"
            value={username}
            onChangeText={setUsername}
          />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={500} style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Age"
            placeholderTextColor="#bbb"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={700} style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Height (cm)"
            placeholderTextColor="#bbb"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={900} style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Weight (kg)"
            placeholderTextColor="#bbb"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={1100} style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Select Your Body Type</Text>
          <Picker
            selectedValue={bodyType}
            onValueChange={setBodyType}
            style={styles.picker}
          >
            <Picker.Item label="Slim" value="slim" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="Fat" value="fat" />
          </Picker>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={1300} style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Select Your Gender</Text>
          <Picker
            selectedValue={gender}
            onValueChange={setGender}
            style={styles.picker}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </Animatable.View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
          <Text style={styles.saveText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, justifyContent: 'center' },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1e1e1e',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: { width: '100%', alignItems: 'center' },
  input: {
    width: '95%',
    height: 60,
    borderColor: '#FFD700',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 16,
  },
  pickerContainer: { width: '95%', marginBottom: 20 },
  pickerLabel: { color: '#bbb', marginBottom: 5, fontSize: 16 },
  picker: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 15,
  },
  saveText: {
    color: '#121212',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileSetupScreen;
