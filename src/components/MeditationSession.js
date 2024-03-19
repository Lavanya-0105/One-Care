import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';

const MeditationSession = ({ navigation, route }) => {
  const { email } = route.params;

  const redirectToYouTubePlaylist = () => {
    // Replace 'YOUR_PLAYLIST_ID' with the actual ID of your YouTube playlist
    const playlistId = 'PLCr82oDz4rx8Z3nunsF7jb7nFWQGtOchA';

   
    const youtubePlaylistUrl = `https://www.youtube.com/playlist?list=${playlistId}`;

   
    Linking.openURL(youtubePlaylistUrl);
  };

  const handleBack = () => {

    navigation.navigate('PatientHome', { email: email });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meditation Session</Text>
      <Text style={styles.description}>
        Immerse yourself in tranquility with our pre-recorded meditation sessions on YouTube.
      </Text>
      <Image
        source={require('../assets/Meditationsession.png')} 
        style={styles.image}
      />
      <TouchableOpacity style={styles.button} onPress={redirectToYouTubePlaylist}>
        <Text style={styles.buttonText}>Open Playlist</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 40,
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 20,
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 550,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MeditationSession;