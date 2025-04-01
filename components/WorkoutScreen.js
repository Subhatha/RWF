import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { firebase } from '../firebase/firebaseConfig';
import workoutData from '../Data/workoutData.json'; // Load JSON directly

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
    const matchedPlan = workoutData.find(plan => 
      userData.age >= parseInt(plan.Age.split('-')[0]) &&
      userData.age <= parseInt(plan.Age.split('-')[1]) &&
      userData.height >= parseInt(plan.Height.split('-')[0]) &&
      userData.height <= parseInt(plan.Height.split('-')[1]) &&
      userData.weight >= parseInt(plan.Weight.split('-')[0]) &&
      userData.weight <= parseInt(plan.Weight.split('-')[1]) &&
      userData.bodyType === plan.BodyType
    );

    setWorkoutPlans(matchedPlan ? matchedPlan.WorkoutPlan : []);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007FFF" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Personalized Workout</Text>
      {workoutPlans.length > 0 ? (
        workoutPlans.map((workout, index) => (
          <View key={index} style={styles.workoutCard}>
            <Text style={styles.workoutName}>{workout.Exercise}</Text>
            <Text style={styles.category}>Category: {workout.Category}</Text>
            <Text style={styles.workoutDescription}>{workout.Reps}</Text>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => navigation.navigate('WorkoutDataLog', { workoutName: workout.Exercise })}
            >
              <Text style={styles.buttonText}>Start Exercise</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noWorkoutText}>No matching workout plan found</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f7f7f7' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  workoutCard: { backgroundColor: '#fff', padding: 20, marginBottom: 15, borderRadius: 10, elevation: 3 },
  workoutName: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
  category: { fontSize: 18, color: '#666', marginBottom: 5 },
  workoutDescription: { fontSize: 16, color: '#555', marginBottom: 10 },
  button: { backgroundColor: '#007FFF', paddingVertical: 10, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  noWorkoutText: { textAlign: 'center', fontSize: 18, color: 'red', marginTop: 20 }
});

export default WorkoutScreen;
