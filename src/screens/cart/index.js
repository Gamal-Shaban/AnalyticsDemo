import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const {width} = Dimensions.get('window');

export const CartScreen = () => {
  const params = useRoute().params;
  const {navigate} = useNavigation();
  const [cartItems, setCartItems] = useState([params?.cartItem]); // Initialize cart items from route params

  console.log('params.cartItems', params.cartItems);
  // Function to handle the removal of an item
  const handleRemoveItem = id => {
    // Show confirmation alert
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from the cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => {
            const updatedCartItems = cartItems.filter(item => item?.id !== id); // Remove the item
            setCartItems(updatedCartItems); // Update state with new cart items
          },
        },
      ],
      {cancelable: true},
    );
  };

  // Calculate total price and discount
  const totalPrice = cartItems.reduce((acc, item) => {
    return (
      acc +
      (item?.specialPrice
        ? parseFloat(item?.specialPrice)
        : parseFloat(item?.price))
    );
  }, 0);

  const totalDiscount = cartItems.reduce((acc, item) => {
    if (item?.specialPrice) {
      return acc + (parseFloat(item?.price) - parseFloat(item?.specialPrice));
    }
    return acc;
  }, 0);

  console.log('data>>>');
  const renderCartItem = ({item}) => {
    console.log('item render', item);
    return (
      <View style={styles.cartItem}>
        <Image source={{uri: item?.image}} style={styles.cartItemImage} />
        <View style={styles.cartItemDetails}>
          <Text style={styles.cartItemTitle}>{item?.title}</Text>
          {item?.specialPrice ? (
            <View>
              <Text style={styles.price}>Price: ${item?.price}</Text>
              <Text style={styles.specialPrice}>
                Special Price: ${item?.specialPrice}
              </Text>
            </View>
          ) : (
            <Text style={styles.regularPrice}>Price: ${item?.price}</Text>
          )}
          {/* Add Remove Button */}
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveItem(item?.id)}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cart</Text>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={item => item?.id}
          />

          {/* Total and Discount */}
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>
              Total Discount: ${totalDiscount.toFixed(2)}
            </Text>
            <Text style={styles.summaryText}>
              Total Price: ${totalPrice.toFixed(2)}
            </Text>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            onPress={() => {
              // Handle the continue button press
              navigate('addressScreen', {cartItems}); // Assuming you have a Checkout screen
            }}
            style={styles.continueButton}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty!</Text>
      )}
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
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  cartItemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  cartItemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  cartItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: 'gray',
    textDecorationLine: 'line-through',
    marginBottom: 5,
  },
  specialPrice: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  regularPrice: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  summaryContainer: {
    marginTop: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  summaryText: {
    fontSize: 18,
    marginBottom: 5,
  },
  removeButton: {
    marginTop: 10,
    padding: 5,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  continueButton: {
    height: 50,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  continueText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
