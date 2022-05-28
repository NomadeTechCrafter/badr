import { mapErrorsGestion } from '../../../utils/t6bisUtils';
import T6bisGestiontionApi from '../../service/api/t6bisGestionApi';
import * as Constants from '../t6bisGestionConstants';
import * as Constantes from "../t6bisGestionConstants";

export function request(action) {
    return (dispatch) => {
        console.log('----------------------------------------------------------------------------------------------------action', action);
        dispatch(inProgress(action));
        console.log('----------------------------------------------------------------------------------------------------action', action);
        T6bisGestiontionApi.sauvegarderT6BIS(action.value.cmd, action.value.t6bis)

            .then((response) => {
                console.log('--------------------------------------------------------------------------------------------------------response 1', response);
                const data = response.data;
                console.log('--------------------------------------------------------------------------------------------------------response 1', response);
                if (!Array.isArray(response.data.jsonVO)) {
                    
                    action.value.t6bis = data.jsonVO;
                    action.value.dtoHeader = data.dtoHeader;

                    dispatch(success(action));
                    
                    
                } else {
                    dispatch(failed({ value: mapErrorsGestion(data.jsonVO) }));
                }
            })
            .catch((e) => {
                console.log('error while getting data testtest :' + e)
                dispatch(failed({ value: 'error while getting data testtest'+e }));
            });
    };
}

export function success(action) {
    console.log('action type',action.type)
    if(action.type==Constantes.T6BIS_SAUVEGARDER_TPE_REQUEST)
        return {
            type: Constants.T6BIS_SAUVEGARDER_TPE_SUCCES,
            value: action.value,
        };
    else
    return {
        type: Constants.T6BIS_SAUVEGARDER_SUCCES,
        value: action.value,
    };
}

export function failed(action) {
    return {
        type: Constants.T6BIS_SAUVEGARDER_FAILED,
        value: action.value,
    };
}

export function inProgress(action) {
    return {
        type: Constants.T6BIS_SAUVEGARDER_IN_PROGRESS,
        value: action.value,
    };
}




export default {
    request,
    success,
    failed,
    inProgress,
};

