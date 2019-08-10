import './App.css';
import 'antd/dist/antd.css'
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseRouter from './routes';
import 'antd/dist/antd.css';
import * as actions from './store/actions/auth';

import CustomLayout from './containers/layout';


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
      return (
        <div>
          <Router>
            <CustomLayout {...this.props}>
              <BaseRouter />
            </CustomLayout>
          </Router>
        </div>
      );
   }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token !== null,
    user_name: state.authReducer.user_name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
