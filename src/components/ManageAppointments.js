import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

const ManageAppointments = () => {
  const navigation = useNavigation();
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    const now = new Date();
    const fetchUpcomingAppointments = async () => {
      const q = query(collection(db, 'appointments'), where('appointmentDate', '>=', now));
      const querySnapshot = await getDocs(q);
      
      const appointments = querySnapshot.docs.map(doc => {
        const firebaseData = doc.data();
        const date = firebaseData.appointmentDate.toDate(); 
        return { ...firebaseData, id: doc.id, appointmentDate: date };
      });

      setUpcomingAppointments(appointments);
    };

    fetchUpcomingAppointments();
  }, []);

  const renderUpcomingAppointment = ({ item }) => (
    <View style={styles.appointmentCard}>
      <View style={styles.appointmentDetailRow}>
        <Text style={styles.appointmentDetailLabel}>Doctor:</Text>
        <Text style={styles.appointmentDetail}>{item.selectedDoctor}</Text>
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
      <TouchableOpacity style={styles.cancelButton} onPress={() => {/* handle cancellation */}}>
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
        <Text style={styles.notAvailable}>Not Available</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Upcoming Appointments</Text>
        {upcomingAppointments.length > 0 ? (
          <FlatList
            data={upcomingAppointments}
            renderItem={renderUpcomingAppointment}
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
  notAvailable: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
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
