import React, {FC, useEffect, useState} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle, Text} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {GeoError} from 'react-native-geolocation-service';

import config from '_config';
import {location} from '_utils';
import {Group} from '_models';

// Set Mapbox GL access token
MapboxGL.setAccessToken(config.MAPBOX_KEY_ACCESS_TOKEN);

interface MapProps {
  groups: Group[] | null;
  style?: StyleProp<ViewStyle>;
}

type GeoJSONPosition = number[];

const Map: FC<MapProps> = ({groups}) => {
  const [
    intialPosition,
    setInitialPosition,
  ] = useState<GeoJSONPosition | null>();
  const [error, setError] = useState<GeoError | null>();

  useEffect(() => {
    location.getCurrentPosition(
      position =>
        setInitialPosition([
          position.coords.longitude,
          position.coords.latitude,
        ]),
      setError,
    );
    MapboxGL.setTelemetryEnabled(false);
  }, []);

  if (!intialPosition) {
    return (
      <View style={styles.infoText}>
        <Text>Laster inn...</Text>
      </View>
    );
  } else if (error) {
    return (
      // TODO: Make this better
      <View style={styles.infoText}>
        <Text>En feil har oppstått</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        logoEnabled={false}
        attributionEnabled={false}
        style={styles.map}>
        <MapboxGL.Camera centerCoordinate={intialPosition} zoomLevel={15} />
        <MapboxGL.UserLocation />
        {groups &&
          groups.map(group => (
            <MapboxGL.PointAnnotation
              key={group.id}
              id={group.id}
              coordinate={[
                group.coordinates.longitude,
                group.coordinates.latitude,
              ]}>
              <MapboxGL.Callout title={group.name} />
            </MapboxGL.PointAnnotation>
          ))}
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  infoText: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    display: 'flex',
  },
  map: {
    flex: 1,
  },
});

export default Map;
