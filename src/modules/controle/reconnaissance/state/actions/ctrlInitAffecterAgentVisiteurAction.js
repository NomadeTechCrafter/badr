import CtrlReconnaissanceApi from '../../service/api/ctrlReconnaissanceApi';

import * as Constants from '../ctrlReconnaissanceConstants';

import {translate} from '../../../../../commons/i18n/ComI18nHelper';

export function request(action, navigation) {
    return (dispatch) => {
        dispatch(action);
        dispatch(inProgress(action));

        CtrlReconnaissanceApi.initAffecterAgentVisiteur(action.value)
            .then((response) => {
                if (response) {
                    const data = response.data;
                    if (data && (data.dtoHeader.messagesErreur == null || data.dtoHeader.messagesErreur.length === 0)) {
                        dispatch(success(data));
                        navigation.navigate('AffecterAgentVisiteurMain');
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

export function init(action) {
    return {
        type: Constants.INIT_AFFECTER_AGENT_VISITEUR_INIT,
        value: action.value,
    };
}

export function inProgress(action) {
    return {
        type: Constants.INIT_AFFECTER_AGENT_VISITEUR_IN_PROGRESS,
        value: action.value,
    };
}

export function success(data) {
    return {
        type: Constants.INIT_AFFECTER_AGENT_VISITEUR_SUCCESS,
        value: data,
    };
}

export function failed(data) {
    return {
        type: Constants.INIT_AFFECTER_AGENT_VISITEUR_FAILED,
        value: data,
    };
}

export default {
    request,
    success,
    failed,
    inProgress,
};
