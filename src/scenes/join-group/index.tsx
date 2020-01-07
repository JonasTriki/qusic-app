import React, {FC} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Colors} from '_styles';

interface JoinGroupParams {}

const JoinGroup: FC<JoinGroupParams> = () => {
  return (
    <View style={styles.container}>
      <Text>Join group</Text>
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

export default JoinGroup;
