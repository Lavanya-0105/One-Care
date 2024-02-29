import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>© 2024 OneCare. All Rights Reserved.</Text>
  </View>
);

const SearchDoctor = () => {
  const navigation = useNavigation();
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {

    const results = [
      { name: 'Dr. John Doe', specialty: 'Cardiologist', location: 'New York' },
      { name: 'Dr. Jane Smith', specialty: 'Dermatologist', location: 'Los Angeles' },
      { name: 'Dr. Emily Johnson', specialty: 'Pediatrician', location: 'Chicago' },
      { name: 'Dr. Michael Williams', specialty: 'Orthopedic Surgeon', location: 'Houston' },
      { name: 'Dr. Sarah Brown', specialty: 'Psychiatrist', location: 'Miami' },
      { name: 'Dr. David Lee', specialty: 'Ophthalmologist', location: 'San Francisco' },
      { name: 'Dr. Samantha Taylor', specialty: 'Gynecologist', location: 'Boston' },
      { name: 'Dr. Matthew Wilson', specialty: 'Neurologist', location: 'Seattle' },
      { name: 'Dr. Laura Martinez', specialty: 'Endocrinologist', location: 'Dallas' },
      { name: 'Dr. Christopher Anderson', specialty: 'Urologist', location: 'Atlanta' },
    ];

    // Filter results based on user input
    const filteredResults = results.filter((doctor) =>
      doctor.specialty.toLowerCase().includes(specialty.toLowerCase()) &&
      doctor.location.toLowerCase().includes(location.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Search Doctor</Text>
      </View>
      <View style={styles.form}>
        <Picker
          style={styles.input}
          selectedValue={specialty}
          onValueChange={(value) => setSpecialty(value)}
        >
          <Picker.Item label="Select Specialty" value="" />
          <Picker.Item label="Cardiologist" value="Cardiologist" />
          <Picker.Item label="Dermatologist" value="Dermatologist" />
          <Picker.Item label="Pediatrician" value="Pediatrician" />
         
        </Picker>
        <Picker
          style={styles.input}
          selectedValue={location}
          onValueChange={(value) => setLocation(value)}
        >
          <Picker.Item label="Select Location" value="" />
          <Picker.Item label="New York" value="New York" />
          <Picker.Item label="Los Angeles" value="Los Angeles" />
          <Picker.Item label="Chicago" value="Chicago" />
         
        </Picker>
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {searchResults.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Search Results:</Text>
          {searchResults.map((doctor, index) => (
            <View key={index} style={styles.resultItem}>
              <Text>Name: {doctor.name}</Text>
              <Text>Specialty: {doctor.specialty}</Text>
              <Text>Location: {doctor.location}</Text>
            </View>
          ))}
        </View>
      )}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  backButton: {
    fontSize: 18,
    color: '#0954a5',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#0954a5',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  resultsContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultItem: {
    marginBottom: 10,
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
});

export default SearchDoctor;
