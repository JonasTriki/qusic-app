import React, {FC, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GeoPosition, GeoError} from 'react-native-geolocation-service';
import ActionButton from 'react-native-action-button';

import {Map} from '_components';
import {location} from '_utils';
import {useNavigation} from '_hooks';
import {Colors} from '_styles';

interface SelectGroupParams {
  locationPermissionGranted: boolean;
}

const SelectGroup: FC = () => {
  const navigation = useNavigation<SelectGroupParams>();
  const locationPermissionGranted = navigation.getParam<
    'locationPermissionGranted'
  >('locationPermissionGranted');

  const [position, setPosition] = useState<GeoPosition | null>();
  const [error, setError] = useState<GeoError | null>();

  useEffect(() => {
    if (!locationPermissionGranted) {
      return;
    }
    const stopListening = location.listenForPosition(setPosition, setError);
    return () => stopListening();
  }, [locationPermissionGranted]);

  const createGroupBtnClick = () => {
    navigation.navigate('CreateGroup');
  };

  return (
    <View style={styles.container}>
      <Map style={styles.map} />
      <View style={styles.selectGroup}>
        <ActionButton
          buttonColor={Colors.PRIMARY}
          onPress={createGroupBtnClick}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  map: {
    flex: 1,
  },
  selectGroup: {
    flex: 1,
  },
});

export default SelectGroup;
