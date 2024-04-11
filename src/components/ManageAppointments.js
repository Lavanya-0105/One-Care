import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';
import { collection, query, where, getDocs, getDoc, doc, deleteDoc } from "firebase/firestore";

const ManageAppointments = ({ navigation, route }) => {
  const { email } = route.params;
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);

  const fetchAppointments = async () => {
    const now = new Date();
    const appointmentsRef = collection(db, 'appointments');
  
    // Query appointments for the user
    const userAppointmentsQuery = query(appointmentsRef, where('userEmail', '==', email));
  
    const userAppointmentsSnapshot = await getDocs(userAppointmentsQuery);
    const userAppointmentsData = [];
  
    for (const doc of userAppointmentsSnapshot.docs) {
      const firebaseData = doc.data();
      const date = firebaseData.appointmentDate.toDate();
      const doctorName = await fetchDoctorName(firebaseData.selectedDoctor);
      userAppointmentsData.push({ ...firebaseData, id: doc.id, appointmentDate: date, doctorName });
    }
  
    // Filter appointments into upcoming and past based on the current date
    const upcomingAppointments = [];
    const pastAppointments = [];
  
    userAppointmentsData.forEach(appointment => {
      if (appointment.appointmentDate >= now) {
        upcomingAppointments.push(appointment);
      } else {
        pastAppointments.push(appointment);
      }
    });
  
    setUpcomingAppointments(upcomingAppointments);
    setPastAppointments(pastAppointments);
  };
  

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchDoctorName = async (doctorId) => {
    const doctorDoc = await getDoc(doc(db, 'doctors', doctorId));
    if (doctorDoc.exists()) {
      return doctorDoc.data().name; // Assuming 'name' is the field containing the doctor's name
    } else {
      return null;
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await deleteDoc(doc(db, 'appointments', appointmentId));
      // Re-fetch appointments after cancellation
      fetchAppointments();
    } catch (error) {
      console.error("Error cancelling appointment: ", error);
      Alert.alert("Error", "Failed to cancel appointment. Please try again later.");
    }
  };

  const renderAppointment = ({ item }) => (
    <View style={styles.appointmentCard}>
      <View style={styles.appointmentDetailRow}>
        <Text style={styles.appointmentDetailLabel}>Doctor:</Text>
        <Text style={styles.appointmentDetail}>{item.doctorName}</Text>
      </View>
      <View style={styles.appointmentDetailRow}>
        <Text style={styles.appointmentDetailLabel}>Date:</Text>
        <Text style={styles.appointmentDetail}>{item.appointmentDate.toLocaleDateString()}</Text>
      </View>
      <View style={styles.appointmentDetailRow}>
        <Text style={styles.appointmentDetailLabel}>Time:</Text>
        <Text style={styles.appointmentDetail}>{item.appointmentTime}</Text>
      </View>
      <View style={styles.appointmentDetailRow}>
        <Text style={styles.appointmentDetailLabel}>Mode:</Text>
        <Text style={styles.appointmentDetail}>{item.preferredMode}</Text>
      </View>
      <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancelAppointment(item.id)}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Manage Appointments</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Past Appointments</Text>
        {pastAppointments.length > 0 ? (
          <FlatList
            data={pastAppointments}
            renderItem={renderAppointment}
            keyExtractor={item => item.id}
          />
        ) : (
          <Text style={styles.noAppointmentsText}>No Past Appointments</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Upcoming Appointments</Text>
        {upcomingAppointments.length > 0 ? (
          <FlatList
            data={upcomingAppointments}
            renderItem={renderAppointment}
            keyExtractor={item => item.id}
          />
        ) : (
          <Text style={styles.noAppointmentsText}>No Upcoming Appointments</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButtonContainer: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#0954a5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.3,
  },
  appointmentDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  appointmentDetailLabel: {
    fontWeight: 'bold',
    color: '#666',
  },
  appointmentDetail: {
    flexShrink: 1,
    marginLeft: 5,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#ff4136',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'center',
  },
  cancelButtonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  noAppointmentsText: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
  },
});

export default ManageAppointments;
