import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InfoCard = ({ title, description, onPress }) => (
  <TouchableOpacity style={styles.infoCard} onPress={onPress}>
    <Text style={styles.infoCardTitle}>{title}</Text>
    <Text style={styles.infoCardDescription}>{description}</Text>
  </TouchableOpacity>
);

const HomePage = ({ userName }) => {
  const navigation = useNavigation();

  const handleSearchDoctor = () => {
    navigation.navigate('SearchDoctor');
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };
  const handleResetPassword=() =>{
    navigation.navigate('ResetPassword')
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeMessage}>Welcome, {userName}!</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ResetButton} onPress={handleResetPassword}>
          <Text style={styles.ResetButtonText}>ResetPassword</Text>
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
            Find your Doctor and make an Appointment
            
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
            title="Symptoms Tracker"
            description="Effortlessly track your symptoms and health metrics with our intuitive Symptoms Tracker feature. Stay informed about your health status and easily share relevant information with your healthcare provider for personalized care."
          />
          <InfoCard
            title="Meditation sessions"
            description="Take a moment to prioritize your mental well-being with our Stress Management feature. Access a library of guided meditation sessions and relaxation techniques designed to promote mindfulness and reduce stress levels."
          />
          <InfoCard
            title="Medication Reminder"
            description="Stay on top of your medication schedule with our Medication Reminder feature. Set up reminders for medication doses, refill dates, and doctor appointments to ensure you never miss an important healthcare task."
          />
        </View>
        <View style={styles.infoCardsRow}>
          <InfoCard
            title="Search a Doctor"
            description="Find the right healthcare provider for your needs with our Search a Doctor feature. Browse through a curated list of doctors, apply filters based on specialty, location, and availability, and book appointments with ease."
            onPress={handleSearchDoctor}
          />
        </View>
      </View>
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
  ResetButtonText: {
    backgroundColor: '#0954a5',
    padding: 8,
    borderRadius: 5,
    marginLeft: 5,
    color:'white',
    
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
  infoCardsContent: {
    margin: 20,
  },
  infoCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  infoCard: {
    width: '30%', // Adjust the width to fit three cards in a row
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: 'white',
    padding: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  infoCardTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  infoCardDescription: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },

});

export default HomePage;
