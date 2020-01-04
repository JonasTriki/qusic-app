import {createStackNavigator} from 'react-navigation-stack';

import {
  CreateGroup as CreateGroupScreen,
  SelectGroup as SelectGroupScreen,
  Main as MainScreen,
} from '_scenes';

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
    Main: {
      screen: MainScreen,
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
