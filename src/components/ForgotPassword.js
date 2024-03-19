import React, { useState } from 'react';
import { StyleSheet, View, TextInput,  ImageBackground, Image, TouchableOpacity, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { auth} from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth'; 

const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>© 2024 OneCare. All Rights Reserved.</Text>
  </View>
);
const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation(); 

  const handleSubmit = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password Reset Email Sent', 'Please check your email for instructions to reset your password.');
    } catch (error) {
      const errorMessage = error.message;
      alert('Error', errorMessage);
    }
  };

  const backToLogin = () => {
    navigation.navigate('Login'); 
  };


  return (
    <ImageBackground
     source={require('../assets/health5.jpeg')}
     style={styles.backgroundImage}
   >
      <View style={styles.container}>
        <View style={styles.forgetPassContainer}>
          <View style={styles.innerContent}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require('../assets/onecare-logo.png')}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.text}>
              Please enter your verified email address and we will send you a password reset link.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TouchableOpacity style={styles.buttonCss} onPress={handleSubmit}>
            <Text style={styles.buttonTextCss}>Send Email</Text>
          </TouchableOpacity>
          <View style={styles.messgaeView}>
        <Text> Return to Login page</Text>
       <Text style={styles.link} onPress={backToLogin}>
                Login
              </Text>
      </View>
       
          </View>
        </View>
      </View>
      <Footer />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  forgetPassContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    width: '120%',
    alignItems: 'center',
  },
  innerContent: {
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    aspectRatio: 4 / 3,
  },
  text: {
    // padding: 10,
    paddingVertical: 10,
    width: '80%',
    textAlign: 'center'
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  forgotLink: {
    color: '#0f67c3',
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'flex-end',
    cursor: 'pointer',
  },
  buttonCss: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0954a5',
    padding: 10,
    borderRadius: 5,
    cursor: 'pointer',
  },
  buttonTextCss: {
    color: 'white',
    marginLeft: 5,
    fontSize: 14,
  },
  disabledCss: {
    backgroundColor: '#dedede',
    cursor: 'not-allowed',
  },
  messgaeView: {
    flexDirection: 'row',
    marginTop: 20,
  },

  link: {
    color: '#0954a5',
    marginBottom: 10,
    marginStart: 5,
    fontWeight: '700',
    borderBottomWidth: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f8f8f8',
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    color: '#333',
    fontSize: 12,
  },
});

export default ForgetPassword;