import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

function WorkoutScreen({ navigation }) {
  const workoutPlans = [
    { id: 1, name: 'Full Body Strength', description: 'A full body workout focusing on strength building.' },
    { id: 2, name: 'HIIT Workout', description: 'High-intensity interval training to burn fat fast.' },
    { id: 3, name: 'Core & Abs', description: 'Target your core with these abdominal exercises.' },
    { id: 4, name: 'Cardio Blast', description: 'Get your heart pumping with this cardio workout.' },
    { id: 5, name: 'Flexibility & Yoga', description: 'Improve flexibility and strength with yoga stretches.' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Workout Plans</Text>
      <Text style={styles.subtitle}>Choose a workout that suits your fitness goals.</Text>

      {workoutPlans.map((workout) => (
        <View key={workout.id} style={styles.workoutCard}>
          <Text style={styles.workoutName}>{workout.name}</Text>
          <Text style={styles.workoutDescription}>{workout.description}</Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate(`Workout${workout.id}`)}
          >
            <Text style={styles.buttonText}>Start Workout</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginBottom: 30,
  },
  workoutCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
  },
  workoutName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  workoutDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007FFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WorkoutScreen;
