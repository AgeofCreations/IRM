import axios from 'axios';
import * as actionTypes from '../actionTypes';
//import { checkPropTypes } from 'prop-types';



export const combinatorStart = () => {
    return {
        type: actionTypes.COMBINATOR_START
    }
}

export const combinatorSuccess = (result) => {
    return {
        type: actionTypes.COMBINATOR_SUCCESS,
        result: result
    }
}
export const combinatorFail = (combinator_error) => {
    return {
        type: actionTypes.COMBINATOR_FAIL,
        user_error: combinator_error
    }
}
export const combinatorAction = (col1, col2, col3, col4, col5, col6, col7, col8, user_name, token) => {
    col1 ? col1 = col1 : col1 = ""
    col2 ? col2 = col2 : col2 = ""
    col3 ? col3 = col3 : col3 = ""
    col4 ? col4 = col4 : col4 = ""
    col5 ? col5 = col5 : col5 = ""
    col6 ? col6 = col6 : col6 = ""
    col7 ? col7 = col7 : col7 = ""
    col8 ? col8 = col8 : col8 = ""
    return dispatch => {
        dispatch(combinatorStart())
        // axios.defaults.headers = {
        //     "Content-Type": "application/json",
        //     Authorization: 'Token ' + token 
        // }
        axios.post('http://127.0.0.1:8000/combinator/', {
            first_column: col1,
            second_column: col2,
            third_column: col3,
            fourth_column: col4,
            fifth_column: col5,
            sixth_column: col6,
            seventh_column: col7,
            eighth_column: col8,
            // result: result.toString(),
            account_owner: user_name
        })
        .then(res => {
            const wrapedResult = res.data.result.toString().replace(/'/g, '').replace(/,/g, "\n");
            const result = wrapedResult.replace(/ {2}/g, '')
            console.log(result)
            dispatch(combinatorSuccess(result))
        })
        .catch(user_error => {
            if (user_error.res) {
                dispatch(combinatorFail(user_error.res.data))
            }
            })
        }
    }