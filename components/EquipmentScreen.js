import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Linking, TextInput, Modal, TouchableWithoutFeedback } from 'react-native';

const productsData = [
  {
    id: '1',
    name: 'Dumbbells',
    description: 'Perfect for building muscle strength, great for upper body exercises.',
    image: '{require("./assets/dumbbells.png")}',
    category: 'Equipment',
    amazonLink: 'https://www.amazon.de/EnterSports-Adjustable-Dumbbells-Space-Saving-Non-Slip/dp/B0D1P694JJ/ref=sr_1_4_sspa?crid=MGZDMASUKBKY&dib=eyJ2IjoiMSJ9.r8_AmvvOSyu4-3B3ViFga5dosPw1tzKbTqxYZL7XDanpPQTh8VlDZO_bH8ukgtDgtycGUSTUGjXbcc83Z1wy8UEfU2gnRxeiuYyZqkBECqY6l1e3wfq4WKgJoU4HRPcq6DklwA_qo-K1GkAmksjmu8hx_p0J0gAtnYKmPoDA2IohJ8Va5Ke7IIxkAemhRJIm9mUXvkbQK2F3LHUoZLXFu82pY-9kXHcTp14xuQC3SLj3sWVQge7w_-jlb9Ifsi5DlGuL9FZ0MAumnvSw85R-1sQQ7H7vxLCWuolBpqAAwag.cC0OIuEGiRQMQcsgZOCSCP951ik2XLHniJCM2X072yQ&dib_tag=se&keywords=dumbbells&qid=1742216059&sprefix=dumbels%2Caps%2C168&sr=8-4-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1',
  },
  {
    id: '2',
    name: 'Resistance Bands',
    description: 'Ideal for strength training and stretching exercises.',
    image:'hvjvjvj',
    category: 'Equipment',
    amazonLink: 'https://www.amazon.de/Resistance-Training-Instructions-Stretching-Strength/dp/B0BHVP99NJ/ref=sr_1_2_sspa?crid=39O46JPFTHZNT&dib=eyJ2IjoiMSJ9.-lOSne1vxJAIfqG5mqgY6FOo3700stWokCm8C0JYh6iiY8sz5KipNJujiViMW96dYJObnfpGY7IhfzbzwYYUiV5omzNn8k0Vv-hHPk1w0GpSsNWyOQKFlMeKoJkpYb_PDC39QiZbBkMNgi0SYrcL6UXMau2YPU2Yxn7WUzeN5UofFLcYmeQylzL9ZbXuEPZ-anh91UqYHdUM7mH-rVgXxJsm4qxn-YR0SVY-dIRJD4YjXc4r6vxMvEIrPURimCq1SjGCWUOUS1gP4vOO9MVsmv2glLqC24tiOl1TjT4qNFA.8yXFM10b6jYbOw20Sgcv3nN2hu0q9fyyVvdlKeBCFj0&dib_tag=se&keywords=resistance%2Bbands&qid=1742216119&sprefix=resistance%2Caps%2C194&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1',
  },

  {
    id: '3',
    name: 'Treadmill',
    description: 'Great for cardiovascular fitness and fat loss.',
    image: 'https://example.com/treadmill.jpg',
    category: 'Equipment',
    amazonLink: 'https://www.amazon.de/Decorcn-Treadmill-Home-Professional-Interactive/dp/B0CFV73CR6/ref=sr_1_2_sspa?crid=1HSGI2NZMDED4&dib=eyJ2IjoiMSJ9.5xyJ47Gf49Lz4BJDnZm9jEsgWMibqP7qmL-O1Kc7s0-vw8-PCFXGcnHCLIeyFnZHflTyrWhgRX7X7LTOvQ8lgcGESG3PCVbxg3Tq0sA9Shty8Lv9aMzUAsUtW-96xbxMQ3CO80FcF2jVGGAUUfZA9To4-iz0iZw0Gm_JcrbQ6otJVVTyGYURnYjrqVeDFmN6jA3ICyHkf3WlM0dOqivW_bwaIHMvJ3OCsRUsVPJsJ3Q.CBJYLQ-vVsqsSufcARUqzYo8xpx3hxnT4ScaE7J7HuQ&dib_tag=se&keywords=Treadmill&qid=1742295914&sprefix=treadmill%2Caps%2C308&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1',
  },
  {
    id: '4',
    name: 'Yoga Mat',
    description: 'Essential for yoga, stretching, and floor exercises.',
    image: 'https://example.com/yoga_mat.jpg',
    category: 'Equipment',
    amazonLink: 'https://www.amazon.de/-/en/KG-Physio-Premium-Yoga-Mat/dp/B01N67BRCF/ref=sr_1_6?crid=T5EUFX36DB7N&dib=eyJ2IjoiMSJ9.UbZcn4_7rEzfJhLLfYFeuRxcQmPIWTZX1BCdEFpKffwsBty67kPs-eLUOZ_1ar6kgBfunwUY83zjdGF5Es4M7Adt5P5kFvgdLb71GP7E0-GtGpGeo7pj7D4DvVPTTBirWhZUowMGsmpTEBaRWawCS9L9GKk7haqKo5l-R2Pby6SyprAAppGUzoHuCmphcUQPQTQYVNmFXn1N5ZiaiFkVKRgu-qqcZ9u_eiY8Z5mPBlMAAz2FPWd3fvMmkbz_H2OPNl16eBm88roB5xonq1LzG1UG8KCXSZQvFU_HBkUT98OOsm5IEVaIpYC5UOqT2SL4vy7ZpNsIHJKhVM_zuyr1O_yAtDG6gWZz6fTw2544M6oaj7k-h1TDCCWokzFPoQpb7QyZNm2FF1mL_nNe7ZJ0sqUkYPQcSVGtjO-CVM51CGmqh4seKz5erkYR7jGxXlO1.0pwkw06uebSVxJHm-tLNoLyRQmypjwwtMC3eY2sXY-s&dib_tag=se&keywords=Yoga%2BMat&qid=1742296000&sprefix=yoga%2Bmat%2Caps%2C304&sr=8-6&th=1',
  },
  {
    id: '5',
    name: 'Whey Protein',
    description: 'Perfect for post-workout recovery and muscle building.',
    image: 'https://example.com/whey_protein.jpg',
    category: 'Protein',
    amazonLink: 'https://www.amazon.de/-/en/Premium-Nutrition-Protein-Vanilla-Improved/dp/B08L7581SJ/ref=sr_1_7?crid=1F1DVDW2WRDIL&dib=eyJ2IjoiMSJ9.fCVWpsndh4AWTOrdUQ7k-oC5uoTTFvTWMRGPgN28OG4WT9HkRimJDdh-_earMR9hPOdazH_OVFI8cku-U3LRZ5wmQL-RmC6S4RcKFDhzQxhJ600EWal96klwNEoDoHEJJ2QD0ACivxnCYfm0fx0MrAGTmS5dFeYxW1WLlEhR34zzgWV4xrZ5Ekcj76PIpQ1644fXMzHm6dbZ1ZtOYUbhVi9TzlV9w5ce8PjTgLxrc01ARlaiuJsOEiYLMH0IZBdyUcd0uWss8Zeg8WjGntqkiJykI2ohz83UDdmhu93yhMGsEMxnx2oh6kp04jwpmtpJfvI64FFdbP4pERt6BUaBjCKUzBKi5KM1blBskN9rPBrOR-Q9TRk5j6oJI1suLLO_lEFwfuXSlozUTNpkhX748izEAME-EF1PtOrHJlQBh4hHAe2mpHAs0Zg3-NiE3GpE.Wcyh0r3fLs0jmU3cx43-HgTMv1QefbDQVOLrID76Blk&dib_tag=se&keywords=Whey%2BProtein&qid=1742296040&sprefix=whey%2Bprotein%2Caps%2C214&sr=8-7&th=1',
  },
  {
    id: '6',
    name: 'Casein Protein',
    description: 'Slow-digesting protein, ideal for overnight muscle recovery.',
    image: 'https://example.com/casein_protein.jpg',
    category: 'Protein',
    amazonLink: 'https://www.amazon.de/-/en/Optimum-Nutrition-Essential-Chocolate-packaging/dp/B002DYJ0M0/ref=sr_1_7?crid=2R2AMSDBV9ESJ&dib=eyJ2IjoiMSJ9.rq5aFdG7DBPq0dUwSTtOCkDuLWGtpUtsJAx2NMImXJVUs2R4gAjBj702Fxuzcpu52GnJ8LIKLV8cod1L5CegrXVyxOreV3cZk6TzeHnuofAH1kMKRtKtfVgYd7wRZHLkxdacE_vafibtCOwsaPxCNLVwQ9SHLu_A0UZJxbBddN1ZdJM8UEW3axnSH34ZYVYw3FO_C10xz7kihv1-K3bGXt7b_kKJQOcHB0BZ1Z78Bg0YRrjOjywJSXRCpDvatKz6CaycAWs-0Bb0EZlK_jD_cbq1aVbRLiXZ7Ty8RlYCQOwVZC7p8rlMosSOZezU4XoKloLkk5CkVuCvbbpzeyXduyaYYY1d7YWi8_zYg27P_LLv1CNZuG-vaO4Khe8g3LNC9TdJxO5860JK2Pk5vl3bkYLHmk-wXVcCfzltuTkpxlieILw_CDKNW5t_5KnwMmhk._6C5HL1e9AM6kG7i-LcoJ_qcT2e8njqrrr2izgywHEc&dib_tag=se&keywords=Casein%2BProtein&qid=1742296084&sprefix=casein%2Bprotein%2Caps%2C159&sr=8-7&th=1',
  },
  {
    id: '7',
    name: 'BCAA',
    description: 'Helps with muscle recovery and reduces soreness.',
    image: 'https://example.com/bcaa.jpg',
    category: 'Supplement',
    amazonLink: 'https://www.amazon.de/-/en/BCAA-330-capsules-isoleucine-laboratory-tested/dp/B0778NJ1LP/ref=sr_1_7?crid=1QAHUQIX1CZCM&dib=eyJ2IjoiMSJ9.wXLRi5Fqd7qtmGPYgn91K6xnPx4J6NziVwHwUwQKJMoqkkaM7j6nLAc7mIVKmtQsXSt7aNUdPAcGz0KRE96_uor8UWSxc0N7ntBI-MjZbImf729gaNIl6noIaxrkzhhLmEwHLF-kgkJ6Y2uFojBtUpYHWBizjjHg4NGJ6OnETlpbQgpsbX95hGBLczxheasWU4P4oIdJuukgFtmvdsO2jMy6YI4oMIhDmGNEInQeNwNlsH8RmNr0gFlBrewSKO0UHpP6Ph_sAz5kolA0oQub2s8avVxt4XQuBPfv81zc9a7yiAkBtS-_Dgt2kMe6fo-JLtRAFtiVt59QpV7PCN5Eqy-wjjOLd7IiWNkmKxd1l1JcFsHiYLzuU1pYq243w2PIHJImGHqypWoCNgqH8xTxQ5YXM6vRFnbGadE8gJ-oHpB5lFC2VTCGIRwSV1rYLeWq.2PLzKIWOduGkl6LnRGRwYWarlbD9F7d9CHUIw6SZNCo&dib_tag=se&keywords=BCAA&qid=1742296226&sprefix=bcaa%2Caps%2C232&sr=8-7',
  },
  {
    id: '8',
    name: 'Pre-Workout',
    description: 'Boosts energy levels and performance during your workout.',
    image: 'https://example.com/pre_workout.jpg',
    category: 'Supplement',
    amazonLink: 'https://www.amazon.de/-/en/Kosmischer-Regenbogen-Zuckerfreies-Energie-Getr%C3%A4nkepulver-Monohydrat/dp/B0BQWZC3J9/ref=sr_1_8?crid=388VVLIA40G7X&dib=eyJ2IjoiMSJ9._vO-waQKLjgt0_o-mp_wYI3HTw48kZ5l3sOZmk7szQh7ZBlbJg9Of1vMFLuNBuPh95-p0U7UW5xQywAa0zNDLQ5ivY5LcznuDOvNBfiIxLP7YyX4Cscd2oOnwaU7DzIHwOiiygdrZHdD_gljFiiyjEP5uJ0WOz1JIlAI6q0SByVmCaLcRqPnfLRHdpBhugLRtYJWdP-zGelJk2fefb5zXtVpRxXHOKm7cmOK5qz3de35l0oiRILdvxwo9GDe2jib1EbaPrpqN_fGd1D_e55AU2hTIC0EtUj4yfGrwwn2FLa5kD-mEzrqzKycot6TvoOo3MJfL_7mPZz7Or2YcZcivCna291XPlR4gkJCWj7YpDQ0MzqzvguEME_eFY4nWYf4wWppMMXQ19IRHknE0EdkQ2_7sQsbPmsVboESYXbAg8Vun2SkOa2AG5yqAuddyOx3.F99pKRNa1uJ4oprqf65Pwg4sQJuRTQAgtcO9gpswiIk&dib_tag=se&keywords=Pre-Workout&qid=1742296280&sprefix=pre-workout%2Caps%2C173&sr=8-8',
  },
  {
    id: '9',
    name: 'Foam Roller',
    description: 'Helps with muscle recovery and flexibility.',
    image: 'https://example.com/foam_roller.jpg',
    category: 'Equipment',
    amazonLink: 'https://www.amazon.de/BLACKROLL%C2%AE-Standard-Original-Training-Available/dp/B003BP5AGA/ref=sr_1_3_sspa?crid=181FAEEH8P3LQ&dib=eyJ2IjoiMSJ9.NRqV2xs05g0LcheJx8p_Neaf2hPT9P__DCmJIc7evnuq4EU6LIpqTwCnbf_03Kqh6LFCnG-PBuAF23u4VPz-wGA4FJIKdnPE5G6nnX1MIAYAqQxWRTJI7R3sQ_OwH6mlx3wDNpeCsKTdSs02SAfl5aqIpVs3nr8iwxeAo8eA3JZ9okn1j3_HT3coAEttiPc5xDGsX_0Y7Fd2Hb1gdRy6FLjvtlT8SSoh-ITsfjWFQg4rS9rfNti4zCjII81aGMMJmWEeqt6nseOj38JxVfbT6_iOD3cVLE7YhMVZu_zgCyE.I_0wchgKvnpN5zxf44EWRbeq88Lhff8-jdaElkr4elY&dib_tag=se&keywords=Foam%2BRoller&qid=1742296334&sprefix=foam%2Broller%2Caps%2C159&sr=8-3-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1',
  },
  {
    id: '10',
    name: 'Jump Rope',
    description: 'Great for cardio and improving coordination.',
    image: 'https://example.com/jump_rope.jpg',
    category: 'Equipment',
    amazonLink: 'https://www.amazon.de/Skipping-Skin-Friendly-Adjustable-Non-Slip-Endurance/dp/B08CRVG7BB/ref=sr_1_4_sspa?crid=XNLZEMA8S91N&dib=eyJ2IjoiMSJ9.WgcNJZEU1ApF8Gy50UVXBuxuZjajioW4sKrucp3hDGoHe5jjhfDll99ii1hJAP1K2cf2rXlR2ZVQMUt_jw8tgM_MG0EXrBFEjGBdXvR464Nf-ry7PdBEqO-JAr-mqBk9WbY3hwy8ulHTZ2c6kGMVGhA01o6k0SkI8ISmKhJprizmYjjfdgCR26BUNrIG_NflvB-SD3bo79pOzQiH93hLi-L3U8jTDFGn95N8aIMhWCPJDJYRG-qfVAIlPNqRiza0wEAtC6vgxTk97JNwcYFiOI_C1fcaJwIyZCUHWgA0w1w.W2O6cr3pNDBvGj4_VL64CXIWkb0N_qxUnUdwk59nRFY&dib_tag=se&keywords=Jump%2BRope&qid=1742296379&sprefix=jump%2Brope%2Caps%2C182&sr=8-4-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1',
  },
];

function EquipmentsScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Filter products based on selected category and search query
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
          Linking.openURL(item.amazonLink);  // Open the Amazon link when clicked
        }}
      >
        <Text style={styles.amazonButtonText}>Buy on Amazon</Text>
      </TouchableOpacity>
    </View>
  );

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setModalVisible(false); // Close modal when category is selected
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
    backgroundColor: '#212121', // Dark background for consistent theme
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffcc00', // Bright gold for the title
    textAlign: 'center',
    marginBottom: 20,
  },
  searchInputContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: '#333', // Dark background for the input
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
    backgroundColor: '#333', // Dark card background
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
    color: '#ffcc00', // Gold text for product name
  },
  equipmentDescription: {
    fontSize: 16,
    color: '#ccc', // Light gray description
    textAlign: 'center',
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: '#007FFF', // Blue button for details
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
    backgroundColor: '#FF9900', // Amazon's orange color
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