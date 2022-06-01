import T6bisGestiontionApi from '../../service/api/t6bisGestionApi';
import * as Constants from '../t6bisGestionConstants';

export function request(action, navigation,screen) {
    return (dispatch) => {
        
        dispatch(inProgress(action));

        T6bisGestiontionApi.enregistrerT6BISTPE(action.value.cmd, action.value.t6bis)

            .then((response) => {
                const data = response.data;
                console.log('response', response);
                if (!Array.isArray(response.data.jsonVO)) {

                    action.value.t6bis = data.jsonVO;
                    dispatch(success(action));


                } else {
                    dispatch(failed({ value: data.jsonVO }));
                }
            })
            .catch((e) => {
                dispatch(failed({ value: 'error while getting data testtest' }));
            });
    };
}

export function success(action) {
    return {
        type: Constants.T6BIS_ENREGISTRER_TPE_SUCCES,
        value: action.value,
    };
}

export function failed(action) {
    return {
        type: Constants.T6BIS_ENREGISTRER_TPE_FAILD,
        value: action.value,
    };
}

export function inProgress(action) {
    return {
        type: Constants.T6BIS_ENREGISTRER_TPE_PROGRESS,
        value: action.value,
    };
}




export default {
    request,
    success,
    failed,
    inProgress,
};

