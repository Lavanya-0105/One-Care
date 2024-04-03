import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// NutritionFacts component
const NutritionFacts = ({ data }) => {
  return (
    <View style={styles.nutritionFacts}>
  
      <Text style={styles.level1}>Nutrition Facts</Text>
      <View style={styles.line}></View> {/* Line or bar */}
      <Text style={styles.level2}>Amount Per Serving</Text>
      <Text style={styles.level0}>Calories: {data?.totalNutrients?.ENERC_KCAL?.quantity?.toFixed(0) ?? 'N/A'}</Text>
      <View style={styles.line}></View> {/* Line or bar */}
      <Text style={styles.level2}>Total Fat: {data?.totalNutrients?.FAT?.quantity?.toFixed(2) ?? 'N/A'} g </Text>
      <View style={styles.line2}></View>
      <Text style={styles.level3}>Saturated Fat: {data?.totalNutrients?.FASAT?.quantity?.toFixed(2) ?? 'N/A'} g </Text>
      <View style={styles.line2}></View>
      <Text style={styles.level3}>Trans Fat: {data?.totalNutrients?.FATRN?.quantity?.toFixed(2) ?? 'N/A'} g</Text>
      <View style={styles.line2}></View>
      <Text style={styles.level2}>Cholesterol: {data?.totalNutrients?.CHOLE?.quantity?.toFixed(2) ?? 'N/A'} mg </Text>
      <View style={styles.line2}></View>
      <Text style={styles.level2}>Sodium: {data?.totalNutrients?.NA?.quantity?.toFixed(2) ?? 'N/A'} mg </Text>
      <View style={styles.line2}></View>
      <Text style={styles.level2}>Total Carbohydrate: {data?.totalNutrients?.CHOCDF?.quantity?.toFixed(2) ?? 'N/A'} g </Text>
      <View style={styles.line2}></View>
      <Text style={styles.level3}>Dietary Fiber: {data?.totalNutrients?.FIBTG?.quantity?.toFixed(2) ?? 'N/A'} g </Text>
      <View style={styles.line2}></View>
      <Text style={styles.level3}>Total Sugars: {data?.totalNutrients?.SUGAR?.quantity?.toFixed(2) ?? 'N/A'} g</Text>
      <View style={styles.line2}></View>
      <Text style={styles.level2}>Protein: {data?.totalNutrients?.PROCNT?.quantity?.toFixed(2) ?? 'N/A'} g </Text>
      <View style={styles.line2}></View>
      <Text style={styles.level3}>Vitamin D: {data?.totalNutrients?.VITD?.quantity?.toFixed(2) ?? 'N/A'} µg </Text>
      <View style={styles.line2}></View>
      <Text style={styles.level3}>Calcium: {data?.totalNutrients?.CA?.quantity?.toFixed(2) ?? 'N/A'} mg </Text>
      <View style={styles.line2}></View>
      <Text style={styles.level3}>Iron: {data?.totalNutrients?.FE?.quantity?.toFixed(2) ?? 'N/A'} mg </Text>
      <View style={styles.line2}></View>
      <Text style={styles.level3}>Potassium: {data?.totalNutrients?.K?.quantity?.toFixed(2) ?? 'N/A'} mg </Text>
      <View style={styles.line2}></View>
</View>

  );
};


// Parent component
const CalorieCalculator = () => {
 
  const [ingredient, setIngredient] = useState('');
  const [responseText, setResponseText] = useState(null);

  const fetchCalories = async () => {
    try {
      const response = await fetch(
        `https://api.edamam.com/api/nutrition-data?app_id=4b56be63&app_key=5158733d31c5f697c8007a005c49fd29&ingr=${ingredient}`
      );
      const data = await response.json();
      setResponseText(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <text style={styles.input1}> What ingredient would you like to know more about? </text>
      
      <text style={styles.input1}>Enter an ingredient like "1 cup rice, 10 oz chickpeas,1 gram chana,1 whole egg", etc.</text>
      <TextInput
        style={[styles.input, { marginTop: 20 }]}
        placeholder="Eg: 10gms Chicken"
        value={ingredient}
        onChangeText={setIngredient}
      />
      
      <Button title="Calculate Calories" onPress={fetchCalories} />
      {responseText && <NutritionFacts data={responseText} />}
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingLeft:10,
    
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  input1: {
    
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    
    width: '100%',
    fontWeight:'bold',
  },
  level1:{
    fontSize: 24,
    textAlign:'center',
    fontWeight:'bold',
    marginBottom:10,


  },
  level0:{
    fontSize: 35,
    textAlign:'center',
    fontWeight:'bold',
    marginBottom:10,
  },
  level2:{
    fontSize: 16,
    
    fontWeight:'bold',
    marginBottom:10,

  },
  level3:{
    fontSize: 18,
    paddingLeft:30,
    
    marginBottom:10,

  },
  line: {
    borderBottomWidth: 8,
    borderBottomColor: 'rgb(200,200,200)',
    marginBottom: 20,
  },
  line2: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  nutritionFacts: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width:'30%',
  },
});

export default CalorieCalculator;
