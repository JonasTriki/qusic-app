import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {MainQueueTab, MainSearchTab, MainGroupInfoTab} from '_scenes';
import {Colors, Spacing} from '_styles';

const MainNavigator = createMaterialBottomTabNavigator(
  {
    Queue: {screen: MainQueueTab},
    Search: {screen: MainSearchTab},
    GroupInfo: {screen: MainGroupInfoTab},
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({tintColor}) => {
        const {routeName} = navigation.state;
        let iconName = '';
        if (routeName === 'Queue') {
          iconName = 'playlist-play';
        } else if (routeName === 'Search') {
          iconName = 'magnify';
        } else if (routeName === 'GroupInfo') {
          iconName = 'account-multiple';
        }
        return (
          <MaterialCommunityIcon
            name={iconName}
            size={Spacing.SCALE_16}
            color={tintColor}
          />
        );
      },
    }),
    initialRouteName: 'Queue',
    activeColor: Colors.PRIMARY,
    inactiveColor: Colors.GRAY_MEDIUM,
    barStyle: {backgroundColor: Colors.WHITE},
    labeled: false,
  },
);

export default MainNavigator;
