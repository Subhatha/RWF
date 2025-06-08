import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { firebase } from '../firebase/firebaseConfig';

// Utility to show "x days ago" style date
const timeAgo = (timestamp) => {
  if (!timestamp) return '';
  const now = new Date();
  const past = new Date(timestamp.seconds * 1000);
  const diffMs = now - past;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays} days ago`;
};

function ScheduleScreen({ navigation }) {
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCompletedWorkouts = useCallback(async () => {
    try {
      const user = firebase.auth().currentUser;
      if (!user) return;

      const snapshot = await firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .collection('userWorkouts')
        .orderBy('timestamp', 'desc')
        .limit(20)
        .get();

      const workouts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCompletedWorkouts(workouts);
    } catch (error) {
      console.error('Error fetching completed workouts', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchCompletedWorkouts();
  }, [fetchCompletedWorkouts]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCompletedWorkouts();
  };

  const renderWorkout = ({ item }) => (
    <View style={styles.workoutCard}>
      <Text style={styles.workoutName}>{item.exercise}</Text>
      <Text style={styles.workoutDetails}>
        {item.repsOrTime} — {timeAgo(item.timestamp)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {navigation && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.title}>Your Recent Workouts</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 40 }} />
      ) : completedWorkouts.length === 0 ? (
        <View style={styles.noWorkoutsContainer}>
          <Text style={styles.noWorkoutsText}>No completed workouts found.</Text>
          <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={completedWorkouts}
          keyExtractor={(item) => item.id}
          renderItem={renderWorkout}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#FFD700"
            />
          }
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    marginBottom: 15,
  },
  backButtonText: {
    color: '#FFD700',
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
  },
  workoutCard: {
    backgroundColor: '#333',
    padding: 18,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  workoutName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  workoutDetails: {
    fontSize: 16,
    color: '#FFD700',
    marginTop: 8,
  },
  noWorkoutsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  noWorkoutsText: {
    fontSize: 18,
    color: '#999',
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: '#1e1e1e',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScheduleScreen;
