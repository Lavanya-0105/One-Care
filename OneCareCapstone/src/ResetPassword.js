import { StyleSheet, View, TextInput, ImageBackground, Image, TouchableOpacity, Text } from 'react-native';

const ResetPassword = () => {
 
  return (
    <ImageBackground
      source={require('./assets/doctor-picture.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.forgetPassContainer}>
          <View style={styles.innerContent}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require('./assets/onecare-logo.png')}
                resizeMode="contain"
              />
            </View>
           
            <TextInput
              style={styles.input}
              placeholder="Old Password"
             
            />
             <TextInput
              style={styles.input}
              placeholder="New Password"
            
            />
            <TouchableOpacity style={styles.buttonCss} >
            <Text style={styles.buttonTextCss}>Reset Password</Text>
          </TouchableOpacity>
       
          </View>
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
    marginBottom:5
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

export default ResetPassword;
