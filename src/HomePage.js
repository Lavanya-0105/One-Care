import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InfoCard = ({ title, description,imageSource, onPress }) => (
  <TouchableOpacity style={styles.infoCard} onPress={onPress}>
    <Image source={imageSource} style={styles.infoCardImage} />
    <Text style={styles.infoCardTitle}>{title}</Text>
    <Text style={styles.infoCardDescription}>{description}</Text>
  </TouchableOpacity>
);

const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>© 2024 OneCare. All Rights Reserved.</Text>
  </View>
);

const HomePage = ({ route }) => {
  const { email } = route.params || {};
  const navigation = useNavigation();

  const handleSearchDoctor = () => {
    navigation.navigate('SearchDoctor');
  };

  const MedicationReminder = () => {
    navigation.navigate('MedicationReminder');
  };
  const labTestBooking = () => {
    navigation.navigate('LabTestBooking');
  };
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeMessage}>Welcome, {email}!</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bannerContainer}>
        <Image
          source={require('./assets/doctor-picture.png')}
          style={styles.bannerImage}
        />
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerText}>
            Health comes first
          </Text>
          <Text style={styles.bannerSubtitle}>
            Find your Doctor and make an Appointment. On-demand healthcare services at your fingertips.
          </Text>

          <TouchableOpacity
            style={styles.bookAppointmentButton}
            onPress={() => navigation.navigate('AppointmentBooking')}
          >
            <Text style={styles.buttonText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.title}>Explore various features to manage your health needs:</Text>

      <View style={styles.infoCardsContent}>
        <View style={styles.infoCardsRow}>
          <InfoCard
            imageSource={require('./assets/features/SymptomChecker.webp')}
            title="Symptoms Tracker"
            description="Effortlessly track your symptoms and health metrics with our intuitive Symptoms Tracker feature. Stay informed about your health status and easily share relevant information with your healthcare provider for personalized care."
          />
          <InfoCard
            imageSource={require('./assets/features/MeditationSessions.jpeg')}
            title="Meditation sessions"
            description="Take a moment to prioritize your mental well-being with our Stress Management feature. Access a library of guided meditation sessions and relaxation techniques designed to promote mindfulness and reduce stress levels."
          />
          <InfoCard
           imageSource={require('./assets/features/medicationReminder2.jpeg')}
            title="Medication Reminder"
            description="Stay on top of your medication schedule with our Medication Reminder feature. Set up reminders for medication doses, refill dates, and doctor appointments to ensure you never miss an important healthcare task."
            onPress={MedicationReminder}
          />
        </View>
        <View style={styles.infoCardsRow}>
          <InfoCard
          imageSource={require('./assets/features/SearchDoctor.jpeg')}
            title="Search a Doctor"
            description="Find the right healthcare provider for your needs with our Search a Doctor feature. Browse through a curated list of doctors, apply filters based on specialty, location, and availability, and book appointments with ease."
            onPress={handleSearchDoctor}
          />
          <InfoCard
          imageSource={require('./assets/features/LabTest.jpeg')}
            title="Lab Test Booking"
            description="Book lab tests hassle-free. Our platform offers a seamless experience for scheduling lab tests. Choose from a variety of tests, select a convenient location, and schedule your appointment with ease."
            onPress={labTestBooking}
          />
          <InfoCard
          imageSource={require('./assets/features/HealthResources.jpeg')}
            title="Health resources"
            description="Discover a wealth of health resources at your fingertips. Access valuable information, articles, and tips to enhance your well-being. Stay informed and take charge of your health journey with our comprehensive health resources."
            onPress={labTestBooking}
          />
        </View>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  welcomeMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#0954a5',
    padding: 8,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 14,
  },
  bannerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  bannerImage: {
    width: '40%', 
    height: 400,
    borderRadius: 8,
  },
  bannerTextContainer: {
    flex: 1,
    paddingLeft: 90,
    justifyContent: 'center',
  },
  bannerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  bannerSubtitle: {
    fontSize: 16,
    marginBottom: 10,
   
  },
  bookAppointmentButton: {
    backgroundColor: '#0954a5',
    padding: 9,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 'auto',

  },
  
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  infoCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  infoCard: {
    width: '30%',
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    padding: 20,
    borderWidth: 1,
    borderColor: 'black',
    elevation: 4, 
  },
  infoCardTitle: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoCardDescription: {
    color: 'light-blue',
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f8f8f8',
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    color: '#333',
    fontSize: 12,
  },
  infoCardImage: {
    width: 90,
    height: 90,
    marginBottom: 10,
    alignSelf: 'center',
  },
});

export default HomePage;