import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {trackEvent} from '../../utils/analytics';
import {events} from '../../utils/eventsNames';

export const SummaryScreen = () => {
  const {cartItems, address} = useRoute().params; // Get cart items and address
  const navigation = useNavigation();

  // Calculate total price and discount
  const totalPrice = cartItems.reduce((acc, item) => {
    return (
      acc +
      (item.specialPrice
        ? parseFloat(item.specialPrice)
        : parseFloat(item.price))
    );
  }, 0);

  const totalDiscount = cartItems.reduce((acc, item) => {
    if (item.specialPrice) {
      return acc + (parseFloat(item.price) - parseFloat(item.specialPrice));
    }
    return acc;
  }, 0);

  const renderCartItem = ({item}) => {
    return (
      <View style={styles.cartItem}>
        <Image source={{uri: item?.image}} style={styles.imageItem} />
        <View style={styles.itemContent}>
          <Text style={styles.cartItemTitle}>{item.title}</Text>
          <Text style={styles.cartItemPrice}>
            {item.specialPrice ? (
              <View>
                <Text style={styles.price}>Price: ${item.price}</Text>
                <Text style={styles.specialPrice}>
                  Special Price: ${item.specialPrice}
                </Text>
              </View>
            ) : (
              <Text style={styles.price}>Price: ${item.price}</Text>
            )}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Order Summary</Text>

      {/* Cart Items */}
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
      />

      {/* Summary Information */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Total Discount: ${totalDiscount.toFixed(2)}
        </Text>
        <Text style={styles.summaryText}>
          Total Price: ${totalPrice.toFixed(2)}
        </Text>
      </View>

      {/* Shipping Address */}
      <View style={styles.addressContainer}>
        <Text style={styles.addressHeading}>Shipping Address</Text>
        <Text style={styles.addressText}>{address}</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          trackEvent(events.purchase, {
            transaction_id: Math.floor(100000 + Math.random() * 900000),
            value: totalPrice,
            currency: 'USD',
            items: cartItems.map(i => ({
              id: i.id,
              name: i.title,
              price: i.specialPrice || i.price,
              quantity: 1,
            })),
          });
          Alert.alert(
            'Congratulations',
            ' You Have Successfully Payed your Order',
            [
              {
                text: 'Done',
                onPress: () => {
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{name: 'home'}],
                    }),
                  );
                },
              },
            ],
            {cancelable: true},
          );
        }}
        style={styles.continueButton}>
        <Text style={styles.continueText}>Confirm Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  cartItem: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
  },
  imageItem: {
    height: 100,
    width: 100,
  },
  itemContent: {
    marginLeft: 15,
  },
  cartItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    color: 'gray',
    textDecorationLine: 'line-through',
  },
  specialPrice: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  summaryContainer: {
    marginVertical: 20,
  },
  summaryText: {
    fontSize: 18,
    marginBottom: 5,
  },
  addressContainer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  addressHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addressText: {
    fontSize: 16,
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
