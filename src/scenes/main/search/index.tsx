import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '_styles';

const Search: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Search</Text>
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

export default Search;
