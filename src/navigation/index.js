import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useSelector} from 'react-redux';

import {StyleSheet} from 'react-native';
import {AddressScreen} from '../screens/addressScreen';
import {CartScreen} from '../screens/cart';
import Home from '../screens/home';
import {LoginScreen} from '../screens/loginScreen';
import {ProductDetails} from '../screens/productDetails';
import {SummaryScreen} from '../screens/summaryScreen';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const {userData} = useSelector(state => ({
    userData: state.user?.userData,
  }));
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userData?.token ? 'home' : 'login'}>
        <Stack.Screen
          name="home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name="productDetails" component={ProductDetails} />
        <Stack.Screen name="cartScreen" component={CartScreen} />
        <Stack.Screen name="addressScreen" component={AddressScreen} />
        <Stack.Screen name="summaryScreen" component={SummaryScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'red',
  },
});
