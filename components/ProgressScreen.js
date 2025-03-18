import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

function ProgressScreen() {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [47, 48, 48.5, 49, 49.2, 50, 50.5], 
        strokeWidth: 2, 
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Progress</Text>
      <Text style={styles.subtitle}>Track your progress over time</Text>

      {/* Progress Chart */}
      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={Dimensions.get('window').width - 30} 
          height={220}
          yAxisLabel="kg"
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 127, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 127, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#00FFFF',
            },
          }}
          bezier
        />
      </View>

      {/* Progress Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        <View style={styles.activityContainer}>
          <Text style={styles.activityText}>- Completed 30-minute workout session</Text>
          <Text style={styles.activityText}>- Ate 5 servings of vegetables today</Text>
          <Text style={styles.activityText}>- Walked 10,000 steps</Text>
        </View>
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
  activityContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  activityText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
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
