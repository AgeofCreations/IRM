import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, compose, applyMiddleware } from 'redux';
import authReducer from './store/reducers/auth';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
//import CustomLayout from './containers/layout';



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();


const composeEnhances =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const store = createStore(authReducer, composeEnhances(
    applyMiddleware(thunk)
));
const app = (
    <Provider store={store}>
        <App />
    </Provider>

)


ReactDOM.render(app, document.getElementById('root'));