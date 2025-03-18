import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Linking, TextInput, Modal, TouchableWithoutFeedback } from 'react-native';

const productsData = [
  {
    id: '1',
    name: 'Dumbbells',
    description: 'Perfect for building muscle strength, great for upper body exercises.',
    image: 'hjhjjhh',
    category: 'Equipment',
    amazonLink: 'https://www.amazon.de/EnterSports-Adjustable-Dumbbells-Space-Saving-Non-Slip/dp/B0D1P694JJ/ref=sr_1_4_sspa?crid=MGZDMASUKBKY&dib=eyJ2IjoiMSJ9.r8_AmvvOSyu4-3B3ViFga5dosPw1tzKbTqxYZL7XDanpPQTh8VlDZO_bH8ukgtDgtycGUSTUGjXbcc83Z1wy8UEfU2gnRxeiuYyZqkBECqY6l1e3wfq4WKgJoU4HRPcq6DklwA_qo-K1GkAmksjmu8hx_p0J0gAtnYKmPoDA2IohJ8Va5Ke7IIxkAemhRJIm9mUXvkbQK2F3LHUoZLXFu82pY-9kXHcTp14xuQC3SLj3sWVQge7w_-jlb9Ifsi5DlGuL9FZ0MAumnvSw85R-1sQQ7H7vxLCWuolBpqAAwag.cC0OIuEGiRQMQcsgZOCSCP951ik2XLHniJCM2X072yQ&dib_tag=se&keywords=dumbbells&qid=1742216059&sprefix=dumbels%2Caps%2C168&sr=8-4-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1',
  },
  {
    id: '2',
    name: 'Resistance Bands',
    description: 'Ideal for strength training and stretching exercises.',
    image: 'gjhjhgjhgjg',
    category: 'Equipment',
    amazonLink: 'https://www.amazon.de/Resistance-Training-Instructions-Stretching-Strength/dp/B0BHVP99NJ/ref=sr_1_2_sspa?crid=39O46JPFTHZNT&dib=eyJ2IjoiMSJ9.-lOSne1vxJAIfqG5mqgY6FOo3700stWokCm8C0JYh6iiY8sz5KipNJujiViMW96dYJObnfpGY7IhfzbzwYYUiV5omzNn8k0Vv-hHPk1w0GpSsNWyOQKFlMeKoJkpYb_PDC39QiZbBkMNgi0SYrcL6UXMau2YPU2Yxn7WUzeN5UofFLcYmeQylzL9ZbXuEPZ-anh91UqYHdUM7mH-rVgXxJsm4qxn-YR0SVY-dIRJD4YjXc4r6vxMvEIrPURimCq1SjGCWUOUS1gP4vOO9MVsmv2glLqC24tiOl1TjT4qNFA.8yXFM10b6jYbOw20Sgcv3nN2hu0q9fyyVvdlKeBCFj0&dib_tag=se&keywords=resistance%2Bbands&qid=1742216119&sprefix=resistance%2Caps%2C194&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1',
  },
  {
    id: '3',
    name: 'Treadmill',
    description: 'Great for cardiovascular fitness and fat loss.',
    image: 'jhgjhgjh',
    category: 'Equipment',
    amazonLink: 'jhvjhvjvjh',
  },
  {
    id: '4',
    name: 'Yoga Mat',
    description: 'Essential for yoga, stretching, and floor exercises.',
    image: 'jhgjhgjgg',
    category: 'Equipment',
    amazonLink: 'nbjhbjhb',
  },
  {
    id: '5',
    name: 'Whey Protein',
    description: 'Perfect for post-workout recovery and muscle building.',
    image: 'ghfgfjhj',
    category: 'Protein',
    amazonLink: 'hgjhbjbjn',
  },
  {
    id: '6',
    name: 'Casein Protein',
    description: 'Slow-digesting protein, ideal for overnight muscle recovery.',
    image: 'hgjhvjvjhvhv',
    category: 'Protein',
    amazonLink: 'hbjhbjhbj',
  },
  {
    id: '7',
    name: 'BCAA',
    description: 'Helps with muscle recovery and reduces soreness.',
    image: 'jkhkjhkjhk',
    category: 'Supplement',
    amazonLink: 'jhjhgjh',
  },
  {
    id: '8',
    name: 'Pre-Workout',
    description: 'Boosts energy levels and performance during your workout.',
    image: 'jgjgjg',
    category: 'Supplement',
    amazonLink: 'jhgjh8',
  },
  {
    id: '9',
    name: 'Foam Roller',
    description: 'Helps with muscle recovery and flexibility.',
    image: 'jbkjbkjbkj',
    category: 'Equipment',
    amazonLink: 'hjjhjhgjhj',
  },
  {
    id: '10',
    name: 'Jump Rope',
    description: 'Great for cardio and improving coordination.',
    image: 'jkbkjbjbjjh',
    category: 'Equipment',
    amazonLink: 'jhvjhjhv',
  },
];

function EquipmentsScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  
  const filteredData = productsData.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.equipmentName}>{item.name}</Text>
      <Text style={styles.equipmentDescription}>{item.description}</Text>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => navigation.navigate('EquipmentDetails', { equipmentId: item.id })}
      >
        <Text style={styles.detailsButtonText}>View Details</Text>
      </TouchableOpacity>

      {/* Amazon Link Button */}
      <TouchableOpacity
        style={styles.amazonButton}
        onPress={() => {
          Linking.openURL(item.amazonLink);  
        }}
      >
        <Text style={styles.amazonButtonText}>Buy on Amazon</Text>
      </TouchableOpacity>
    </View>
  );

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setModalVisible(false); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fitness Equipment</Text>

      {/* Search Input */}
      <TouchableOpacity
        style={styles.searchInputContainer}
        onPress={() => setModalVisible(true)}
      >
        <TextInput
          style={styles.searchInput}
          placeholder="Filter"
          placeholderTextColor="#aaa"
          editable={false}
          value={selectedCategory === 'All' ? '' : selectedCategory}
        />
      </TouchableOpacity>

      {/* Modal for Category Dropdown */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {['All', 'Equipment', 'Protein', 'Supplement'].map((category) => (
                <TouchableOpacity
                  key={category}
                  style={styles.modalOption}
                  onPress={() => handleCategorySelect(category)}
                >
                  <Text style={styles.modalOptionText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#212121', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffcc00', 
    textAlign: 'center',
    marginBottom: 20,
  },
  searchInputContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: '#333', 
    padding: 10,
    borderRadius: 5,
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',
    padding: 20,
    alignItems: 'center',
  },
  modalOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#007FFF',
    borderRadius: 5,
    width: '100%',
  },
  modalOptionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#333', 
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  equipmentName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ffcc00', 
  },
  equipmentDescription: {
    fontSize: 16,
    color: '#ccc', 
    textAlign: 'center',
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: '#007FFF', 
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  amazonButton: {
    backgroundColor: '#FF9900', 
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  amazonButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EquipmentsScreen;
