import * as Constants from '../autoriserAcheminementMainConstants';
import AutoriserAcheminementGestionApi from '../../service/api/autoriserAcheminementGestionApi';

export function request(action) {
    return (dispatch) => {
        dispatch(inProgress(action));
        AutoriserAcheminementGestionApi.getCmbOperateurByCode(action.value.idOperateur)
     
            .then((response) => {
                console.log('data', data);
                const data = response.data
                console.log('data', data);
                if (data.jsonVO) {
                    action.value = { ...action.value, operateur: data.jsonVO[0] };
                    dispatch(success(action)); 
                    
                } else {
                    dispatch(failed({ value: {}}));
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
        type: Constants.AUTORISER_ACHEMINEMENT_GET_CMB_OPERATEUR_BY_CODE_SUCCESS,
        value: action.value,
    };
}

export function failed(action) {
    return {
        type: Constants.AUTORISER_ACHEMINEMENT_GET_CMB_OPERATEUR_BY_CODE_FAILED,
        value: action.value,
    };
}

export function inProgress(action) {
    return {
        type: Constants.AUTORISER_ACHEMINEMENT_GET_CMB_OPERATEUR_BY_CODE_IN_PROGRESS,
        value: action.value,
    };
}




export default {
    request,
    success,
    failed,
    inProgress,
};

