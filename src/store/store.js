import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from 'redux';
import {
  appAuthorizationReducer,
  appErrorReducer,
  appPacksReducer,
  appReducer,
} from './reducers';
import Reactotron from 'src/config/reactotronConfig';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  app: appReducer,
  authorization: appAuthorizationReducer,
  error: appErrorReducer,
  packs: appPacksReducer,
});

export const store = createStore(
  reducers,
  compose(applyMiddleware(thunk), Reactotron.createEnhancer()),
);
