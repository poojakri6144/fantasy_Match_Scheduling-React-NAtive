// App.js or SplashScreen.js

import React, {useEffect} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
const navigation=useNavigation()

  useEffect(() => {
    setTimeout(() => {
   
      navigation.navigate('Scheduled Matches');
    }, 2000); 
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/playtfg_logo.jpeg')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Splash;
