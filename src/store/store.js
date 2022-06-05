import {combineReducers} from 'redux';
import {
  appAuthorizationReducer,
  appCardsReducer,
  appErrorReducer,
  appPacksReducer,
  appReducer,
} from './reducers';
import Reactotron from 'src/config/reactotronConfig';
import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';

const rootReducers = combineReducers({
  app: appReducer,
  authorization: appAuthorizationReducer,
  error: appErrorReducer,
  packs: appPacksReducer,
  cards: appCardsReducer,
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
  enhancers: [Reactotron.createEnhancer()],
});
