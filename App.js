import React from 'react';
import {store} from 'src/store';
import {Provider} from 'react-redux';
import {Navigator} from 'src/navigation';

if (__DEV__) {
  import('src/config/reactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

export const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};
