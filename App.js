import React from 'react';
import {persistor, store} from 'src/store';
import {Provider} from 'react-redux';
import {Navigator} from 'src/navigation';
import {PersistGate} from 'redux-persist/integration/react';

if (__DEV__) {
  import('src/config/reactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigator />
      </PersistGate>
    </Provider>
  );
};
