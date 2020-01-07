import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors, Mixins, Spacing, Typography} from '_styles';
import {useNavigation} from '_hooks';
import {navigateClearStack} from 'utils/navigation';

const Queue: FC = () => {
  const navigation = useNavigation();

  const leaveGroup = () => {
    // TODO: Send request to leave group
    navigateClearStack(navigation, 'SelectGroup');
  };

  const renderTopBar = () => {
    return (
      <View style={styles.topBarWrapper}>
        <View style={styles.topBar}>
          <IconButton
            style={styles.leaveGroupBtn}
            icon="exit-to-app"
            color={Colors.TEXT_COLOR}
            onPress={leaveGroup}
          />
          <Text style={styles.topBarTitle}>Queue</Text>
        </View>
      </View>
    );
  };

  const renderQueueListEmpty = () => {
    return (
      <View style={styles.queueListEmpty}>
        <Icon
          name="playlist-music"
          size={Spacing.SCALE_128}
          color={Colors.PRIMARY}
        />
        <Text style={styles.queueListEmptyText}>
          To queue songs, click the search icon below
        </Text>
      </View>
    );
  };

  const renderQueueList = () => {
    return <View style={styles.queueList}>{renderQueueListEmpty()}</View>;
  };

  return (
    <View style={styles.container}>
      {renderTopBar()}
      {renderQueueList()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    display: 'flex',
    flex: 1,
  },
  topBarWrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    ...Mixins.padding(Spacing.SCALE_8),
  },
  topBar: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leaveGroupBtn: {
    position: 'absolute',
    zIndex: 1,
    left: -Spacing.SCALE_8,
  },
  topBarTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Typography.FONT_SIZE_18,
  },
  queueList: {
    flex: 1,
    display: 'flex',
  },
  queueListEmpty: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...Mixins.padding(0, Spacing.SCALE_96, 0, Spacing.SCALE_96),
  },
  queueListEmptyText: {
    textAlign: 'center',
    fontSize: Typography.FONT_SIZE_20,
  },
});

export default Queue;
