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

export const store = configureStore({
  reducer: {
    app: appReducer,
    authorization: appAuthorizationReducer,
    error: appErrorReducer,
    packs: appPacksReducer,
    cards: appCardsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
  enhancers: [Reactotron.createEnhancer()],
});
