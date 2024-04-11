import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { db } from '../firebase'; 
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

const ChildVaccine = ({ route, navigation }) => {
  const { email } = route.params;
  const [dummyVaccines, setDummyVaccines] = useState([
    {
      name: "Vaccine A",
      whenToGive: "2024-04-01",
      dose: "1",
      Route: "Oral",
      site: "Left thigh",
      schedule: false,
    },
    {
      name: "Vaccine B",
      whenToGive: "2024-04-15",
      dose: "2",
      Route: "Intramuscular",
      site: "Right arm",
      schedule: false,
    },
    {
      name: "Vaccine C",
      whenToGive: "2024-05-01",
      dose: "3",
      Route: "Subcutaneous",
      site: "Left shoulder",
      schedule: false,
    },
  ]);

  const [selectedVaccines, setSelectedVaccines] = useState(Array(dummyVaccines.length).fill(false));
  const [isAddVaccineFormOpen, setIsAddVaccineFormOpen] = useState(false);
  const [isVaccineScheduled, setIsVaccineScheduled] = useState(false);
  const [parentName, setParentName] = useState(''); 
  const [newChildName, setNewChildName] = useState(''); 
  const [newChildAge, setNewChildAge] = useState(''); 
  const [newChildGender, setNewChildGender] = useState('');
  const [newChildPhoto, setNewChildPhoto] = useState(null);

  const handleSchedule = (index) => {
    const updatedSelectedVaccines = [...selectedVaccines];
    updatedSelectedVaccines[index] = true;
    setSelectedVaccines(updatedSelectedVaccines);
    setIsVaccineScheduled(true);
  };

  const handleAddVaccine = () => {
    if (isVaccineScheduled) {
      setIsAddVaccineFormOpen(true);
    } else {
      alert('Error', 'Please select and schedule a vaccine before scheduling a new one.');
    }
  };

  const handleBack = () => {
    navigation.navigate("PatientHome", { email: email });
  };

  const addChild = async () => {
    try {
      const childData = {
        parentName: parentName,
        childName: newChildName,
        childAge: newChildAge,
        childGender: newChildGender,
        childPhoto: newChildPhoto,
        email: email
      };
      const docRef = await addDoc(collection(db, "children"), childData);
      console.log("Child added with ID: ", docRef.id);
      alert(
        "Success",
        "Child details added successfully. Reminder is set for vaccination.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("PatientHome", { email: email })
          }
        ]
      );
    } catch (error) {
      console.error("Error adding child: ", error);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewChildPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <ScrollView>
      <View>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            size="lg"
            style={styles.backIcon}
          />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tableContainer}>
        <Text style={styles.heading}>Vaccination Information</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Name</Text>
            <Text style={styles.tableHeader}>When to Give</Text>
            <Text style={styles.tableHeader}>Dose</Text>
            <Text style={styles.tableHeader}>Route</Text>
            <Text style={styles.tableHeader}>Site</Text>
            <Text style={styles.tableHeader}>Schedule</Text>
          </View>
          {dummyVaccines.map((vaccine, index) => {
            return (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableData}>{vaccine.name}</Text>
                <Text style={styles.tableData}>{vaccine.whenToGive}</Text>
                <Text style={styles.tableData}>{vaccine.dose}</Text>
                <Text style={styles.tableData}>{vaccine.Route}</Text>
                <Text style={styles.tableData}>{vaccine.site}</Text>
                <Text style={styles.tableData}>
                  <TouchableOpacity onPress={() => handleSchedule(index)}>
                    <Text
                      style={
                        selectedVaccines[index]
                          ? styles.tableStatusBlue
                          : styles.tableStatus
                      }>
                      {selectedVaccines[index] ? "Scheduled" : "Schedule"}
                    </Text>
                  </TouchableOpacity>
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {isAddVaccineFormOpen && (
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Add A Children</Text>
          <TextInput
            placeholder="Enter Parent's Name"
            style={styles.input}
            value={parentName}
            onChangeText={text => setParentName(text)}
          />
          <TextInput
            placeholder="Enter Child's Name"
            style={styles.input}
            value={newChildName}
            onChangeText={text => setNewChildName(text)}
          />
          <TextInput
            placeholder="Enter Child's Age"
            style={styles.input}
            value={newChildAge}
            onChangeText={text => setNewChildAge(text)}
          />
          <TextInput
            placeholder="Enter Child's Gender"
            style={styles.input}
            value={newChildGender}
            onChangeText={text => setNewChildGender(text)}
          />
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
          <TouchableOpacity onPress={addChild} style={styles.addButton}>
            <Text style={styles.addButtonLabel}>Add Child</Text>
          </TouchableOpacity>
        </View>
      )}
      {!isAddVaccineFormOpen && (
        <TouchableOpacity onPress={handleAddVaccine} style={styles.addButton}>
          <Text style={styles.addButtonLabel}>Add child</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    color: "#0954a5",
    paddingHorizontal: 10,
    top: 6,
    left: 10,
  },
  backButtonText: {
    fontSize: 18,
    marginHorizontal: 10,
    fontWeight: "bold",
    color: "#0954a5",
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingVertical: 8,
  },
  tableHeader: {
    flex: 1,
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  tableData: {
    flex: 1,
    textAlign: "center",
  },
  tableStatus: {
    backgroundColor: "#33cc33",
    padding: 5,
    height: 30,
    color: "#fff",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  tableStatusBlue: {
    backgroundColor: "#0954a5",
    padding: 5,
    color: "#fff",
    paddingHorizontal: 20,
    width: "auto",
    height: 30,
    borderRadius: 5,
  },
  formContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    margin: 8,
    borderRadius: 8,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonLabel: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ChildVaccine;
