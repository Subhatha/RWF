import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { firebase } from '../firebase/firebaseConfig';
import workoutData from '../Data/workoutData.json';

const WorkoutScreen = () => {
  const [loading, setLoading] = useState(true);
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [error, setError] = useState(null);
  const [completedExercises, setCompletedExercises] = useState([]);

  const isInRange = (value, rangeString) => {
    if (!rangeString) return false;
    const [min, max] = rangeString.split('-').map(Number);
    return value >= min && value <= max;
  };

  const findWorkoutPlan = useCallback((user) => {
    if (!user) return null;

    const age = parseInt(user.age);
    const height = parseInt(user.height);
    const weight = parseInt(user.weight);
    const bodyType = user.bodyType?.toLowerCase();

    return workoutData.find((plan) => {
      const ageRange = plan.Age || '';
      const heightRange = plan.Height || '';
      const weightRange = plan.Weight || '';
      const planBodyType = plan.BodyType?.toLowerCase();

      return (
        isInRange(age, ageRange) &&
        isInRange(height, heightRange) &&
        isInRange(weight, weightRange) &&
        planBodyType === bodyType
      );
    });
  }, []);

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (!user) return;

        const snapshot = await firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .collection('userWorkouts')
          .get();

        const completed = snapshot.docs.map((doc) => doc.data().exercise);
        setCompletedExercises(completed);
      } catch (err) {
        console.error('Error fetching completed workouts:', err);
      }
    };

    fetchCompleted();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (!user) {
          setError('User not logged in');
          setLoading(false);
          return;
        }
        const doc = await firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .get();
        if (!doc.exists) {
          setError('User profile not found');
          setLoading(false);
          return;
        }
        const userData = doc.data();
        const matchedPlan = findWorkoutPlan(userData);
        if (!matchedPlan) {
          setError('No matching workout plan found for your profile.');
          setLoading(false);
          return;
        }
        setWorkoutPlan(matchedPlan.WorkoutPlan);
      } catch (err) {
        console.error(err);
        setError('Failed to load workout plan');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [findWorkoutPlan]);

  const markWorkoutDone = async (exercise, repsOrTime) => {
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        Alert.alert('User not logged in');
        return;
      }

      const timestamp = firebase.firestore.FieldValue.serverTimestamp();

      await firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .collection('userWorkouts')
        .add({
          exercise,
          repsOrTime,
          timestamp,
        });

      setCompletedExercises((prev) => [...prev, exercise]);

      Alert.alert('✅ Done', `${exercise} marked as completed!`);
    } catch (error) {
      console.error('❌ Error saving workout:', error);
      Alert.alert('Error', 'Failed to save workout data');
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  if (error)
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Workout Plan</Text>
      <FlatList
        data={workoutPlan}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const repsOrTime = item.Reps || item.Time || 'N/A';
          const isDone = completedExercises.includes(item.Exercise);

          return (
            <View style={styles.exerciseItem}>
              <Text style={styles.exerciseName}>{item.Exercise}</Text>
              <Text style={styles.exerciseCategory}>{item.Category}</Text>
              <Text style={styles.exerciseReps}>
                {item.Reps ? `Reps: ${item.Reps}` : `Time: ${item.Time}`}
              </Text>

              <TouchableOpacity
                style={[
                  styles.doneButton,
                  isDone && { backgroundColor: '#00cc66' },
                ]}
                onPress={() => {
                  if (!isDone) {
                    markWorkoutDone(item.Exercise, repsOrTime);
                  }
                }}
                disabled={isDone}
              >
                <Text style={styles.doneButtonText}>
                  {isDone ? '✅ Done' : 'Mark as Done'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e1e1e',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
  },
  exerciseItem: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  exerciseCategory: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#bbb',
    marginTop: 4,
  },
  exerciseReps: {
    fontSize: 16,
    color: '#FFD700',
    marginTop: 6,
  },
  doneButton: {
    backgroundColor: '#FFD700',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#121212',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default WorkoutScreen;
