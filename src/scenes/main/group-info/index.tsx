import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '_styles';

const GroupInfo: FC = () => {
  return (
    <View style={styles.container}>
      <Text>GroupInfo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    display: 'flex',
    flex: 1,
  },
});

export default GroupInfo;
