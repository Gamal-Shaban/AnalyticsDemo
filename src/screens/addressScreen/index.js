import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export const AddressScreen = ({route, navigation}) => {
  const {cartItems} = route.params; // Get cart items from the previous screen
  const [address, setAddress] = useState(''); // State to hold the address input

  const handleContinue = () => {
    if (address.trim() === '') {
      alert('Please enter your address');
      return;
    }

    // Navigate to the Checkout Screen, passing the cart items and address
    navigation.navigate('summaryScreen', {cartItems, address});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter Your Address</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
      />

      <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  continueButton: {
    height: 50,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
    position: 'absolute',
    bottom: 35,
    right: 25,
    left: 25,
  },
  continueText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
