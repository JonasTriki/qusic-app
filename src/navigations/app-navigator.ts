import {createStackNavigator} from 'react-navigation-stack';

import SelectGroupScreen from '../scenes/select-group';

const TabNavigatorConfig = {
  initialRouteName: 'SelectGroup',
  header: null,
};

const RouteConfigs = {
  SelectGroup: {
    screen: SelectGroupScreen,
    navigationOptions: {
      header: null,
    },
  },
};

const AppNavigator = createStackNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;
