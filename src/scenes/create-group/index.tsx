import React, {FC} from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import {useForm} from 'react-hook-form';

import {useNavigation} from '_hooks';
import {Colors, Typography, Spacing} from '_styles';
import {padding, margin} from 'styles/mixins';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface FormData {
  groupName: string;
  groupPIN: string;
}

const CreateGroup: FC = () => {
  const navigation = useNavigation();
  const {register, setValue, handleSubmit, errors} = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    console.log('Submitted data', data);
  };

  return (
    <>
      <View style={styles.container}>
        <Text>Group name</Text>
        <TextInput
          style={styles.textInput}
          ref={() => register({name: 'groupName'}, {required: true})}
          onChangeText={text => setValue('groupName', text, true)}
        />
        {errors.groupName && <Text>This is required.</Text>}

        <Text>Group PIN (optional)</Text>
        <TextInput
          style={styles.textInput}
          ref={() => register({name: 'groupPIN'}, {required: true})}
          onChangeText={text => setValue('groupPIN', text, true)}
        />
        {errors.groupPIN && <Text>This is required.</Text>}
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.submitButtonText}>Create group</Text>
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
  textInput: {
    borderWidth: 1,
    borderColor: Colors.GRAY_LIGHT,
    borderRadius: Spacing.SCALE_4,
    fontSize: Typography.FONT_SIZE_16,
    ...padding(Spacing.SCALE_8),
    ...margin(Spacing.SCALE_4, 0, Spacing.SCALE_16, 0),
  },
  submitButton: {
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
