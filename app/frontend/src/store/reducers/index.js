import { combineReducers } from 'redux';
import authReducer from './auth';
import combinatorReducer from './combinator'


export default combineReducers({
    authReducer,
    combinatorReducer
})