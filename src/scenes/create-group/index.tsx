import React, {FC, useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useForm} from 'react-hook-form';

import {TouchableOpacity} from 'react-native-gesture-handler';

import {useNavigation} from '_hooks';
import {Colors, Typography, Spacing, Mixins} from '_styles';
import {location, navigation as navigationUtil} from '_utils';
import {auth} from '_firebase';
import {createGroup} from '_endpoints';

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

  const onSubmit = (data: FormData) => {
    setLoading(true);
    reset();
    location.getCurrentPosition(
      async position => {
        const user = auth().currentUser;
        if (user) {
          const idToken = await user.getIdToken(true);
          const res = await createGroup(
            data.groupName,
            position.coords.latitude,
            position.coords.longitude,
            user.uid,
            data.groupPassword || null,
            idToken,
          );
          if (res && res.status === 200) {
            const {groupId} = res.data.data;
            navigationUtil.navigateClearStack(navigation, 'Main', {groupId});
          } else {
            // TODO: Handle error
          }
        } else {
          // TODO: Handle error
        }
        setLoading(false);
      },
      error => {
        setLoading(false);
        // TODO: Handle error
        console.log(
          'Error fetching user position during group creation',
          error,
        );
      },
    );
  };

  // Focus group name input on load
  useEffect(() => {
    if (groupNameRef.current) {
      groupNameRef.current.focus();
    }
  }, []);

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

        <Text>Group password (optional)</Text>
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
          <ActivityIndicator size="small" color={Colors.WHITE} />
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
    ...Mixins.padding(Spacing.SCALE_16),
  },
  textInputWrapper: {
    ...Mixins.margin(Spacing.SCALE_4, 0, Spacing.SCALE_16, 0),
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.GRAY_LIGHT,
    borderRadius: Spacing.SCALE_4,
    fontSize: Typography.FONT_SIZE_16,
    ...Mixins.padding(Spacing.SCALE_8),
  },
  requiredField: {
    color: Colors.ALERT,
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    ...Mixins.padding(Spacing.SCALE_16),
  },
  submitButtonText: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CreateGroup;
