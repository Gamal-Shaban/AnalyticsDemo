import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Input} from '../../components/input';
import {login} from '../../redux/slices/authSlice';
import {styles} from './styles';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const {errorMessage} = useSelector(state => ({
    errorMessage: state.user?.errorMessage,
  }));
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../images/analytics.png')}
        style={styles.logo}
      />
      <Input placeholder={'User Name'} onChangeText={setUsername} />
      <Input password placeholder={'password'} onChangeText={setPassword} />

      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          if (username && password) {
            dispatch(login({username: username.toLowerCase(), password}));
          } else {
            alert('Please fill all fields');
          }
        }}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
