import EnqCompteRenduApi from '../../service/api/enqCompteRenduApi';

import * as Constants from '../enqCompteRenduConstants';

import {translate} from '../../../../../commons/i18n/ComI18nHelper';

export function request(action, navigation) {
    return (dispatch) => {
        dispatch(action);
        dispatch(inProgress(action));

        EnqCompteRenduApi.lookupEnquete(action.value.reference,
            action.value.isMissionLookup,
            action.value.selectedMissionId,
            action.value.selectedMissionNumero,
            action.value.isCrMissionCreation,
            action.value.isCrMissionModification,
            action.value.isCrMissionValidation)
            .then((response) => {
                if (response) {
                    const data = response.data;
                    if (data && (data.dtoHeader.messagesErreur == null || data.dtoHeader.messagesErreur.length === 0)) {
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

export function init(action) {
    return {
        type: Constants.SEARCH_COMPTE_RENDU_INIT,
        value: action.value,
    };
}

export function inProgress(action) {
    return {
        type: Constants.SEARCH_COMPTE_RENDU_IN_PROGRESS,
        value: action.value,
    };
}

export function success(data) {
    return {
        type: Constants.SEARCH_COMPTE_RENDU_SUCCESS,
        value: data.jsonVO,
    };
}

export function failed(data) {
    return {
        type: Constants.SEARCH_COMPTE_RENDU_FAILED,
        value: data,
    };
}

export default {
    request,
    success,
    failed,
    inProgress,
};
