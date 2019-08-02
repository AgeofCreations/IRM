import * as actionTypes from '../actionTypes';
import { updateObject } from '../utility';



const initialState = {
    combinator_result: null,
    combinator_error: null, 
    combinator_loading: false
}

const combinatorStart = (state, action) => {
    return updateObject(state, {
        combinator_error: null,
        combinator_loading: true
    });
}
const combinatorSuccess = (state, action) => {
    return updateObject(state, {
        combinator_result: action.result,
        combinator_loading: false,
        combinator_error: false
    })
}

const combinatorFail = (state, action) => {
    return updateObject(state, {
        combinator_error: action.combinator_error,
        combinator_loading: false
    });
}

const combinatorClear = (state, action) => {
    return updateObject(state, {
        combinator_result: ''
    })
}

const combinatorReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.COMBINATOR_START: return combinatorStart(state, action);
        case actionTypes.COMBINATOR_SUCCESS: return combinatorSuccess(state, action);
        case actionTypes.COMBINATOR_FAIL: return combinatorFail(state, action);
        case actionTypes.COMBINATOR_CLEAR: return combinatorClear(state, action);
        default:
            return state;
    }
}

export default combinatorReducer;