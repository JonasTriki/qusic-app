import React, {FC, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ListRenderItemInfo} from 'react-native';
import {GeoPosition} from 'react-native-geolocation-service';
import ActionButton from 'react-native-action-button';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Map} from '_components';
import {location, distance} from '_utils';
import {Group} from '_models';
import {firestore, refs} from '_firebase';
import {useNavigation} from '_hooks';
import {Colors, Typography, Mixins, Spacing} from '_styles';

interface SelectGroupParams {
  locationPermissionGranted: boolean;
}

const SelectGroup: FC = () => {
  const navigation = useNavigation<SelectGroupParams>();
  const locationPermissionGranted = navigation.getParam<
    'locationPermissionGranted'
  >('locationPermissionGranted');

  const [position, setPosition] = useState<GeoPosition | null>(null);
  const [groups, setGroups] = useState<Group[] | null>(null);

  // Listen for position
  useEffect(() => {
    if (!locationPermissionGranted) {
      return;
    }
    const stopListening = location.listenForPosition(setPosition, error => {
      // TODO: Handle error
      console.log('Error when listening for position', error);
    });
    return () => {
      stopListening();
    };
  }, [locationPermissionGranted]);

  // Listen for nearby groups
  useEffect(() => {
    if (!position) {
      return;
    }
    const {latitude, longitude} = position.coords;
    refs.groups
      .near({
        center: new firestore.GeoPoint(latitude, longitude),
        radius: 10000,
      })
      .onSnapshot(
        snapshot => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            distance: doc.distance * 1000, // Convert to km
            ...doc.data(),
          }));
          setGroups(data);
        },
        geoError => {
          console.log('GeoQuery error', geoError);
        },
      );
  }, [position]);

  const createGroupBtnClick = () => {
    navigation.navigate('CreateGroup');
  };

  const renderListInfo = (text: string) => {
    return (
      <View style={styles.listInfo}>
        <Text style={styles.listInfoText}>{text}</Text>
      </View>
    );
  };

  const renderItemInfoEntry = (
    iconName: string,
    text: string,
    groupDistance: number,
  ) => {
    return (
      <View style={styles.groupItemInfoEntry}>
        <FontAwesome5
          name={iconName}
          color={groupDistance < 1000 ? Colors.PRIMARY : Colors.GRAY_DARK}
        />
        <Text
          style={{
            ...styles.groupItemInfoEntryText,
            color: groupDistance < 1000 ? Colors.BLACK : Colors.GRAY_DARK,
          }}>
          {text}
        </Text>
      </View>
    );
  };

  const renderItem = (info: ListRenderItemInfo<Group>) => {
    const {item} = info;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.groupItem}
        disabled={item.distance >= 1000}>
        <View style={styles.groupItemInfo}>
          <Text
            style={{
              ...styles.groupItemInfoTitle,
              color: item.distance < 1000 ? Colors.BLACK : Colors.GRAY_DARK,
            }}>
            {item.name}
          </Text>
          <View style={styles.groupItemInfoBottom}>
            {renderItemInfoEntry(
              'map-marker-alt',
              distance.convert(item.distance),
              item.distance,
            )}
            {renderItemInfoEntry(
              'users',
              item.devices.length.toString(),
              item.distance,
            )}
          </View>
        </View>
        <Text
          style={{
            ...styles.groupItemStatusText,
            color: item.distance < 1000 ? Colors.BLACK : Colors.GRAY_DARK,
          }}>
          {item.distance < 1000 ? 'Join group' : 'Get closer'}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderGroupListHeader = () => {
    return <Text style={styles.selectGroupTitle}>Select a group to join</Text>;
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.container}>
      <Map style={styles.map} />
      <View style={styles.selectGroup}>
        {groups !== null ? (
          groups.length > 0 ? (
            <FlatList
              data={groups.sort((a, b) => a.distance - b.distance)}
              renderItem={renderItem}
              ListHeaderComponent={renderGroupListHeader}
              ItemSeparatorComponent={renderSeparator}
              keyExtractor={item => item.id}
            />
          ) : (
            renderListInfo('No groups near you')
          )
        ) : (
          renderListInfo('Loading...')
        )}
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
  selectGroupTitle: {
    textAlign: 'center',
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: 'bold',
    ...Mixins.padding(Spacing.SCALE_12),
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_LIGHT,
  },
  listInfo: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listInfoText: {
    fontSize: Typography.FONT_SIZE_18,
  },
  groupItem: {
    display: 'flex',
    flexDirection: 'row',
    ...Mixins.padding(Spacing.SCALE_12),
  },
  groupItemInfo: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  groupItemInfoTitle: {
    fontSize: Typography.FONT_SIZE_16,
  },
  groupItemStatusText: {
    fontSize: Typography.FONT_SIZE_16,
    ...Mixins.padding(Spacing.SCALE_12),
  },
  groupItemInfoBottom: {
    display: 'flex',
    flexDirection: 'row',
  },
  groupItemInfoEntry: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupItemInfoEntryText: {
    paddingLeft: Spacing.SCALE_4,
    fontSize: Typography.FONT_SIZE_16,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.GRAY_LIGHT,
  },
});

export default SelectGroup;
