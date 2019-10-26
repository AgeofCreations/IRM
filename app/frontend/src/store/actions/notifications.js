import * as actionTypes from '../actionTypes';
import axios from 'axios'
import backendURL from '../../consts'

const token = localStorage.getItem('token');
if (token != null) {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: 'Token ' + token}
    }

export const notificationsGetStart = () => {
    return{
        type: actionTypes.NOTIFICATIONS_GET
    }
}

export const notificationsGetSuccess = (notifications_count) => {
    return {
        type: actionTypes.NOTIFICATIONS_GET_SUCCESS,
        count: notifications_count
    }
}
export const notificationsGetFail = () => {

    return {
        type: actionTypes.NOTIFICATIONS_GET_FAIL
    }
}
export const notificationsLogout = () => {

    return {
        type: actionTypes.NOTIFICATIONS_LOGOUT,        
    }
}
export const notificationsGetAction = (user_id) => {
    return dispatch => {
        dispatch(notificationsGetStart)
        axios.get(`${backendURL}/crowler/notify/?not_read=${user_id}`)
             .then (res => {
                 const notifications_count = res.data.count;
                 dispatch(notificationsGetSuccess(notifications_count));
             })
    }
}