import translate from '../../../../../commons/i18n/ComI18nHelper';
import ComTransverseApi from '../../../../../commons/services/api/ComTransverseApi';
import {
    ETAT_CHARGEMENT_VE_FAILED, ETAT_CHARGEMENT_VE_INIT, ETAT_CHARGEMENT_VE_IN_PROGRESS, ETAT_CHARGEMENT_VE_SUCCESS
} from '../pecEtatChargementConstants';
export function request(action, navigation) {
    return (dispatch) => {
        console.log('init VE ', action);
        dispatch(action);
        dispatch(inProgress(action));
        ComTransverseApi.doProcess(
            "AEC_LIB",
            "initVE",
            "UC",
            action.value,
        )
            .then((response) => {
                if (response) {
                    const data = response?.data;
                    console.log(data);
                    if (
                        data &&
                        (data.dtoHeader.messagesErreur == null ||
                            data.dtoHeader.messagesErreur.length === 0)
                    ) {

                        console.log('data testtest', data);
                        dispatch(success(data));
                        navigation.navigate('Resultat', {});
                    } else {
                        console.log('data2', data);
                        dispatch(failed(data));
                    }
                } else {
                    console.log('response2', response);
                    dispatch(failed(translate('errors.technicalIssue')));
                }
            })
            .catch((e) => {
                console.log('e2', e);

                dispatch(failed(translate('errors.technicalIssue')));
            });
    };
}
export function inProgress(action) {
    return {
        type: ETAT_CHARGEMENT_VE_IN_PROGRESS,
        value: action.value,
    };
}
export function init(action) {
    return {
        type: ETAT_CHARGEMENT_VE_INIT,
        value: action.value,
    };
}
export function success(data) {
    return {
        type: ETAT_CHARGEMENT_VE_SUCCESS,
        value: data,
    };
}
export function failed(data) {
    return {
        type: ETAT_CHARGEMENT_VE_FAILED,
        value: data,
    };
}
export default {
    request,
    success,
    failed,
    inProgress,
};