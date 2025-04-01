import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator, ProgressBarAndroid } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { firebase } from '../firebase/firebaseConfig';

function ProgressScreen() {
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  const [weightProgress, setWeightProgress] = useState([]);
  const [totalWorkoutDuration, setTotalWorkoutDuration] = useState(0);
  const [workoutProgress, setWorkoutProgress] = useState({});
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

          const progressDoc = await firebase.firestore().collection('users').doc(user.uid).collection('progress').doc('workouts').get();
          if (progressDoc.exists) {
            setWorkoutProgress(progressDoc.data().workouts || {});
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

      <View style={styles.summaryContainer}>
        <Text style={styles.sectionTitle}>Workout Completion</Text>
        {Object.keys(workoutProgress).length > 0 ? (
          Object.entries(workoutProgress).map(([exercise, data]) => (
            <View key={exercise} style={styles.progressItem}>
              <Text style={styles.exerciseName}>{exercise}</Text>
              <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={data.completed / data.goal}
              />
              <Text style={styles.progressText}>{data.completed} / {data.goal} completed</Text>
            </View>
          ))
        ) : (
          <Text style={styles.progressText}>No workouts tracked yet.</Text>
        )}
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.sectionTitle}>Total Workout Duration</Text>
        <Text style={styles.progressText}>Total Time Spent Working Out: {totalWorkoutDuration.toFixed(2)} minutes</Text>
      </View>

      <View style={styles.motivationContainer}>
        <Text style={styles.motivationText}>
          "Progress is progress, no matter how small. Keep going, you're doing amazing!"
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f7f7f7' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 18, textAlign: 'center', color: '#555', marginBottom: 30 },
  chartContainer: { alignItems: 'center', marginBottom: 30 },
  summaryContainer: { marginBottom: 30 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  progressText: { fontSize: 18, color: '#333', marginBottom: 15 },
  progressItem: { marginBottom: 15 },
  exerciseName: { fontSize: 20, fontWeight: 'bold' },
  motivationContainer: { marginTop: 20, padding: 20, backgroundColor: '#f2f2f2', borderRadius: 10, elevation: 5 },
  motivationText: { fontSize: 18, color: '#333', textAlign: 'center', fontStyle: 'italic' },
});

export default ProgressScreen;
