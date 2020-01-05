import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const GroupInfo: FC = () => {
  return (
    <View style={styles.container}>
      <Text>GroupInfo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
});

export default GroupInfo;
