import {
  appAuthorizationReducer,
  appCardsReducer,
  appErrorReducer,
  appPacksReducer,
  appReducer,
} from './reducers';
import Reactotron from 'src/config/reactotronConfig';
import thunk from 'redux-thunk';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['somethingTemporary'],
};

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: ['authorization'],
};

const rootReducer = combineReducers({
  app: appReducer,
  authorization: persistReducer(authPersistConfig, appAuthorizationReducer),
  error: appErrorReducer,
  packs: appPacksReducer,
  cards: appCardsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(thunk),
  enhancers: [Reactotron.createEnhancer()],
});

export const persistor = persistStore(store);
