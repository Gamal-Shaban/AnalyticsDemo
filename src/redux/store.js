import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, createDynamicMiddleware} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import rootReducer from './reducers'; // Assuming you have your root reducer in this file

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const dynamicMiddleware = createDynamicMiddleware();
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(dynamicMiddleware.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
export default store;
