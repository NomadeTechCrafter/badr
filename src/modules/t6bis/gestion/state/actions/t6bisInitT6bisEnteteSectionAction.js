import * as Constants from '../t6bisGestionConstants';
import T6bisGestionApi from '../../service/api/t6bisGestionApi';

export function request(action) {
    return (dispatch) => {
        
        dispatch(inProgress(action));
        T6bisGestionApi.initT6bisEnteteSection(action.value.codeType)
     
            .then((response) => {
                const data = response.data
                if (data.jsonVO) {
                    action.value = { ...action.value,...data.jsonVO };
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

