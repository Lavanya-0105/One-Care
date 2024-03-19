import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>© 2024 OneCare. All Rights Reserved.</Text>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    backgroundColor: '#white',
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    color: '#333',
    fontSize: 12,
  },
});

export default Footer;
