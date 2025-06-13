import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <LinearGradient colors={['#1e1e1e', '#121212']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
        <View style={styles.mainContent}>
          <Text style={styles.title}>Relax with Flex</Text>
          <Text style={styles.subtitle}>Your ultimate fitness companion</Text>

          <View style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Workout')}
              activeOpacity={0.8}
            >
              <FontAwesome5 name="dumbbell" size={40} color="#FFD700" />
              <Text style={styles.cardTitle}>Workout Plans</Text>
              <Text style={styles.cardText}>Get personalized training programs</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Progress')}
              activeOpacity={0.8}
            >
              <FontAwesome5 name="running" size={40} color="#4CAF50" />
              <Text style={styles.cardTitle}>Track Progress</Text>
              <Text style={styles.cardText}>Monitor your fitness journey</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Equipment')}
              activeOpacity={0.8}
            >
              <FontAwesome5 name="weight" size={40} color="#FFD700" />
              <Text style={styles.cardTitle}>Gym Equipment</Text>
              <Text style={styles.cardText}>Explore the best training tools</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Recent')}
              activeOpacity={0.8}
            >
              <FontAwesome5 name="calendar-alt" size={40} color="#dc3545" />
              <Text style={styles.cardTitle}>Recent Workouts</Text>
              <Text style={styles.cardText}>Previous Workouts</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.card}
              onPress={openModal}
              activeOpacity={0.8}
            >
              <FontAwesome5 name="info-circle" size={40} color="#FF8500" />
              <Text style={styles.cardTitle}>Learn More</Text>
              <Text style={styles.cardText}>Discover more features of the app</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
  visible={modalVisible}
  transparent
  animationType="slide"
  onRequestClose={closeModal}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>More Information</Text>
      <Text style={styles.modalText}>
        This app helps you improve your fitness by offering personalized workout plans and progress tracking.
      </Text>
      <Text style={[styles.modalText, { marginTop: 10 }]}>
        Developed by Subhatha Senanayake, Abhay Anil, and Yatin — passionate about fitness and technology. We aim to create easy-to-use apps that help people lead healthier lives.
      </Text>
      <Text style={[styles.modalText, { marginTop: 10 }]}>
        Relax with Flex is your ultimate fitness companion designed to motivate and support your fitness journey through smart features and personalized plans.
      </Text>
      <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
        <Text style={styles.modalButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#121212',
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
    color: '#FFD700',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#bbb',
    marginBottom: 30,
    textAlign: 'center',
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 25,
    marginBottom: 20,
    alignItems: 'center',
    width: '90%',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginVertical: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(18, 18, 18, 0.8)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#222',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
