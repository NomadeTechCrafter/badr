import {
    HISTORIQUE_ETAT_CHARGEMENT_FAILED,
    HISTORIQUE_ETAT_CHARGEMENT_IN_PROGRESS,
    HISTORIQUE_ETAT_CHARGEMENT_INIT,
    HISTORIQUE_ETAT_CHARGEMENT_SUCCESS,
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
            "getListHistoriqueEtdc",
            "SP",
            action.value,
        )
            .then((response) => {
                if (response && response.data && response.data.jsonVO) {
                    dispatch(success(response.data.jsonVO));
                    navigation.navigate('Resultat', {});
                } else {
                    if (response.data.jsonVO) {
                        dispatch(failed(response.data.jsonVO));
                    } else {
                        dispatch(failed(translate('errors.technicalIssue')));
                    }
                }
            })
            .catch((e) => {
                console.log(e);
                dispatch(failed(translate('errors.technicalIssue')));
            });
    };
}
export function inProgress(action) {
    return {
        type: HISTORIQUE_ETAT_CHARGEMENT_IN_PROGRESS,
        value: action.value,
    };
}
export function init(action) {
    return {
        type: HISTORIQUE_ETAT_CHARGEMENT_INIT,
        value: action.value,
    };
}
export function success(data) {
    return {
        type: HISTORIQUE_ETAT_CHARGEMENT_SUCCESS,
        value: data,
    };
}
export function failed(data) {
    return {
        type: HISTORIQUE_ETAT_CHARGEMENT_FAILED,
        value: data,
    };
}
export default {
    request,
    success,
    failed,
    inProgress,
};