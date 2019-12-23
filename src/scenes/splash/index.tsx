import React, {FC, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {useNavigation} from '_hooks';
import {Colors} from '_styles';

import logoNoBg from '_assets/images/logo_white_no_bg.png';

const Splash: FC = () => {
  const navigation = useNavigation();

  const performTimeConsumingTask = async () =>
    new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 2000),
    );

  useEffect(() => {
    (async () => {
      const data = await performTimeConsumingTask();

      if (data !== null) {
        navigation.navigate('SelectGroup');
      }
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
