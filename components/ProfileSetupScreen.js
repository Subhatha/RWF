import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Picker, ScrollView } from 'react-native';
import { firebase } from '../firebase/firebaseConfig'; 
import * as Animatable from 'react-native-animatable'; 

const ProfileSetupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bodyType, setBodyType] = useState('slim'); 

  const handleSaveProfile = async () => {
    if (!username || !age || !height || !weight || !bodyType) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      const user = firebase.auth().currentUser;
      
      await firebase.firestore().collection('users').doc(user.uid).set({
        username: username,
        age: age,
        height: height,
        weight: weight,
        bodyType: bodyType,
        profileCompleted: true, 
      });

      Alert.alert('Success', 'Profile saved successfully!');
      navigation.replace('Login');  
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
            style={styles.picker}
            onValueChange={(itemValue) => setBodyType(itemValue)}
          >
            <Picker.Item label="Slim" value="slim" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="Fat" value="fat" />
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1e1e1e', // Dark background to match the login screen
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFD700', // Gold color for the title
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '95%',
    height: 60,
    borderColor: '#FFD700', // Gold border color
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#333', // Dark input background
    color: '#fff', // White text color
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  pickerContainer: {
    width: '95%',
    marginBottom: 20,
  },
  pickerLabel: {
    color: '#fff', // White label color
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    width: '100%',
    height: 60,
    borderColor: '#FFD700', // Gold border color for picker
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: '#333', // Dark background
    color: '#fff', // White text color
  },
  saveButton: {
    width: '95%',
    height: 60,
    backgroundColor: '#FFD700', // Gold button
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  saveText: {
    color: '#121212', // Dark text color for contrast
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProfileSetupScreen;
