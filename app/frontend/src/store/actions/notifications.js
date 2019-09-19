import * as actionTypes from '../actionTypes';
import axios from 'axios'


const backendAdress = '0.0.0.0:8000'

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
        axios.get(`http://${backendAdress}/crowler/notify/?not_read=${user_id}`)
             .then (res => {
                 const notifications_count = res.data.count;
                 dispatch(notificationsGetSuccess(notifications_count));
             })
    }
}