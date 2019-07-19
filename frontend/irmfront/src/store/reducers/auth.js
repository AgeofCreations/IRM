import * as actionTypes from '../actionTypes';
import { updateObject } from '../utility';


// ИЗНАЧАЛЬНОЕ СОСТОЯНИЕ
const initialState = {
    token: null,
    error: null, 
    loading: false,
    confirmation_await: false,
    success: false,
    confirmation_success: false,
    confirmation_error: null,
    user_loading: false,
    user_error: null,
    user_groups: null,
    user_email: null,
    user_name: null,

}

// АУТЕНТИФИКАЦИЯ
const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false,
        success: true
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        success: false
    });
}

// Подтверждение емейла
const emailConfirmation = (state, action) => {
    return updateObject(state, {
        confirmation_await: true,
        confirmation_success: false,
        confirmation_error: null
    });
}
const emailConfirmationSuccess = (state, action) => {
    return updateObject(state, {
        confirmation_await: false,
        confirmation_success: true,
        confirmation_error: null
    });
}
const emailConfirmationError = (state, action) => {
    return updateObject(state, {
        confirmation_await: false,
        confirmation_success: false,
        confirmation_error: action.confirmation_error
    });
}

// ПОЛУЧЕНИЕ ПРОФИЛЯ ПОЛЬЗОВАТЕЛЯ
const userProfileGet = (state, action) => {
    return updateObject(state, {
        user_loading: true,
        user_error: null
    })
}

const userProfileGetSuccess = (state, action) => {
    return updateObject(state, {
        user_groups: action.user_groups[0],
        user_name: action.user_name,
        user_email: action.email,
        user_loading: false,
        user_error: null

    })
}
const userProfileGetFail = (state, action) => {
    return updateObject(state, {
        user_loading: false,
        user_error: state.user_error

    })
}
// ЛОГАУТ
const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        success: false,
        user_groups: null,
        user_email: null,
        user_name: null,
        user_loading: false,
    });
}


// ТУТ ВСЁ ПОНЯТНО ЭТО REDUCER
const authReducer = (state=initialState, action) => {
    switch (action.type) {
        // СООТВЕТСТВЕННО АУТЕНТИФИКАЦИЯ
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        // Соответственно подтверждение емейла
        case actionTypes.EMAIL_CONFIRMATION_REQUEST: return emailConfirmation(state, action);
        case actionTypes.EMAIL_CONFIRMATION_REQUEST_SUCCESS: return emailConfirmationSuccess(state, action);
        case actionTypes.EMAIL_CONFIRMATION_REQUEST_ERROR: return emailConfirmationError(state, action);
        // Соответственно получение профиля пользователя
        case actionTypes.USER_PROFILE_GET: return userProfileGet(state, action);
        case actionTypes.USER_PROFILE_GET_SUCCESS: return userProfileGetSuccess(state, action);
        case actionTypes.USER_PROFILE_GET_FAIL: return userProfileGetFail(state, action);
        default:
            return state;
    }
}

export default authReducer;