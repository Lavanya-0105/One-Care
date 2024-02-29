import React, { useState } from 'react';

function MedicationReminder() {
  // State to store the list of medications
  const [medications, setMedications] = useState([]);
  
  // State to store form input values
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [schedule, setSchedule] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new medication object
    const newMedication = {
      name: name,
      dosage: dosage,
      schedule: schedule
    };
    // Add the new medication to the list
    setMedications([...medications, newMedication]);
    setName('');
    setDosage('');
    setSchedule('');
  };

  return (
    <div>
      <h1>Medication Reminder</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Medication Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Dosage:
          <input type="text" value={dosage} onChange={(e) => setDosage(e.target.value)} />
        </label>
        <br />
        <label>
          Schedule:
          <input type="text" value={schedule} onChange={(e) => setSchedule(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add Medication</button>
      </form>
      <h2>Medications:</h2>
      <ul>
        {medications.map((medication, index) => (
          <li key={index}>
            <strong>{medication.name}</strong> - {medication.dosage}, Schedule: {medication.schedule}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MedicationReminder;
