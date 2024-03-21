import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const SymptomsTracker = ({ navigation, route }) => {
  const [symptoms, setSymptoms] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const { email } = route.params;

  const handleTrackSymptoms = () => {
    if (symptoms.trim() === '') {
      setError('Please enter symptoms.');
      setResults([]);
    } else {
      setError('');
      fetch('http://127.0.0.1:5000/symptom_checker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ symptoms: symptoms })
      })
      .then(response => response.json())
      .then(data => {
        setResults(data.predicted_disease ? [data.predicted_disease] : []);
      })
      .catch(error => {
        console.error('Error:', error);
        setError('An error occurred. Please try again.');
        setResults([]);
      });
    }
  };

  const handleBack = () => {
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
      ) : results.length > 0 ? (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsHeading}>Predicted Disease:</Text>
          {results.map((disease, index) => (
            <Text key={index} style={styles.resultsText}>{disease}</Text>
          ))}
        </View>
      ) : null}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
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