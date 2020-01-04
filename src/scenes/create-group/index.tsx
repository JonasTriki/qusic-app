import React, {FC, useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import {useForm} from 'react-hook-form';

import {useNavigation} from '_hooks';
import {Colors, Typography, Spacing} from '_styles';
import {location} from '_utils';
import {auth} from '_firebase';
import {createGroup} from '_endpoints';

import {padding, margin} from 'styles/mixins';
import {TouchableOpacity} from 'react-native-gesture-handler';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface FormData {
  groupName: string;
  groupPassword: string;
}

const CreateGroup: FC = () => {
  const navigation = useNavigation();
  const groupNameRef = useRef<TextInput>(null);
  const groupPasswordRef = useRef<TextInput | null>(null);

  const {register, setValue, handleSubmit, reset, errors} = useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [spin] = useState(new Animated.Value(0));

  const onSubmit = (data: FormData) => {
    location.getCurrentPosition(
      async position => {
        const user = auth().currentUser;
        if (user) {
          const res = await createGroup(
            data.groupName,
            position.coords.latitude,
            position.coords.longitude,
            user.uid,
            data.groupPassword || null,
          );
          if (res && res.status === 200) {
            // TODO: Add navigation params (group id)
            navigation.navigate('Main');
          } else {
            // TODO: Handle error
          }
        } else {
          // TODO: Handle error
        }
      },
      error => {
        // TODO: Handle error
        console.log(
          'Error fetching user position during group creation',
          error,
        );
      },
    );
    console.log('Submitted data', data);
    setLoading(!loading);
    reset();
  };

  const AnimatedSpinner = Animated.createAnimatedComponent(FontAwesome5);

  // Focus group name input on load
  useEffect(() => {
    if (groupNameRef.current) {
      groupNameRef.current.focus();
    }
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spin]);

  useEffect(() => {
    register({name: 'groupName'}, {required: true});
    register({name: 'groupPassword'});
  }, [register]);

  return (
    <>
      <View style={styles.container}>
        <Text>Group name</Text>
        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.textInput}
            returnKeyType="next"
            ref={groupNameRef}
            onChangeText={text => setValue('groupName', text, true)}
            onSubmitEditing={() => {
              if (groupPasswordRef.current) {
                groupPasswordRef.current.focus();
              }
            }}
          />
          {errors.groupName && (
            <Text style={styles.requiredField}>This is required</Text>
          )}
        </View>

        <Text>Group PIN (optional)</Text>
        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.textInput}
            returnKeyType="done"
            ref={groupPasswordRef}
            onChangeText={text => setValue('groupPassword', text, true)}
            onSubmitEditing={() => handleSubmit(onSubmit)}
          />
          {errors.groupPassword && (
            <Text style={styles.requiredField}>This is required</Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}>
        {loading ? (
          <AnimatedSpinner
            name={'spinner'}
            size={Spacing.SCALE_22}
            color={Colors.WHITE}
            style={{
              transform: [
                {
                  rotate: spin.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            }}
          />
        ) : (
          <Text style={styles.submitButtonText}>Create group</Text>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    ...padding(Spacing.SCALE_16),
  },
  textInputWrapper: {
    ...margin(Spacing.SCALE_4, 0, Spacing.SCALE_16, 0),
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.GRAY_LIGHT,
    borderRadius: Spacing.SCALE_4,
    fontSize: Typography.FONT_SIZE_16,
    ...padding(Spacing.SCALE_8),
  },
  requiredField: {
    color: Colors.ALERT,
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    ...padding(Spacing.SCALE_16),
  },
  submitButtonText: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CreateGroup;
