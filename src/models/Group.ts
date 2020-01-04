import {firestore} from 'firebase/app';

export interface Group {
  id: string;
  distance: number;
  name: string;
  hostUserId: string;
  devices: string[];
  password: string;
  coordinates: firestore.GeoPoint;
}
