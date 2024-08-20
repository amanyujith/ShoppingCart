import {combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import cartReducer from './cartSlice';
import orderReducer from './orderSlice'
// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, cartReducer);
const cartPersistConfig = {
  key: 'cart',
  storage,
};

const orderPersistConfig = {
  key: 'order',
  storage,
};
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedOrderReducer = persistReducer(orderPersistConfig, orderReducer);
const rootReducer = combineReducers({
  cart: persistedCartReducer,
  order: persistedOrderReducer,
});
const store = configureStore({
  reducer: rootReducer,
});
// const store = configureStore({
//   reducer: {
//     cart: persistedReducer,
//     order:orderReducer
//   },
// });

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
