import {PermissionsAndroid} from 'react-native';
import Geolocation, {
  SuccessCallback,
  ErrorCallback,
  GeoOptions,
} from 'react-native-geolocation-service';

const geoOpts: GeoOptions = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 10000,
};

const requestLocationPermission = async (): Promise<boolean> => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Qusic',
        message: 'Your location is required to find groups near you',
        buttonPositive: 'Grant permission',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      console.log('location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
  return false;
};

const getCurrentPosition = (
  successCallback: SuccessCallback,
  errorCallback: ErrorCallback,
): void => {
  Geolocation.getCurrentPosition(successCallback, errorCallback, geoOpts);
};

type StopListeningForPosition = () => void;

const listenForPosition = (
  successCallback: SuccessCallback,
  errorCallback: ErrorCallback,
): StopListeningForPosition => {
  const watchId = Geolocation.watchPosition(
    successCallback,
    errorCallback,
    geoOpts,
  );
  return () => Geolocation.clearWatch(watchId);
};

export {requestLocationPermission, getCurrentPosition, listenForPosition};
