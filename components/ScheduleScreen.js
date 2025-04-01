
// ScheduleScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

function ScheduleScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [sessions, setSessions] = useState([]);

  const availableSessions = {
    '2025-03-05': [
      { id: 1, name: 'Morning Yoga', time: '7:00 AM' },
      { id: 2, name: 'Evening Strength Training', time: '5:00 PM' },
    ],
    '2025-03-06': [
      { id: 3, name: 'HIIT Training', time: '6:00 AM' },
      { id: 4, name: 'Afternoon Yoga', time: '12:00 PM' },
    ],
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setSessions(availableSessions[day.dateString] || []);
  };

  const handleBookSession = (sessionName) => {
    alert(`You have booked: ${sessionName}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule Sessions</Text>
      <Text style={styles.subtitle}>Book your training & yoga classes</Text>

      {/* Calendar Component */}
      <Calendar
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#007FFF' },
        }}
        onDayPress={handleDayPress}
        style={styles.calendar}
        theme={{
          selectedDayBackgroundColor: '#007FFF',
          todayTextColor: '#007FFF',
          arrowColor: '#007FFF',
        }}
      />

      {/* Display available sessions for selected date */}
      <Text style={styles.sessionTitle}>Available Sessions</Text>
      {sessions.length > 0 ? (
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.sessionCard}
              onPress={() => handleBookSession(item.name)}
            >
              <Text style={styles.sessionName}>{item.name}</Text>
              <Text style={styles.sessionTime}>{item.time}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noSessions}>No sessions available for this date</Text>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => alert('Add a new session feature coming soon!')}
      >
        <FontAwesome5 name="plus-circle" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Add a Session</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007FFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  calendar: {
    marginBottom: 30,
    width: '90%',
  },
  sessionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sessionCard: {
    backgroundColor: '#007FFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
  },
  sessionName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sessionTime: {
    color: '#fff',
    fontSize: 14,
  },
  noSessions: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#007FFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ScheduleScreen;
