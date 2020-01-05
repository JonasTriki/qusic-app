import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Queue: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Queue</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
});

export default Queue;
