import T6bisGestiontionApi from '../../service/api/t6bisGestionApi';
import * as Constants from '../t6bisGestionConstants';

export function request(action, navigation,screen) {
    return (dispatch) => {
        
        dispatch(inProgress(action));
        
        T6bisGestiontionApi.supprimerT6BIS(action.value.cmd, action.value.t6bis)

            .then((result) => {

                console.log('T6bisGestiontionApi.supprimerT6BIS(action.value.cmd, action.value.t6bis)  Yassine');
                console.log('T6bisGestiontionApi.supprimerT6BIS(action.value.cmd, action.value.t6bis)', result);
                navigation.navigate(screen, {});
            })
            .catch((e) => {
                dispatch(failed({ value: 'error while getting data testtest'+e }));
            });
    };
}

export function success(action) {
    return {
        type: Constants.T6BIS_SUPPRIMER_SUCCES,
        value: action.value,
    };
}

export function failed(action) {
    return {
        type: Constants.T6BIS_SUPPRIMER_FAILD,
        value: action.value,
    };
}

export function inProgress(action) {
    return {
        type: Constants.T6BIS_SUPPRIMER_IN_PROGRESS,
        value: action.value,
    };
}




export default {
    request,
    success,
    failed,
    inProgress,
};

