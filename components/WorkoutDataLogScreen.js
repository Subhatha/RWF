import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function WorkoutDataLogScreen({ route, navigation }) {
  const { workoutId, workoutName } = route.params;  // Retrieve params passed during navigation

  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');

  const handleSaveLog = () => {
    console.log('Workout Log Saved:', { workoutId, workoutName, sets, reps, weight });
    navigation.goBack(); // Go back after saving the log
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workoutName}</Text>
      <TextInput
        style={styles.input}
        placeholder="Sets"
        value={sets}
        onChangeText={setSets}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Reps"
        value={reps}
        onChangeText={setReps}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveLog}>
        <Text style={styles.buttonText}>Save Log</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007FFF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WorkoutDataLogScreen;
