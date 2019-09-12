import * as actionTypes from '../actionTypes';
import { updateObject } from '../utility';


const initialState = {
    count: null,
    error: null,
    loading: false
}

const notificationsGetStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}
const notificationsGetSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        count: action.count
    });
}
const notificationsGetFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}
const notificationsLogout = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        count: 0
    });
}

const notificationsReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.NOTIFICATIONS_GET: return notificationsGetStart(state, action);
        case actionTypes.NOTIFICATIONS_GET_SUCCESS: return notificationsGetSuccess(state, action);
        case actionTypes.NOTIFICATIONS_GET_FAIL: return notificationsGetFail(state, action);
        case actionTypes.NOTIFICATIONS_LOGOUT: return notificationsLogout(state, action);
        default:
            return state;
    }
}

export default notificationsReducer;