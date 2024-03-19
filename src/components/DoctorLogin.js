import React, { useState } from 'react';
import { StyleSheet, View, TextInput, ImageBackground, Image, TouchableOpacity, Text } from 'react-native';
import { db } from '../firebase'; 
import { collection, getDocs,  query, where} from "firebase/firestore";


const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>© 2024 OneCare. All Rights Reserved.</Text>
  </View>
);

function DoctorLogin({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const doctorQuery = query(collection(db, 'doctors'), where('username', '==', username));
    const querySnapshot = await getDocs(doctorQuery);
  
    if (!querySnapshot.empty) {
      const doctorDoc = querySnapshot.docs[0];
      const data = doctorDoc.data();
  
      if (data.password === password) {
       alert('Login Successful');
        navigation.navigate('DoctorHome', { doctorName: data.name });
      } else {
        alert('Login Failed', 'Invalid username or password. Please try again.');
      }
    } else {
      alert('Login Failed', 'Doctor not found. Please check your username.');
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <ImageBackground
      source={require('../assets/health3.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../assets/onecare-logo.png')}
              resizeMode="contain" />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry />
          <Text style={styles.forgotLink} onPress={handleForgotPassword}>
            Forgot Password?
          </Text>
          <TouchableOpacity
            style={!username || !password ? [styles.buttonCss, styles.disabledCss] : styles.buttonCss}
            onPress={handleLogin}
          >
            <Text style={styles.buttonTextCss}>Login</Text>
          </TouchableOpacity>
          
        </View>
      </View>
      <Footer/>
    </ImageBackground>
  );
}

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
  loginContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    width: '150%',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    aspectRatio: 4 / 3,
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
  buttonCss: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0954a5',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
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
  googleButton: {
    backgroundColor: '#DB4437', 
  },
  
 
  
  buttonIcon: {
    color: 'white',
    marginRight: 10,
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

export default DoctorLogin;