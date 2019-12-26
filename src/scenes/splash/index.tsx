import React, {FC, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {useNavigation} from '_hooks';
import {Colors} from '_styles';

import logoNoBg from '_assets/images/logo_white_no_bg.png';
import {location} from '_utils';

const Splash: FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const locationPermissionGranted = await location.requestLocationPermission();

      // Navigate to select group with our result
      navigation.navigate('SelectGroup', {locationPermissionGranted});
    })();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={logoNoBg} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
  },
  rect: {
    backgroundColor: Colors.SUCCESS,
    width: 224,
    height: 224,
  },
});

export default Splash;
