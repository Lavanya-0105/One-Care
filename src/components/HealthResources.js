import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InfoCard = ({ imageSource, onPress }) => (
  <TouchableOpacity style={styles.infoCard} onPress={onPress}>
    <Image source={imageSource} style={styles.infoCardImage} />
  </TouchableOpacity>
);

const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>© 2024 OneCare. All Rights Reserved.</Text>
  </View>
);

const HealthResources = ({ route }) => {
  const navigation = useNavigation();
  const { email } = route.params;

  const handleGoBack = () => {
    navigation.goBack({ email });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack}>
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Health Resources:</Text>
      <Text style={styles.subtitle}>Explore various health resources to improve your well-being.</Text>
      <View style={styles.infoCardsContent}>
        <View style={styles.infoCardsRow}>
          <InfoCard
            imageSource={require('../assets/HealthResources/first.png')}
          />
          <InfoCard
            imageSource={require('../assets/HealthResources/second.png')}
          />
          <InfoCard
            imageSource={require('../assets/HealthResources/third.png')}
          />
        </View>
        <View style={styles.infoCardsRow}>
          <InfoCard
            imageSource={require('../assets/HealthResources/fourth.png')}
          />
          <InfoCard
            imageSource={require('../assets/HealthResources/fourth.png')}
          />
          <InfoCard
            imageSource={require('../assets/HealthResources/fourth.png')}
          />
        </View>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  backButton: {
    fontSize: 18,
    color: '#0954a5',
  },
  title: {
    fontSize: 46,
    fontWeight: 'bold',
    marginBottom: 150,
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  infoCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  infoCard: {
    height: 400,
    width: 350,
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    padding: 30,
    borderWidth: 1,
    borderColor: 'black',
    elevation: 10, // Add shadow for elevation effect
  },
  infoCardTitle: {
    color: 'blue',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  infoCardDescription: {
    color: 'light-blue',
    fontSize: 36,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 1,
    width: '100%',
    backgroundColor: '#f8f8f8',
    padding: 3,
    alignItems: 'center',
  },
  footerText: {
    color: '#00000',
    fontSize: 16,
  },
  infoCardImage: {
    width: 300,
    height: 300,
    marginBottom: 100,
    alignSelf: 'center',
  },
});

export default HealthResources;