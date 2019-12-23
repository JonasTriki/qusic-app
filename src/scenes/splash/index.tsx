import React, {FC, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '_hooks';

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
    <View>
      <Text>Qusic</Text>
    </View>
  );
};

export default Splash;
