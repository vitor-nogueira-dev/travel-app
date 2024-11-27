import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <section>
        Hello World
      </section>
    </Provider>
  );
};

export default App;

