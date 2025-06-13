import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { firebase } from '../firebase/firebaseConfig';

function ProgressScreen() {
  const [loading, setLoading] = useState(true);
  const [dailyCompletion, setDailyCompletion] = useState({}); // { dateStr: number of exercises completed (0-5) }

  useEffect(() => {
    let intervalId;

    const fetchUserWorkouts = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (!user) return;

        const snapshot = await firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .collection('userWorkouts')
          .orderBy('timestamp', 'asc')
          .get();

        const dailyMap = {};

        snapshot.forEach(doc => {
          const data = doc.data();
          if (!data.timestamp) return;

          // Get date string YYYY-MM-DD from timestamp
          const dateStr = data.timestamp.toDate().toISOString().slice(0, 10);

          // Count each completed exercise doc as 1
          dailyMap[dateStr] = (dailyMap[dateStr] || 0) + 1;
        });

        // Cap daily count at 5 max
        Object.keys(dailyMap).forEach(date => {
          if (dailyMap[date] > 5) dailyMap[date] = 5;
        });

        setDailyCompletion(dailyMap);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setLoading(false);
      }
    };

    // Fetch once immediately on mount
    fetchUserWorkouts();

    // Set interval to fetch every 1 second
    intervalId = setInterval(fetchUserWorkouts, 1000);

    // Clear interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const getStatus = (completed) => {
    const pct = (completed / 5) * 100;
    if (pct === 0) return { emoji: '😴', phrase: 'No workout today. Rest up!' };
    if (pct < 40) return { emoji: '🐢', phrase: 'Slow start. Keep moving!' };
    if (pct < 80) return { emoji: '🙂', phrase: 'Good job! Almost there.' };
    if (pct < 100) return { emoji: '💪', phrase: 'Great! Nearly complete!' };
    return { emoji: '🔥', phrase: 'Perfect! You crushed it!' };
  };

  const today = new Date();
  const last7Days = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const isoDate = d.toISOString().slice(0, 10);
    last7Days.push({
      label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      isoDate,
      completed: dailyCompletion[isoDate] || 0,
    });
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#FFD700" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Weekly Workout Progress</Text>

      {last7Days.map(({ label, isoDate, completed }) => {
        const { emoji, phrase } = getStatus(completed);

        return (
          <View key={isoDate} style={styles.dayCard}>
            <Text style={styles.dateLabel}>{label}</Text>
            <Text style={styles.emoji}>{emoji}</Text>
            <View style={styles.progressDots}>
              {[...Array(5)].map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    i < completed ? styles.dotFilled : styles.dotEmpty,
                  ]}
                />
              ))}
            </View>
            <Text style={styles.phrase}>{phrase}</Text>
            <Text style={styles.countText}>
              {completed} / 5 exercises completed
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
  },
  dayCard: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFD700',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  progressDots: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginHorizontal: 4,
  },
  dotFilled: {
    backgroundColor: '#FFD700',
  },
  dotEmpty: {
    backgroundColor: '#444',
  },
  phrase: {
    color: '#ccc',
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 6,
    textAlign: 'center',
  },
  countText: {
    color: '#aaa',
    fontSize: 14,
  },
});

export default ProgressScreen;
