import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css'
import CustomLayout from './containers/layout';

class App extends Component {
  render() {
      return (
        <div className="App">
            <CustomLayout />
        </div>
      );
   }
}

export default App;
