import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const {width} = Dimensions.get('window');

export const ProductDetails = ({route}) => {
  // Assuming you're using React Navigation and passing the product details via route.params
  const {image, title, price, specialPrice, id} = route.params;
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);

  const addToCart = () => {
    const newCartItem = {
      id,
      image,
      title,
      price,
      specialPrice,
    };
    navigation.navigate('cartScreen', {cartItem: newCartItem});
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Product Image */}
        <Image source={{uri: image}} style={styles.productImage} />

        {/* Product Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Product Price and Special Price */}
        <View style={styles.priceContainer}>
          {/* Show only price if specialPrice is null */}
          {specialPrice ? (
            <View>
              <Text style={[styles.price, {color: 'red'}]}>Price: {price}</Text>
              <Text style={styles.specialPrice}>
                Special Price: ${specialPrice}
              </Text>
            </View>
          ) : (
            <Text style={styles.regularPrice}>Price: {price}</Text>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addToCart} onPress={addToCart}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
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
  productImage: {
    width: width - 40, // Making the image take full width minus padding
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  priceContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 19,
    color: 'gray',
    textDecorationLine: 'line-through', // Strikes through the regular price
    marginBottom: 5,
    textAlign: 'center',
  },
  specialPrice: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
  },
  regularPrice: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  addToCart: {
    height: 50,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 35,
    right: 25,
    left: 25,
  },
  addToCartText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
