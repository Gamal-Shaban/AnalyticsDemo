import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import userReducer from '../slices/authSlice';

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['userData'],
};

export default combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
});
