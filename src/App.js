import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Content from './components/Content'

import store from './store';
import { Provider } from 'react-redux';

function App(props) {
  return (
    <Provider store={store} >
      <div className="App">
        <Navbar />
        
        <Content />
      </div>
    </Provider>
  );
}

export default App;
