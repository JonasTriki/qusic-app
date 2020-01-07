import {createStackNavigator} from 'react-navigation-stack';

import {
  SelectGroup as SelectGroupScreen,
  CreateGroup as CreateGroupScreen,
  JoinGroup as JoinGroupScreen,
} from '_scenes';
import MainNavigator from './main-navigator';

const AppNavigator = createStackNavigator(
  {
    SelectGroup: {
      screen: SelectGroupScreen,
      navigationOptions: {
        header: null,
      },
    },
    CreateGroup: {
      screen: CreateGroupScreen,
      navigationOptions: {
        title: 'Create a new group',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
      },
    },
    JoinGroup: {
      screen: JoinGroupScreen,
      navigationOptions: {
        title: 'Join group',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
      },
    },
    Main: {
      screen: MainNavigator,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'SelectGroup',
  },
);

export default AppNavigator;
