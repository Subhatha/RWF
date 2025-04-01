import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


const lightTheme = {
  background: '#FFFFFF',
  text: '#000000',
  secondaryText: '#7f8c8d',
  card: '#ecf0f1',
  primary: '#3498db',
  modalBackground: 'rgba(0, 0, 0, 0.5)',
};

const darkTheme = {
  background: '#121212',
  text: '#FFFFFF',
  secondaryText: '#bdc3c7',
  card: '#2c3e50',
  primary: '#2980b9',
  modalBackground: 'rgba(0, 0, 0, 0.7)',
};

// You can decide which theme you want to use directly here
const theme = darkTheme; // or lightTheme

function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <LinearGradient colors={['#1e1e1e', '#121212']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.mainContent}>
          <Text style={[styles.title, { color: theme.text }]}>Relax with Flex</Text>
          <Text style={[styles.subtitle, { color: theme.secondaryText }]}>Your ultimate fitness companion</Text>

          <View style={styles.cardContainer}>
            <TouchableOpacity
              style={[styles.card, { backgroundColor: theme.card }]}
              onPress={() => navigation.navigate('Workout')}
            >
              <FontAwesome5 name="dumbbell" size={40} color="#FFD700" />
              <Text style={[styles.cardTitle, { color: theme.text }]}>Workout Plans</Text>
              <Text style={[styles.cardText, { color: theme.secondaryText }]}>Get personalized training programs</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card, { backgroundColor: theme.card }]}
              onPress={() => navigation.navigate('Progress')}
            >
              <FontAwesome5 name="running" size={40} color="#4CAF50" />
              <Text style={[styles.cardTitle, { color: theme.text }]}>Track Progress</Text>
              <Text style={[styles.cardText, { color: theme.secondaryText }]}>Monitor your fitness journey</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card, { backgroundColor: theme.card }]}
              onPress={() => navigation.navigate('Equipments')}
            >
              <FontAwesome5 name="weight" size={40} color="#FFD700" />
              <Text style={[styles.cardTitle, { color: theme.text }]}>Gym Equipment</Text>
              <Text style={[styles.cardText, { color: theme.secondaryText }]}>Explore the best training tools</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card, { backgroundColor: theme.card }]}
              onPress={() => navigation.navigate('Schedule')}
            >
              <FontAwesome5 name="calendar-alt" size={40} color="#dc3545" />
              <Text style={[styles.cardTitle, { color: theme.text }]}>Schedule Sessions</Text>
              <Text style={[styles.cardText, { color: theme.secondaryText }]}>Book training & yoga classes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card, { backgroundColor: theme.card }]}
              onPress={openModal}
            >
              <FontAwesome5 name="info-circle" size={40} color="#FF8500" />
              <Text style={[styles.cardTitle, { color: theme.text }]}>Learn More</Text>
              <Text style={[styles.cardText, { color: theme.secondaryText }]}>Discover more features of the app</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal to display more information */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={[styles.modalContainer, { backgroundColor: theme.modalBackground }]}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>More Information</Text>
            <Text style={[styles.modalText, { color: theme.secondaryText }]}>
              This app helps you improve your fitness by offering personalized workout plans, progress tracking, and easy scheduling.
            </Text>
            <TouchableOpacity onPress={closeModal} style={[styles.modalButton, { backgroundColor: theme.primary }]}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

// Styles for the navigation icons
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  mainContent: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    borderRadius: 12,
    padding: 25,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
    width: '90%',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  cardText: {
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ensure transparency for the modal background
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
