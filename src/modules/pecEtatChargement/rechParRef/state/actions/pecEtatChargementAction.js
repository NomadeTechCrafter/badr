import {
    ETAT_CHARGEMENT_FAILED,
    ETAT_CHARGEMENT_IN_PROGRESS,
    ETAT_CHARGEMENT_INIT,
    ETAT_CHARGEMENT_SUCCESS,
} from '../pecEtatChargementConstants';
import PecEtatChargementApi from '../../service/api/pecEtatChargementApi';
import translate from '../../../../../commons/i18n/ComI18nHelper';
import ComTransverseApi from '../../../../../commons/services/api/ComTransverseApi';
export function request(action, navigation) {
    return (dispatch) => {
        dispatch(action);
        dispatch(inProgress(action));
        ComTransverseApi.doProcess(
            "AEC_LIB",
            "recupererVersionAECVO",
            "SP",
            action.value,
        )
            .then((response) => {
                if (response) {
                    const data = response.data;
                    if (
                        data &&
                        (data.dtoHeader.messagesErreur == null ||
                            data.dtoHeader.messagesErreur.length === 0)
                    ) {
                        dispatch(success(data));
                    } else {
                        dispatch(failed(data));
                    }
                } else {
                    dispatch(failed(translate('errors.technicalIssue')));
                }
            })
            .catch((e) => {
                dispatch(failed(translate('errors.technicalIssue')));
            });
    };
}
export function inProgress(action) {
    return {
        type: ETAT_CHARGEMENT_IN_PROGRESS,
        value: action.value,
    };
}
export function init(action) {
    return {
        type: ETAT_CHARGEMENT_INIT,
        value: action.value,
    };
}
export function success(data) {
    return {
        type: ETAT_CHARGEMENT_SUCCESS,
        value: data,
    };
}
export function failed(data) {
    return {
        type: ETAT_CHARGEMENT_FAILED,
        value: data,
    };
}
export default {
    request,
    success,
    failed,
    inProgress,
};