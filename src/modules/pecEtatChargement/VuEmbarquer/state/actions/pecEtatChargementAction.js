import translate from '../../../../../commons/i18n/ComI18nHelper';
import ComTransverseApi from '../../../../../commons/services/api/ComTransverseApi';
import { ComSessionService } from '../../../../../commons/services/session/ComSessionService';
import {
    ETAT_CHARGEMENT_VE_FAILED, ETAT_CHARGEMENT_VE_INIT, ETAT_CHARGEMENT_VE_IN_PROGRESS, ETAT_CHARGEMENT_VE_SUCCESS,
    INIT_ETAT_CHARGEMENT_VE_REQUEST
} from '../pecEtatChargementConstants';
import pecInitVuEmbarquer from './pecInitVuEmbarquer';
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
                    const data = response?.data;
                    if (
                        data &&
                        (data.dtoHeader.messagesErreur == null ||
                            data.dtoHeader.messagesErreur.length === 0)
                    ) {
                        dispatch(success(data));
                        console.log('action.value INIT_ETAT_CHARGEMENT_VE_REQUEST', action.value);
                        let actionInitVuEmbarquer = pecInitVuEmbarquer.request(
                            {
                                type: INIT_ETAT_CHARGEMENT_VE_REQUEST,
                                value: {
                                    codeBureau: action.value.codeBureau,
                                    regime: action.value.regime,
                                    anneeEnregistrement: action.value.anneeEnregistrement,
                                    numeroSerieEnregistrement: action.value.numeroSerieEnregistrement,
                                    cleIHM: action.value.cleIHM,
                                    idActeurInterne: ComSessionService.getInstance().getLogin()
                                },
                            },
                            navigation,
                        );
                        dispatch(actionInitVuEmbarquer);
                       // navigation.navigate('Resultat', {});
                
                    } else {
                        console.log('data', data);
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