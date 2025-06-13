import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { firebase } from '../firebase/firebaseConfig';
import * as Animatable from 'react-native-animatable';

const DROPDOWN_ITEMS_BODYTYPE = [
  { label: 'Slim', value: 'slim' },
  { label: 'Medium', value: 'medium' },
  { label: 'Fat', value: 'fat' },
];

const DROPDOWN_ITEMS_GENDER = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

const Dropdown = ({ label, items, selectedValue, onValueChange }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    onValueChange(value);
    setOpen(false);
  };

  const selectedLabel =
    items.find((item) => item.value === selectedValue)?.label ||
    `Select ${label.toLowerCase()}...`;

  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.pickerLabel}>{label}</Text>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setOpen(!open)}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.dropdownButtonText,
            !selectedValue && { color: '#888' },
          ]}
        >
          {selectedLabel}
        </Text>
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdownList}>
          <ScrollView nestedScrollEnabled style={{ maxHeight: 150 }}>
            {items.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.dropdownItem}
                onPress={() => handleSelect(item.value)}
              >
                <Text style={styles.dropdownItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const ProfileSetupScreen = ({ navigation, onProfileComplete }) => {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [gender, setGender] = useState('');

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
      if (onProfileComplete) {
        onProfileComplete();
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while saving your profile.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Complete Your Profile</Text>

        <Animatable.View
          animation="fadeInUp"
          delay={300}
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#bbb"
            value={username}
            onChangeText={setUsername}
          />
        </Animatable.View>

        <Animatable.View
          animation="fadeInUp"
          delay={500}
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.input}
            placeholder="Age"
            placeholderTextColor="#bbb"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
        </Animatable.View>

        <Animatable.View
          animation="fadeInUp"
          delay={700}
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.input}
            placeholder="Height (cm)"
            placeholderTextColor="#bbb"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
        </Animatable.View>

        <Animatable.View
          animation="fadeInUp"
          delay={900}
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.input}
            placeholder="Weight (kg)"
            placeholderTextColor="#bbb"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
        </Animatable.View>

        <Animatable.View
          animation="fadeInUp"
          delay={1100}
          style={{ width: '95%', marginBottom: 20 }}
        >
          <Dropdown
            label="Body Type"
            items={DROPDOWN_ITEMS_BODYTYPE}
            selectedValue={bodyType}
            onValueChange={setBodyType}
          />
        </Animatable.View>

        <Animatable.View
          animation="fadeInUp"
          delay={1300}
          style={{ width: '95%', marginBottom: 20 }}
        >
          <Dropdown
            label="Gender"
            items={DROPDOWN_ITEMS_GENDER}
            selectedValue={gender}
            onValueChange={setGender}
          />
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
  dropdownContainer: {
    backgroundColor: '#333',
    borderWidth: 1.5,
    borderColor: '#FFD700',
    borderRadius: 10,
  },
  pickerLabel: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 5,
  },
  dropdownButton: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  dropdownButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  dropdownList: {
    backgroundColor: '#444',
    borderTopWidth: 1,
    borderTopColor: '#FFD700',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    maxHeight: 150,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownItemText: {
    color: '#fff',
    fontSize: 16,
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
