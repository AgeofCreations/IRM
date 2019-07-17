import axios from 'axios';
import * as actionTypes from '../actionTypes';



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
    // Функция, которая получает их полей списки и пересекает их
    const array1 = col1.split("\n");
    const array2 = col2.split("\n");
    const array3 = col3.split("\n");
    const array4 = col4.split("\n");
    const array5 = col5.split("\n");
    const array6 = col6.split("\n");
    const array7 = col7.split("\n");
    const array8 = col8.split("\n");
    const result = []
    for(let subitem1 of array1){
        for(let subitem2 of array2){
            for(let subitem3 of array3){
                for(let subitem4 of array4){
                    for(let subitem5 of array5){
                        for(let subitem6 of array6){
                            for(let subitem7 of array7){
                                for(let subitem8 of array8){
                                    result.push(`${subitem1} ${subitem2} ${subitem3} ${subitem4} ${subitem5} ${subitem6} ${subitem7} ${subitem8}`);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    //-------------------------------------
    // Ниже функция отправки результатов для записи в БД.
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
            result: result.toString(),
            account_owner: user_name
        })
        .then(res => {
            const result = res.data.result;
            dispatch(combinatorSuccess(result))
        })
        .catch(user_error => {
            if (user_error.res) {
                dispatch(combinatorFail(user_error.res.data))
            }
            })
        }
    }