import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase';

const Footer = () => (
<View style={styles.footer}>
<Text style={styles.footerText}>© 2024 OneCare. All Rights Reserved.</Text>
</View>
);

const DoctorHome = ({ route }) => {
const { doctorName } = route.params;
const [appointments, setAppointments] = useState([]);
const navigation = useNavigation();

useEffect(() => {
const fetchAppointments = async () => {
try {
const doctorQuery = query(collection(db, 'doctors'), where('name', '==', doctorName));
const doctorSnapshot = await getDocs(doctorQuery);

if (!doctorSnapshot.empty) {
const doctorId = doctorSnapshot.docs[0].id;
const appointmentsQuery = query(collection(db, 'appointments'), where('selectedDoctor', '==', doctorId));
const appointmentsSnapshot = await getDocs(appointmentsQuery);

const appointmentsData = [];
appointmentsSnapshot.forEach((doc) => {
appointmentsData.push({ id: doc.id, ...doc.data() });
});

const currentDate = new Date();
const upcomingAppointments = appointmentsData.filter(appointment => {
const appointmentDate = appointment.appointmentDate.toDate();
return appointmentDate > currentDate;
});

setAppointments(upcomingAppointments);
} else {
console.log('Doctor not found');
}
} catch (error) {
console.error('Error fetching appointments: ', error);
}
};

fetchAppointments();
}, [doctorName]);

const handleLogout = () => {
navigation.navigate('Login');
};

const handleCancel = async (appointmentId) => {
try {
await deleteDoc(doc(db, 'appointments', appointmentId));
// Update appointments list after cancellation
const updatedAppointments = appointments.filter(appointment => appointment.id !== appointmentId);
setAppointments(updatedAppointments);
} catch (error) {
console.error('Error cancelling appointment: ', error);
}
};

return (
<ScrollView style={styles.container}>
<Text style={styles.welcomeMessage}>Welcome, Dr. {doctorName}!</Text>
<TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
<Text style={styles.logoutButtonText}>Logout</Text>
</TouchableOpacity>

<View style={styles.dashboardSection}>
<Text style={styles.sectionTitle}>Upcoming Appointments:</Text>
{appointments.length > 0 ? (
<FlatList
data={appointments}
keyExtractor={(item) => item.id}
renderItem={({ item }) => (
<View style={styles.appointmentCard}>
<Text style={styles.appointmentInfo}>
Patient: {item.patientName}{'\n'}
Date: {item.appointmentDate.toDate().toLocaleDateString()}{'\n'}
Time: {item.appointmentTime}
<TouchableOpacity style={styles.CancelButton} onPress={() => handleCancel(item.id)}>
<Text style={styles.CancelButtonText}>Cancel</Text>
</TouchableOpacity>
</Text>
</View>
)}
/>
) : (
<Text>No upcoming appointments.</Text>
)}
</View>

<View style={styles.dashboardSection}>
<Text style={styles.sectionTitle}>Patient Records:</Text>
<Text>View and manage patient records.</Text>
</View>

<View style={styles.dashboardSection}>
<Text style={styles.sectionTitle}>Messages:</Text>
<Text>Communicate with patients and colleagues.</Text>
</View>
<Footer/>
</ScrollView>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
padding: 20,
backgroundColor: '#f0f0f0',
},
welcomeMessage: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 20,
},
dashboardSection: {
marginBottom: 20,
},
sectionTitle: {
fontSize: 18,
fontWeight: 'bold',
marginBottom: 10,
},
appointmentCard: {
backgroundColor: '#fff',
borderRadius: 8,
padding: 15,
marginBottom: 10,
},
appointmentInfo: {
fontSize: 16,
},
CancelButton: {
backgroundColor: '#0954a5',
padding: 10,
borderRadius: 5,
marginLeft: 'auto',
},
CancelButtonText: {
color: 'white',
fontSize: 14,
},
logoutButton: {
backgroundColor: '#0954a5',
padding: 6,
borderRadius: 5,
marginLeft: 'auto',
},
logoutButtonText: {
color: 'white',
fontSize: 14,
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

export default DoctorHome;