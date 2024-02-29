import React, { useState } from 'react';

const LabTestBooking = () => {
  // Sample list of lab test plans
  const labTestplans = [
    { id: 1, name: 'Basic Blood Test', price: 50 },
    { id: 2, name: 'Full Body Checkup', price: 150 },
    { id: 3, name: 'Cholesterol Panel', price: 80 },
    // Add more plans as needed
  ];

  const [selectedplans, setSelectedplans] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [samplesCollected, setSamplesCollected] = useState(false);

  const handleplanSelect = (planId) => {
    const selectedplan = labTestplans.find((plan) => plan.id === planId);
  
    // Check if the Plan is not already selected
    if (!selectedplans.includes(selectedplan)) {
      setSelectedplans([...selectedplans, selectedplan]);
      setTotalPrice(totalPrice + selectedplan.price);
    } else {
      // If already selected, remove it
      const updatedplans = selectedplans.filter((plan) => plan.id !== planId);
      setSelectedplans(updatedplans);
      setTotalPrice(totalPrice - selectedplan.price);
    }
  };
  const handleConfirmBooking = () => {
    if (samplesCollected) {
      alert('Booking Confirmed!');
    } else {
      alert('Please collect lab samples first.');
    }
  };

  return (
    <div>
      <h1>Lab Test Booking</h1>

      <div>
        <h2>Select Lab Test plans:</h2>
        <ul>
          {labTestplans.map((labTest) => (
            <li key={labTest.id}>
              <input
                type="checkbox"
                id={`plan_${labTest.id}`}
                onChange={() => handleplanSelect(labTest.id)}
                checked={selectedplans.includes(labTest)}
              />
              <label htmlFor={`plan_${labTest.id}`}>
                {labTest.name} - ${labTest.price}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
      </div>

      <button onClick={() => setSamplesCollected(true)}>Lab Samples Collected</button>
      <button onClick={handleConfirmBooking}>Confirm Booking</button>
    </div>
  );
};

export default LabTestBooking;
