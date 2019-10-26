/* eslint-disable no-self-assign */
import axios from 'axios';
import * as actionTypes from '../actionTypes';
//import { checkPropTypes } from 'prop-types';
import backendURL from '../../consts'




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

export const combinatorClear = () => {
    return {
        type: actionTypes.COMBINATOR_CLEAR
    }
}

export const combinatorAction = (value1, value2, value3, value4, value5, value6, value7, value8, user_name, token) => {
    value1 ? value1 = value1 : value1 = ""
    value2 ? value2 = value2 : value2 = ""
    value3 ? value3 = value3 : value3 = ""
    value4 ? value4 = value4 : value4 = ""
    value5 ? value5 = value5 : value5 = ""
    value6 ? value6 = value6 : value6 = ""
    value7 ? value7 = value7 : value7 = ""
    value8 ? value8 = value8 : value8 = ""
    return dispatch => {
        dispatch(combinatorStart())
        axios.post(`${backendURL}/combinator/`, {
            first_column: value1,
            second_column: value2,
            third_column: value3,
            fourth_column: value4,
            fifth_column: value5,
            sixth_column: value6,
            seventh_column: value7,
            eighth_column: value8,
            account_owner: user_name
        })
        .then(res => {
            const wrapedResult = res.data.result.toString().replace(/'/g, '').replace(/,/g, "\n");
            
            var result = wrapedResult.replace(/ {2}/g, ' ')// Я не имею ни майлешего представления почему, но обернуть эту строку в цикл мне не помогло.
            var result2 = result.replace(/ {2}/g, ' ')
            var result3 = result2.replace(/ {2}/g, ' ')
            var result4 = result3.replace(/ {2}/g, ' ')
            dispatch(combinatorSuccess(result4))
            
        })
        .catch(user_error => {
            if (user_error.res) {
                dispatch(combinatorFail(user_error.res.data))
            }
            })
        }
    }