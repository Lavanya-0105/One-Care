import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PrescriptionUpload = () => {
  const [prescriptionImage, setPrescriptionImage] = useState(null);
  const [savedPrescriptions, setSavedPrescriptions] = useState([]);
  const navigation = useNavigation();

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPrescriptionImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

 
  const handleSavePrescription = () => {
    if (!prescriptionImage) return;

   
    setSavedPrescriptions([...savedPrescriptions, prescriptionImage]);


    setPrescriptionImage(null);
  };

  const back = () => {
    navigation.navigate('PatientHome');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={back} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Prescription Upload</Text>

      {/* Display prescription image if available */}
      {prescriptionImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: prescriptionImage }} style={styles.image} />
        </View>
      )}

      {/* Button to upload prescription image */}
      <input type="file" accept="image/*" onChange={handleUploadImage} style={styles.input} />

      {/* Button to save prescription */}
      <Button title="Save Prescription" onPress={handleSavePrescription} disabled={!prescriptionImage} />

      {/* Display saved prescriptions */}
      <View style={styles.savedPrescriptionsContainer}>
        <Text style={styles.savedPrescriptionsHeading}>Saved Prescriptions</Text>
        {savedPrescriptions.map((prescription, index) => (
          <View key={index} style={styles.savedPrescriptionItem}>
            <Image source={{ uri: prescription }} style={styles.savedPrescriptionImage} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
  },
  input: {
    marginTop: 20,
    marginBottom: 20,
  },
  savedPrescriptionsContainer: {
    marginTop: 20,
  },
  savedPrescriptionsHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  savedPrescriptionItem: {
    marginBottom: 10,
  },
  savedPrescriptionImage: {
    width: 200,
    height: 150,
    resizeMode: 'cover',
  },
});

export default PrescriptionUpload;
