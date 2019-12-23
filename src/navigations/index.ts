import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import {Splash as SplashScreen} from '_scenes';
import AppNavigator from './app-navigator';

const RootNavigator = createSwitchNavigator(
  {
    Splash: SplashScreen,
    App: AppNavigator,
  },
  {
    initialRouteName: 'Splash',
  },
);

export default createAppContainer(RootNavigator);
