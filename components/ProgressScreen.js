// ProgressScreen.js

import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { firebase } from '../firebase/firebaseConfig';  // Import Firebase functions

function ProgressScreen() {
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  const [weightProgress, setWeightProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setCompletedWorkouts(userData.completedWorkouts || []);
            setWeightProgress(userData.weightProgress || []);
          }
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#007FFF" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Progress</Text>
      <Text style={styles.subtitle}>Track your progress over time</Text>

      {/* Weight Progress Chart */}
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{ data: weightProgress, strokeWidth: 2 }],
          }}
          width={Dimensions.get('window').width - 30}
          height={220}
          yAxisLabel="kg"
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 127, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 127, 255, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: '6', strokeWidth: '2', stroke: '#00FFFF' },
          }}
          bezier
        />
      </View>

      {/* Workout Completion Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.sectionTitle}>Workout Completion</Text>
        <Text style={styles.progressText}>
          Workouts Completed: {completedWorkouts.length}
        </Text>
        {completedWorkouts.map((workout, index) => (
          <Text key={index} style={styles.workoutItem}>• {workout}</Text>
        ))}
      </View>

      {/* Motivational Message */}
      <View style={styles.motivationContainer}>
        <Text style={styles.motivationText}>
          "Progress is progress, no matter how small. Keep going, you're doing amazing!"
        </Text>
      </View>
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
  chartContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  summaryContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
  },
  workoutItem: {
    fontSize: 16,
    color: '#555',
  },
  motivationContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    elevation: 5,
  },
  motivationText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default ProgressScreen;
