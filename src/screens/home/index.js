import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {useDispatch} from 'react-redux';
import {logOut} from '../../redux/slices/authSlice';

const {width} = Dimensions.get('window');

const dataSlider = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1725267385461-cab515fc1bbe?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Slider 1',
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1724942462164-7c30f103d91c?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Slider 2',
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1719937206158-cad5e6775044?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Slider 3',
  },
];

const dataGrid = [
  {
    id: '1',
    title: 'Item 1',
    image:
      'https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
    price: '100',
    specialPrice: '90',
  },
  {
    id: '2',
    title: 'Item 2',
    image:
      'https://images.unsplash.com/photo-1529810313688-44ea1c2d81d3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hvZXN8ZW58MHx8MHx8fDA%3D',
    price: '200',
    specialPrice: null,
  },
  {
    id: '3',
    title: 'Item 3',
    image:
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNob2VzfGVufDB8fDB8fHww',
    price: '300',
    specialPrice: null,
  },
  {
    id: '4',
    title: 'Item 4',
    image:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNob2VzfGVufDB8fDB8fHww',
    price: '400',
    specialPrice: 350,
  },
];

export const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const renderGridItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => navigation.navigate('productDetails', {...item})}>
        <Image source={{uri: item.image}} style={styles.gridImage} />
        <Text style={styles.gridTitle}>{item.title}</Text>
        <Text style={styles.gridPrice}>Price: {item.price}</Text>
        {item.specialPrice && (
          <Text style={styles.gridSpecialPrice}>
            Special Price: {item.specialPrice}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <Swiper style={styles.wrapper} autoplay>
        {dataSlider?.map(i => {
          return (
            <TouchableOpacity style={styles.sliderItem}>
              <Image source={{uri: i.image}} style={styles.carouselImage} />
            </TouchableOpacity>
          );
        })}
      </Swiper>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Our Store</Text>
      </View>
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        data={dataGrid}
        renderItem={renderGridItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
      />
      <TouchableOpacity
        style={styles.logOutButton}
        onPress={() => {
          dispatch(logOut());
        }}>
        <Text style={styles.logOutText}>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    marginTop: Platform.OS === 'ios' ? 60 : 10,
  },
  wrapper: {
    height: 250,
    marginTop: 30,
  },
  sliderItem: {
    height: 200,
    borderColor: 'rgba(0,0,0,0.07)',
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 10,
  },
  carouselImage: {
    height: 200,
    borderRadius: 10,
  },
  gridContainer: {
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
  gridItem: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  gridImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 8,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  gridPrice: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  gridSpecialPrice: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  },
  logOutButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 65 : 15,
    padding: 10,
    borderRadius: 10,
    left: 20,
    zIndex: 1000,
  },
  logOutText: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Home;
