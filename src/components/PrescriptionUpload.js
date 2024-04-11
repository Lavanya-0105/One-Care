import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase'; // Import your Firebase configuration
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

function PrescriptionUpload({ route, navigation }) {
const { email } = route.params;
const [prescriptionImage, setPrescriptionImage] = useState(null);
const [savedPrescriptions, setSavedPrescriptions] = useState([]);

useEffect(() => {
const fetchPrescriptions = async () => {
try {
const prescriptionsSnapshot = await getDocs(query(collection(db, 'prescriptions'), where('userEmail', '==', email)));
const prescriptionsData = prescriptionsSnapshot.docs.map(doc => ({ id: doc.id, imageURL: doc.data().imageURL }));
setSavedPrescriptions(prescriptionsData);
} catch (error) {
console.error('Error fetching prescriptions:', error);
}
};
fetchPrescriptions();
}, [email]);

const handleUploadImage = (event) => {
const file = event.target.files[0];
if (!file) return;

const reader = new FileReader();
reader.onload = () => {
setPrescriptionImage(reader.result);
};
reader.readAsDataURL(file);
};

const handleSavePrescription = async () => {
if (!prescriptionImage) return;

try {
const docRef = await addDoc(collection(db, 'prescriptions'), {
userEmail: email,
imageURL: prescriptionImage,
});

setSavedPrescriptions([...savedPrescriptions, { id: docRef.id, imageURL: prescriptionImage }]);
setPrescriptionImage(null);
} catch (error) {
console.error('Error saving prescription:', error);
}
};

const handleDeletePrescription = async (id) => {
try {
await deleteDoc(doc(db, 'prescriptions', id));
setSavedPrescriptions(savedPrescriptions.filter(prescription => prescription.id !== id));
} catch (error) {
console.error('Error deleting prescription:', error);
}
};

const back = () => {
navigation.navigate('PatientHome', { email: email });
};

return (
<View style={styles.container}>
<TouchableOpacity onPress={back} style={styles.backButton}>
<Text style={styles.backButtonText}>Back</Text>
</TouchableOpacity>

<Text style={styles.heading}>Prescription Upload</Text>

{prescriptionImage && (
<View style={styles.imageContainer}>
<Image source={{ uri: prescriptionImage }} style={styles.image} />
</View>
)}

<input type="file" accept="image/*" onChange={handleUploadImage} style={styles.input} />

<Button title="Save Prescription" onPress={handleSavePrescription} disabled={!prescriptionImage} />

<View style={styles.savedPrescriptionsContainer}>
<Text style={styles.savedPrescriptionsHeading}>Saved Prescriptions</Text>
{savedPrescriptions.map((prescription) => (
<View key={prescription.id} style={styles.savedPrescriptionItem}>
<Image source={{ uri: prescription.imageURL }} style={styles.savedPrescriptionImage} />
<Button title="Delete" onPress={() => handleDeletePrescription(prescription.id)} />
</View>
))}
</View>
</View>
);
}

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