import * as Constants from '../t6bisGestionConstants';
import T6bisGestionApi from '../../service/api/t6bisGestionApi';

export function request(action,article,callback) {
    return (dispatch) => {
        dispatch(inProgress(action));
        T6bisGestionApi.getCheckNomenclatureByCode(action.value.codeNomenclature)
     
            .then((response) => {
                const data = response.data;
                if (!data.dtoHeader.hasOwnProperty('messagesErreur')) {
                    dispatch(success(action)); 
                    callback(article);
                    
                } else {
                    dispatch(failed({ value: data.dtoHeader.messagesErreur }));
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
        type: Constants.T6BIS_GESTION_CHECK_NOMENCLATURE_CODE_SUCCES,
        value: action.value,
    };
}

export function failed(action) {
    return {
        type: Constants.T6BIS_GESTION_CHECK_NOMENCLATURE_CODE_FAILED,
        value: action.value,
    };
}

export function inProgress(action) {
    return {
        type: Constants.T6BIS_GESTION_CHECK_NOMENCLATURE_CODE_IN_PROGRESS,
        value: action.value,
    };
}




export default {
    request,
    success,
    failed,
    inProgress,
};

