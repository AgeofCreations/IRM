import axios from 'axios';
import * as actionTypes from '../actionTypes';
import * as notificationsActions from './notifications';

const backendAdress = '0.0.0.0:8000'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}


export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        success: true
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
        success: false
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}
export const emailConfirmationRequest = () => {
    return {
      type: actionTypes.EMAIL_CONFIRMATION_REQUEST
    }
  }
export const emailConfirmationRequestSuccess= key => {
    return {
      type: actionTypes.EMAIL_CONFIRMATION_REQUEST_SUCCESS
    }
  }
  
export const emailConfirmationRequestError = confirmation_error => {
    return {
      type: actionTypes.EMAIL_CONFIRMATION_REQUEST_ERROR,
      confirmation_error: confirmation_error
    }
  }

export const userProfileGet = () => {
    return {
        type: actionTypes.USER_PROFILE_GET,
    }
}

export const userProfileGetSuccess = (username, email, groups, id) => {
    return {
        type: actionTypes.USER_PROFILE_GET_SUCCESS,
        user_name: username,
        user_email: email,
        user_groups: groups,
        user_id: id
    }
}
export const userProfileGetFail = (user_error) => {
    return {
        type: actionTypes.USER_PROFILE_GET_FAIL,
        user_error: user_error
    }
}
export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000)
    }
}
export function emailConfirmationAction(key) {
    return dispatch => {
      dispatch(emailConfirmationRequest())
      axios
        .post(`http://${backendAdress}/account-confirm-email/`, key )
        .then(response => {
          dispatch(emailConfirmationRequestSuccess())
        })
        .catch(confirmation_error => {
            if(confirmation_error.response) {
                dispatch(emailConfirmationRequestError(confirmation_error.response.data))
            }
        })
    }
  }

export const userProfileGetAction = (token) => {
    return dispatch => {
        dispatch(userProfileGet())
        if (token != null) {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: 'Token ' + token 
        }
    }
        axios.get(`http://${backendAdress}/rest-auth/user/`)
        .then(res => {
            const username = res.data.username;
            const email = res.data.email;
            const groups = res.data.groups;
            const id = res.data.pk
            dispatch(userProfileGetSuccess(username, email, groups, id))
            dispatch(notificationsActions.notificationsGetAction(id))
        })
        .catch(user_error => {
            if (user_error.res) {
                dispatch(userProfileGetFail(user_error.res.data))
            }
            })
        }
    }

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(`http://${backendAdress}/rest-auth/login/`, {
            username: username,
            password: password
        })

        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 36000 * 10000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(userProfileGetAction(token));
            dispatch(checkAuthTimeout(3600));
            
        })
        .catch(error => {
            if(error.response) {
                dispatch(authFail(error.response.data))
            } 
        })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(`http://${backendAdress}/rest-auth/registration/`, {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 36000 * 10000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
            
        })
        .catch(error => {
            if(error.response) {
                dispatch(authFail(error.response.data))
                console.error(error.response.data)
            }
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= new Date() ) {
                dispatch(authLogout());
                dispatch(notificationsActions.notificationsLogout());
            } else {
                dispatch(authSuccess(token));
                dispatch(userProfileGetAction(token));
            }
        }
    }
}