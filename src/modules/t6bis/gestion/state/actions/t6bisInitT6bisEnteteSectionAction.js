import * as Constants from '../t6bisGestionConstants';
import T6bisGestionApi from '../../service/api/t6bisGestionApi';

export function request(action) {
    return (dispatch) => {
        console.log('action.value.codeType', action.value.codeType);
        
        dispatch(inProgress(action));
        T6bisGestionApi.initT6bisEnteteSection(action.value.codeType)
     
            .then((response) => {
                const data = response.data
                console.log('1*************************************************************************************************************************');
               // console.log('response', response);
                console.log('2*************************************************************************************************************************');
                console.log('response.data', response.data);
                console.log('3*************************************************************************************************************************');
                console.log('response.data.jsonVO', response.data.jsonVO);
                if (data.jsonVO) {
                    console.log('4*************************************************************************************************************************');
                    console.log('action.value 0 ', action.value);
                    console.log('5*************************************************************************************************************************');
                    action.value = { ...action.value,...data.jsonVO };
                    console.log('action.value 1 ', action.value);
                    console.log('6*************************************************************************************************************************');
                    console.log('mode', action.value.mode);
                    console.log('7*************************************************************************************************************************');
                    dispatch(success(action)); 
                    
                } else {
                    dispatch(failed({ value: data.jsonVO }));
                }
            })
            .catch((e) => {
                dispatch(failed({ value: 'error while getting data' }));
            });
    };
}

export function success(action) {
    console.log('Success');
    return {
        type: Constants.T6BIS_INIT_ENTETE_SUCCES,
        value: action.value,
    };
}

export function failed(action) {
    return {
        type: Constants.T6BIS_INIT_ENTETE_FAILED,
        value: action.value,
    };
}

export function inProgress(action) {
    return {
        type: Constants.T6BIS_INIT_ENTETE_IN_PROGRESS,
        value: action.value,
    };
}




export default {
    request,
    success,
    failed,
    inProgress,
};

