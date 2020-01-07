import {useContext} from 'react';
import {
  NavigationScreenProp,
  NavigationRoute,
  NavigationContext,
} from 'react-navigation';

export type NavigationProp<T> = NavigationScreenProp<NavigationRoute, T>;

function useNavigation<Params>(): NavigationProp<Params> {
  return useContext(NavigationContext) as NavigationProp<Params>;
}

export default useNavigation;
