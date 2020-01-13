import React, {FC, useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {auth} from '_firebase';

import {navigation as navigationUtil} from '_utils';
import {Colors, Spacing, Mixins, Typography} from '_styles';
import {useNavigation} from '_hooks';
import {joinGroup} from '_endpoints';

interface JoinGroupParams {
  groupId: string;
}

interface FormData {
  groupPassword: string;
}

const JoinGroup: FC = () => {
  const navigation = useNavigation<JoinGroupParams>();
  const groupId = navigation.getParam<'groupId'>('groupId');
  const groupPasswordRef = useRef<TextInput>(null);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    watch,
    errors,
    setError,
  } = useForm<FormData>();
  const values = watch();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    reset();
    const user = auth().currentUser;
    if (user) {
      const idToken = await user.getIdToken(true);
      const res = await joinGroup(groupId, data.groupPassword, idToken);
      if (res && res.status === 200) {
        const {} = res.data.data;
        navigationUtil.navigateClearStack(navigation, 'Main', {groupId});
      } else {
        setError(
          'groupPassword',
          'wrongPassword',
          'Password incorrect, please try again',
        );
      }
    } else {
      // TODO: Handle error
    }
    setLoading(false);
  };

  // Focus group password on load
  useEffect(() => {
    if (groupPasswordRef.current) {
      groupPasswordRef.current.focus();
    }
  }, []);

  useEffect(() => {
    register({name: 'groupPassword'}, {required: 'This is required'});
  }, [register]);

  return (
    <>
      <View style={styles.container}>
        <Text>Group password</Text>
        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.textInput}
            returnKeyType="done"
            ref={groupPasswordRef}
            onChangeText={text => setValue('groupPassword', text, true)}
            value={values.groupPassword}
            onSubmitEditing={() => handleSubmit(onSubmit)}
          />
          {errors.groupPassword && (
            <Text style={styles.inputError}>
              {errors.groupPassword.message}
            </Text>
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
          <Text style={styles.submitButtonText}>Join group</Text>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
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
  inputError: {
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

export default JoinGroup;
