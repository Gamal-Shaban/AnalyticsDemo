import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from '../redux/slices/authSlice';
import {LoginScreen} from '../screens/loginScreen';

function HomeScreen() {
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={() => dispatch(logOut())}>
        <Text>logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const {userData} = useSelector(state => ({
    userData: state.user?.userData,
  }));
  console.log('userData', userData);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userData?.token ? (
          <>
            <Stack.Screen name="home" component={HomeScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
