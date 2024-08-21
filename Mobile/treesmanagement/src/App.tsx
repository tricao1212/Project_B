import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import MyStack from './navigations/MyStack';
import Home from './screens/Home';

const App = () => {
  return (
    // <Provider store={store}>
    //   <PaperProvider>
    //     <MyStack/>
    //     <Toast />
    //   </PaperProvider>
    // </Provider>
    <Home/>
  );
};

export default App;
