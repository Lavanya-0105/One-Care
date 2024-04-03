import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';


const VaccineList = () => {

  const vaccines = [
    { name: 'BCG', description: 'Bacille Calmette-Guérin (BCG) vaccine protects against tuberculosis (TB).' },
    { name: 'Hepatitis B', description: 'Hepatitis B vaccine protects against hepatitis B virus infection.' },
  
  ];

  return (
    <View style={styles.vaccineListContainer}>
      <Text style={styles.vaccineListHeader}>Vaccine List and Details</Text>
      {vaccines.map((vaccine, index) => (
        <View key={index} style={styles.vaccineListItem}>
          <Text style={styles.vaccineName}>{vaccine.name}</Text>
          <Text>{vaccine.description}</Text>
        </View>
      ))}
    </View>
  );
};

const ChildVaccine = () => {
  const [children, setChildren] = useState([]);
  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState('');
  const [newChildGender, setNewChildGender] = useState('');
  const [newChildPhoto, setNewChildPhoto] = useState(null);
  const [parentName, setParentName] = useState('');
  const [parentPhoto, setParentPhoto] = useState('');
  const [isAddChildFormOpen, setIsAddChildFormOpen] = useState(false);

  const toggleAddChildForm = () => {
    setIsAddChildFormOpen(!isAddChildFormOpen);
  };

  const addChild = () => {
    if (newChildName.trim() !== '' && newChildAge.trim() !== '' && newChildGender.trim() !== '' && newChildPhoto) {
      const child = {
        id: Math.random().toString(),
        name: newChildName.trim(),
        age: newChildAge.trim(),
        gender: newChildGender.trim(),
        photo: newChildPhoto,
        parent: {
          name: parentName,
          photo: parentPhoto,
        },
        vaccinations: [],
      };
      setChildren([...children, child]);
      setNewChildName('');
      setNewChildAge('');
      setNewChildGender('');
      setNewChildPhoto(null);
      setParentName('');
      setParentPhoto('');
      setIsAddChildFormOpen(false);
      Alert.alert('Success', 'Child added successfully!');
    } else {
      Alert.alert('Error', 'Please fill in all the details including the child photo.');
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
    <View style={styles.container}>
  
      
      {isAddChildFormOpen && (
        <View style={styles.formContainer}>
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

      {!isAddChildFormOpen && (
        <TouchableOpacity onPress={toggleAddChildForm} style={styles.addButton}>
          <Text style={styles.addButtonLabel}>Add New Child</Text>
        </TouchableOpacity>
      )}

      {children.length > 0 && (
        <View style={styles.childrenContainer}>
          {children.map(child => (
            <View key={child.id} style={styles.childCard}>
              <Image source={{ uri: child.photo }} style={styles.childPhoto} />
              <Text style={styles.childInfo}>Name: {child.name}</Text>
              <Text style={styles.childInfo}>Age: {child.age}</Text>
              <Text style={styles.childInfo}>Gender: {child.gender}</Text>
              <Text style={styles.childInfo}>Parent: {child.parent.name}</Text>
              <Text style={styles.childInfo}>Vaccinations:</Text>
              <View style={styles.vaccinationTable}>
                {/* Display child's vaccination details */}
                {child.vaccinations.map((vaccine, index) => (
                  <Text key={index}>{vaccine}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Display vaccine list */}
      <VaccineList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  formContainer: {
    marginTop: 20,
    width: '80%',
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
  childrenContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  childCard: {
    width: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  childPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  childInfo: {
    fontSize: 14,
    marginBottom: 5,
  },
  vaccinationTable: {
    marginTop: 10,
  },
  vaccineListContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '80%',
  },
  vaccineListHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  vaccineListItem: {
    marginBottom: 10,
  },
  vaccineName: {
    fontWeight: 'bold',
  },
});

export default ChildVaccine;
