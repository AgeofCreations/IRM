import * as actionTypes from '../actionTypes';
import { updateObject } from '../utility';

const combinatorStart = (state, action) => {
    return updateObject(state, {
        combinator_error: null,
        combinator_loading: true
    });
}