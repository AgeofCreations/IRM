import './App.css';
import 'antd/dist/antd.css'
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseRouter from './routes';
import 'antd/dist/antd.css';
import * as actions from './store/actions/auth';
import * as notificationActions from './store/actions/notifications';

import CustomLayout from './containers/layout';


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
    this.props.onGetNotificationsCount();
    // this.props.isAuthenticated ? this.props.onGetNotificationsCount() :
    // this.props.onNotificationsLogout() ;
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
    user_name: state.authReducer.user_name,
    user_id: state.authReducer.user_id,
    notificationsCount: state.notificationsReducer.count
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    onGetNotificationsCount: (user_id) => dispatch(notificationActions.notificationsGetAction(user_id)),
    onNotificationsLogout: () => dispatch(notificationActions.notificationsLogout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
