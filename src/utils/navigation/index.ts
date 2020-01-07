import {NavigationProp} from '_hooks';
import {
  StackActions,
  NavigationActions,
  NavigationParams,
} from 'react-navigation';

export function navigateClearStack<T>(
  navigation: NavigationProp<T>,
  routeName: string,
  params?: NavigationParams,
) {
  const navigateToMain = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName,
        params,
      }),
    ],
  });
  navigation.dispatch(navigateToMain);
}
