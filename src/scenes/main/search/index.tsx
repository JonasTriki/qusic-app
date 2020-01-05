import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Search: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Search</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
});

export default Search;
