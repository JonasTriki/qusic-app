import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Main: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Main screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
});

export default Main;
