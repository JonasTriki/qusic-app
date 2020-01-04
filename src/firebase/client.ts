import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {GeoFirestore} from 'geofirestore';

import firebaseConfig from './config';
firebase.initializeApp(firebaseConfig);

export const geoFirestore = (): GeoFirestore => {
  const db = firebase.firestore();
  return new GeoFirestore(db);
};

export const {firestore, auth} = firebase;
