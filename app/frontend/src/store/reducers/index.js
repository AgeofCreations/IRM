import { combineReducers } from 'redux';
import authReducer from './auth';
import combinatorReducer from './combinator'
import notificationsReducer from './notifications'



export default combineReducers({
    authReducer,
    combinatorReducer,
    notificationsReducer

})