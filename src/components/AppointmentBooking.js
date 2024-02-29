import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView,Picker,Alert } from 'react-native';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AppointmentBooking = () => {
  const [patientName, setPatientName] = useState('');
  const [patientNumber, setPatientNumber] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState('');
  const [preferredMode, setPreferredMode] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');

  const availableDoctors = [
    { name: 'Dr. John Doe', id: 'john_doe' },
    { name: 'Dr. Jane Smith', id: 'jane_smith' },
    // Add more doctors as needed
  ];

  const handleSubmit = () => {
   
    if (!patientName || !patientNumber || !patientGender || !appointmentTime || !preferredMode) {
     Alert.alert('Please fill in all fields');
      return;
    }

    

    // Reset form fields after submission
    setPatientName('');
    setPatientNumber('');
    setPatientGender('');
    setAppointmentDate(new Date());
    setAppointmentTime('');
    setPreferredMode('');
    setSelectedDoctor('');

     alert('Appointment booked successfully!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Appointment Booking</Text>
      <View style={styles.form}>
    <TextInput
          style={styles.input}
          placeholder="Patient Name"
          value={patientName}
          onChangeText={(text) => setPatientName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={patientNumber}
          onChangeText={(text) => setPatientNumber(text)}
          keyboardType="phone-pad"
        />
        <Picker
          style={styles.input}
          selectedValue={patientGender}
          onValueChange={(value) => setPatientGender(value)}>
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="I will inform Doctor only" value="private" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Appointment Time"
          value={appointmentTime}
          onChangeText={(text) => setAppointmentTime(text)}
        />
        <Picker
          style={styles.input}
          selectedValue={preferredMode}
          onValueChange={(value) => setPreferredMode(value)}>
          <Picker.Item label="Select Mode" value="" />
          <Picker.Item label="Voice Call" value="voice" />
          <Picker.Item label="Video Call" value="video" />
        </Picker>
        
        <DatePicker
          selected={appointmentDate}
          onChange={(date) => setAppointmentDate(date)}
          dateFormat="MM/dd/yyyy"
          placeholderText="Appointment Date"
          style={styles.input}
        />
        <Picker
          style={styles.input}
          selectedValue={selectedDoctor}
          onValueChange={(value) => setSelectedDoctor(value)}>
          <Picker.Item label="Select Doctor" value="" />
          {availableDoctors.map((doctor) => (
            <Picker.Item key={doctor.id} label={doctor.name} value={doctor.id} />
          ))}
        </Picker>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
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
});

export default AppointmentBooking;
       
