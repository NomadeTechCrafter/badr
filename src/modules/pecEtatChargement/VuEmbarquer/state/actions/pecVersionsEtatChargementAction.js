import {
    VERSIONS_ETAT_CHARGEMENT_VE_FAILED,
    VERSIONS_ETAT_CHARGEMENT_VE_IN_PROGRESS,
    VERSIONS_ETAT_CHARGEMENT_VE_INIT,
    VERSIONS_ETAT_CHARGEMENT_VE_SUCCESS,
} from '../pecEtatChargementConstants';
import PecEtatChargementApi from '../../service/api/pecEtatChargementApi';
import translate from '../../../../../commons/i18n/ComI18nHelper';
import ComTransverseApi from '../../../../../commons/services/api/ComTransverseApi';

export function request(action, navigation) {
    return (dispatch) => {
        dispatch(action);
        dispatch(inProgress(action));
        ComTransverseApi.doProcess(
            "ECOREXP_LIB",
            "getListVersionsEtdc",
            "SP",
            action.value,
        )
            .then((response) => {
                if (response) {
                    const data = response?.data;
                    if (
                        data &&
                        (data.dtoHeader.messagesErreur == null ||
                            data.dtoHeader.messagesErreur.length === 0)
                    ) {
                        dispatch(success(data));
                        //navigation.navigate('Resultat', {});
                    } else {
                        console.log('data',data);
                        dispatch(failed(data));
                    }
                } else {
                    console.log('response', response);
                    dispatch(failed(translate('errors.technicalIssue')));
                }
            })
            .catch((e) => {
                console.log('e', e);
                dispatch(failed(translate('errors.technicalIssue')));
            });
    };
}
export function inProgress(action) {
    return {
        type: VERSIONS_ETAT_CHARGEMENT_VE_IN_PROGRESS,
        value: action.value,
    };
}
export function init(action) {
    return {
        type: VERSIONS_ETAT_CHARGEMENT_VE_INIT,
        value: action.value,
    };
}
export function success(data) {
    return {
        type: VERSIONS_ETAT_CHARGEMENT_VE_SUCCESS,
        value: data,
    };
}
export function failed(data) {
    return {
        type: VERSIONS_ETAT_CHARGEMENT_VE_FAILED,
        value: data,
    };
}
export default {
    request,
    success,
    failed,
    inProgress,
};