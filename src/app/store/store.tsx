import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducers/index';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
    devTools: process.env.NODE_ENV !== 'production', 
  });

  const persistor = persistStore(store);

  persistor.subscribe(() => {
    const persistedState = persistor.getState();
    if (persistedState.bootstrapped) {
      console.log('Persisted State:', persistedState);
    }
  });

  return { store, persistor };
};
