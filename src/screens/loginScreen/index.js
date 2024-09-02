import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native';

export const LoginScreen = () => {
  const {navigate} = useNavigation();
  return <Text onPress={() => navigate('home')}>Login Screen</Text>;
};
