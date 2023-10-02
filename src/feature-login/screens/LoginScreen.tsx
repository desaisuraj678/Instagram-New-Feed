import React, {useContext, useState} from 'react';
import {ScrollView, StyleSheet, TextInput} from 'react-native';
import PrimaryButton from '../../core-ui/buttons/PrimaryButton';
import { AppContext } from '../../global-state/AppContext';
import { Colors } from '../../core-ui/theme/Colors';

function LoginScreen() {
  const {login} = useContext(AppContext) 
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const onUserNameChangeHandler = (input: string) => {
    setUserName(input);
  };
  const onPasswordChangeHandler = (input: string) => {
    setPassword(input);
  };

  const onButtonPressHandler = () => {
    login()
  };
  
  return (
    <ScrollView>
      <TextInput
        onChangeText={onUserNameChangeHandler}
        value={userName}
        style={styles.textInputStyle}
        placeholderTextColor={Colors.color_626262}
        placeholder="Username"
      />
      <TextInput
        placeholder="Password"
        onChangeText={onPasswordChangeHandler}
        value={password}
        style={styles.textInputStyle}
        placeholderTextColor={Colors.color_626262}
      />
      <PrimaryButton
        header="Sign in"
        onPressHandler={onButtonPressHandler}
        disabled={!userName || !password}
      />
    </ScrollView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  textInputStyle: {
    borderColor: Colors.color_1F41BB,
    borderWidth: 1,
    marginHorizontal: 32,
    height: 48,
    borderRadius: 16,
    marginTop: 16,
    paddingHorizontal: 16,
  },
});
