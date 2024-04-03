import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Footer from '../components/Footer';
// Import your image
const bannerImage = require('../assets/DietDisplayBanner.jpeg');

const DietDisplay = ({ navigation }) => {

  const [selectedCondition, setSelectedCondition] = useState('');
  const [dietPlan, setDietPlan] = useState('');

  const dietPlans = {
    diabetes: {
      breakfast: 'Oatmeal with berries and nuts',
      snack1: 'Apple slices with peanut butter',
      lunch: 'Grilled chicken salad with olive oil dressing',
      snack2: 'Carrot sticks with hummus',
      dinner: 'Baked salmon with steamed vegetables',
      dessert: 'Greek yogurt with honey',
    },
    hypertension: {
      breakfast: 'Whole grain toast with avocado',
      snack1: 'Mixed nuts',
      lunch: 'Quinoa salad with mixed vegetables',
      snack2: 'Cucumber slices',
      dinner: 'Grilled fish with lemon',
      dessert: 'Fresh fruit salad',
    },
    highCholesterol: {
      breakfast: 'Egg white omelette with spinach and tomatoes',
      snack1: 'Cottage cheese with pineapple chunks',
      lunch: 'Grilled chicken breast with quinoa',
      snack2: 'Celery sticks with almond butter',
      dinner: 'Baked cod with asparagus',
      dessert: 'Berries with whipped cream',
    },
    obesity: {
      breakfast: 'High protein smoothie with spinach and berries',
      snack1: 'Greek yogurt with granola',
      lunch: 'Turkey and avocado wrap with whole wheat tortilla',
      snack2: 'Sliced bell peppers with hummus',
      dinner: 'Grilled shrimp with quinoa and roasted vegetables',
      dessert: 'Dark chocolate-covered strawberries',
    },
    heartDisease: {
      breakfast: 'Steel-cut oats with sliced banana and almonds',
      snack1: 'Walnuts and dried apricots',
      lunch: 'Salmon salad with mixed greens and vinaigrette',
      snack2: 'Edamame pods',
      dinner: 'Grilled chicken with brown rice and steamed broccoli',
      dessert: 'Baked apples with cinnamon and Greek yogurt',
    },
  };

  const handleConditionChange = (value) => {
    setSelectedCondition(value);
    setDietPlan(dietPlans[value]);
  };

  const back = () => {
    navigation.navigate('PatientHome');
  };

  return (
    <View style={styles.container}>
      
    
      <TouchableOpacity onPress={back} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Image source={bannerImage} style={styles.banner} />


      <Text style={styles.header}>Select Medical Condition:</Text>
      <Picker
        selectedValue={selectedCondition}
        style={styles.picker}
        onValueChange={handleConditionChange}
      >
        <Picker.Item label="Select Condition" value="" />
        <Picker.Item label="Diabetes" value="diabetes" />
        <Picker.Item label="Hypertension" value="hypertension" />
        <Picker.Item label="High Cholesterol" value="highCholesterol" />
        <Picker.Item label="Obesity" value="obesity" />
        <Picker.Item label="Heart Disease" value="heartDisease" />
      </Picker>
      
      {selectedCondition && (
        <View style={styles.dietContainer}>
          <Text style={styles.dietHeader}>Diet Plan:</Text>
          {Object.entries(dietPlan).map(([meal, food], index) => (
            <View key={index} style={styles.mealContainer}>
              <Text style={styles.mealLabel}>{meal}</Text>
              <Text>{food}</Text>
            </View>
          ))}
        </View>
      )}
      <Footer />
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
  banner: {
    width: '100%',
    height: 500,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 20,
    color: 'Black',
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  picker: {
    width: '80%',
    marginBottom: 20,
  },
  dietContainer: {
    width: '100%',
  },
  dietHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mealContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  mealLabel: {
    fontWeight: 'bold',
  },
});

export default DietDisplay;
