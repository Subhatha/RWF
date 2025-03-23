import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { firebase } from '../firebase/firebaseConfig';

function WorkoutScreen({ navigation }) {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            generateWorkoutPlan(userData);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };


    fetchUserData();
  }, []);

  const generateWorkoutPlan = (userData) => {
    let plans = [];

    // Body Type based plan
    if (userData.bodyType === 'slim') {
      plans = [
        { id: 1, name: 'Muscle Gain Routine', description: 'Strength-focused training with calisthenics.' },
        { id: 2, name: 'Endurance Boost', description: 'Increase stamina with full-body movements.' },
      ];
    } else if (userData.bodyType === 'medium') {
      plans = [
        { id: 3, name: 'Balanced Fitness', description: 'Strength + mobility + flexibility training.' },
        { id: 4, name: 'HIIT Blast', description: 'High-intensity training to stay fit.' },
      ];
    } else if (userData.bodyType === 'fat') {
      plans = [
        { id: 5, name: 'Fat Burn Extreme', description: 'Cardio + strength for weight loss.' },
        { id: 6, name: 'Core Strength', description: 'Build core and back muscles.' },
      ];
    }

    // Adding Height, Weight, and Gender based logic
    if (userData.height && userData.weight) {
      if (userData.height < 160) {  // If short height (<160 cm)
        plans.push({ id: 7, name: 'Compact Strength', description: 'Tailored for shorter individuals with a focus on strength and muscle building.' });
      } else if (userData.height >= 160 && userData.height <= 180) {  // If medium height (160-180 cm)
        plans.push({ id: 8, name: 'Full Body Conditioning', description: 'Build strength, flexibility, and mobility.' });
      } else {  // Taller individuals (>180 cm)
        plans.push({ id: 9, name: 'Height Advantage', description: 'Focus on strength training and endurance for taller builds.' });
      }

      if (userData.weight <= 50) {  // If underweight
        plans.push({ id: 10, name: 'Weight Gain Strength', description: 'Strength-focused workouts to help build muscle mass.' });
      } else if (userData.weight > 50 && userData.weight <= 80) {  // Normal weight
        plans.push({ id: 11, name: 'Strength & Endurance', description: 'Balanced training for both strength and endurance.' });
      } else {  // Overweight
        plans.push({ id: 12, name: 'Weight Loss Conditioning', description: 'Focus on fat burning and muscle toning.' });
      }
    }

    // Gender specific workouts
    if (userData.gender === 'male') {
      plans.push({ id: 13, name: 'Upper Body Strength', description: 'Focus on chest, shoulders, and arms for male body types.' });
    } else if (userData.gender === 'female') {
      plans.push({ id: 14, name: 'Lower Body Strength', description: 'Focus on legs and glutes for female body types.' });
    }

    setWorkoutPlans(plans);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007FFF" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Personalized Workout Plans</Text>
      {workoutPlans.map((workout) => (
        <View key={workout.id} style={styles.workoutCard}>
          <Text style={styles.workoutName}>{workout.name}</Text>
          <Text style={styles.workoutDescription}>{workout.description}</Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('WorkoutDataLog', { workoutId: workout.id, workoutName: workout.name })}
          >
            <Text style={styles.buttonText}>Start Workout</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f7f7f7' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  workoutCard: { backgroundColor: '#fff', padding: 20, marginBottom: 15, borderRadius: 10, elevation: 3 },
  workoutName: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
  workoutDescription: { fontSize: 16, color: '#555', marginBottom: 10 },
  button: { backgroundColor: '#007FFF', paddingVertical: 10, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default WorkoutScreen;
