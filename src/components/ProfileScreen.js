// ProfileScreen.js

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: 'https://avatars.githubusercontent.com/u/90919030?v=4' }} // Profil fotoğrafınızın URL'sini buraya ekleyin
          style={styles.profileImage}
        />
      </View>
      <Text style={styles.fullName}>Semih YILDIZ</Text>
      <Text style={styles.bio}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida orci eu ligula
        accumsan, non congue turpis feugiat. In hac habitasse platea dictumst.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  fullName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
  },
});

export default ProfileScreen;
