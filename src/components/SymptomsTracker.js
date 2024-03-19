import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Footer from './Footer';

const SymptomsTracker = ({ navigation, route }) => {
  const [symptoms, setSymptoms] = useState('');
  const [results, setResults] = useState('');
  const [error, setError] = useState('');
  const { email } = route.params;

  const handleTrackSymptoms = () => {
    if (symptoms.trim() === '') {
      setError('Please enter symptoms.');
      setResults('');
    } else {
      setError('');
      const simulatedResults = simulateResults(symptoms);
      setResults(simulatedResults);
    }
  };

  const simulateResults = (enteredSymptoms) => {
    const symptomsArray = enteredSymptoms.toLowerCase().split(',').map(symptom => symptom.trim());
    let results = '';
    symptomsArray.forEach(symptom => {
      switch (symptom) {
        case 'fever':
          results += 'Fever: Possible causes - Infection, Flu, COVID-19\n';
          break;
        case 'cough':
          results += 'Cough: Possible causes - Common cold, Flu, Asthma\n';
          break;
        case 'headache':
          results += 'Headache: Possible causes - Stress, Tension, Migraine\n';
          break;
        // Add more cases as needed...
        default:
          results += `${symptom}: No specific causes found.\n`;
      }
    });
    return results.trim();
  };

  const handleBack = () => {
    // Navigate back to the patient home page with email
    navigation.navigate('PatientHome', { email: email });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/SymptomsTracker.png')} style={styles.image} />
      <Text style={styles.heading}> Symptom Tracker</Text>
      <Text style={styles.description}>
        Our Medical Symptom Checker can direct you to the right healthcare for your symptoms.
        Foot pain? Headache? Sore throat? Skin rash? Use the Symptom Checker to find out what's causing your symptom.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter symptoms (comma-separated)"
          value={symptoms}
          onChangeText={(text) => setSymptoms(text)}
        />
        <TouchableOpacity style={styles.trackButton} onPress={handleTrackSymptoms}>
          <Text style={styles.buttonText}>Track Symptoms</Text>
        </TouchableOpacity>
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsHeading}>Results:</Text>
          <Text style={styles.resultsText}>{results}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 450,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  trackButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  resultsContainer: {
    width: '100%',
    marginTop: 20,
  },
  resultsHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultsText: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginTop: 20,
  },
  backButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SymptomsTracker;