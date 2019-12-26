import {createStackNavigator} from 'react-navigation-stack';

import {
  CreateGroup as CreateGroupScreen,
  SelectGroup as SelectGroupScreen,
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
  },
  {
    initialRouteName: 'SelectGroup',
  },
);

export default AppNavigator;
