import React, {FC, useEffect, useState} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle, Text} from 'react-native';

import config from '_config';
import {location} from '_utils';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {GeoError} from 'react-native-geolocation-service';
MapboxGL.setAccessToken(config.MAPBOX_KEY_ACCESS_TOKEN);

interface MapProps {
  style?: StyleProp<ViewStyle>;
}

type GeoJSONPosition = number[];

const Map: FC<MapProps> = () => {
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
