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
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.mainContent}>
          <Text style={styles.title}>Relax with Flex</Text>
          <Text style={styles.subtitle}>Your ultimate fitness companion</Text>

          <View style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Workout')}
            >
              <FontAwesome5 name="dumbbell" size={40} color="#FFD700" />
              <Text style={styles.cardTitle}>Workout Plans</Text>
              <Text style={styles.cardText}>Get personalized training programs</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Progress')}
            >
              <FontAwesome5 name="running" size={40} color="#4CAF50" />
              <Text style={styles.cardTitle}>Track Progress</Text>
              <Text style={styles.cardText}>Monitor your fitness journey</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Equipments')}
            >
              <FontAwesome5 name="weight" size={40} color="#FFD700" />
              <Text style={styles.cardTitle}>Gym Equipment</Text>
              <Text style={styles.cardText}>Explore the best training tools</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Schedule')}
            >
              <FontAwesome5 name="calendar-alt" size={40} color="#dc3545" />
              <Text style={styles.cardTitle}>Schedule Sessions</Text>
              <Text style={styles.cardText}>Book training & yoga classes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={openModal}
            >
              <FontAwesome5 name="info-circle" size={40} color="#FF8500" />
              <Text style={styles.cardTitle}>Learn More</Text>
              <Text style={styles.cardText}>Discover more features of the app</Text>
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
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>More Information</Text>
            <Text style={styles.modalText}>
              This app helps you improve your fitness by offering personalized workout plans, progress tracking, and easy scheduling.
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


// Modernized Navigation Bar with Transparent Background
HomeScreen.navigationOptions = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: 'transparent', // Transparent header for modern look
    elevation: 0, // Remove shadow for flat design
    borderBottomWidth: 0, // Remove bottom border
  },
  headerTintColor: '#FFD700', // Bright gold for icons and text
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFD700', // Gold color for title
    textAlign: 'center', // Center the title
  },
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.navIconContainer}>
      <FontAwesome5 name="bars" size={24} color="#FFD700" />
    </TouchableOpacity>
  ),
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.navIconContainer}>
      <FontAwesome5 name="user" size={24} color="#FFD700" />
    </TouchableOpacity>
  ),
});

// Styles for the navigation icons
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#212121', // Dark background for modern theme
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
    color: '#FFD700', // Gold color for the title
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 30,
    textAlign: 'center',
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#333', // Dark background for cards
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
    color: '#FFD700', // Bright gold for card titles
    marginVertical: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#ccc', // Light gray text for better contrast
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background for modal
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
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
    backgroundColor: '#4CAF50', // Fitness-friendly green for modal button
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navIconContainer: {
    marginHorizontal: 15,
    padding: 10,
  },
});

export default HomeScreen;
