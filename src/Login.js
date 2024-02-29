import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert, ImageBackground, Image, TouchableOpacity, Text } from 'react-native';
import { Link } from 'react-router-dom';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
     alert('Login Successful', 'Welcome, admin!');
      navigation.navigate('HomePage');
    } else {
     alert('Login Failed', 'Invalid username or password. Please try again.');
    }
  };

  const handleSignup = () => {
     navigation.navigate('SignupPage');
  };

  const handleLoginAsDoctor = () => {
  
    Alert.alert('Login as Doctor', 'Redirect to the doctor login page.');
    // navigation.navigate('DoctorLoginPage');
  };

  const handleForgotPassword = () => {
    navigation.navigate('forgot-password');
  };

  const contactSupport = () => {
    const supportEmail = 'support@example.com';
    const mailtoLink = `mailto:${supportEmail}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <ImageBackground
      source={require('./assets/doctor-picture.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('./assets/onecare-logo.png')}
              resizeMode="contain"
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            type="password"
          />
          <Text style={styles.forgotLink} onPress={handleForgotPassword}>
            Forgot Password?
          </Text>
          <TouchableOpacity
            style={!username || !password ? [styles.buttonCss, styles.disabledCss] : styles.buttonCss}
            onPress={handleLogin}
          >
            <Text style={styles.buttonTextCss}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCss} onPress={handleSignup}>
            <Text style={styles.buttonTextCss}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCss} onPress={handleLoginAsDoctor}>
            <Text style={styles.buttonTextCss}>Login as Doctor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCss} onClick={contactSupport}>
            <Text style={styles.buttonTextCss}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </View>
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
});

export default Login;
