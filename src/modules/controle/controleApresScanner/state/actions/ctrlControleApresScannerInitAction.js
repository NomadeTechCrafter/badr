import CtrlControleApresScannerApi from '../../service/api/ctrlControleApresScannerApi';

import * as Constants from '../ctrlControleApresScannerConstants';

import {translate} from '../../../../../commons/i18n/ComI18nHelper';

export function request(action, navigation) {
    return (dispatch) => {
        dispatch(action);
        dispatch(inProgress(action));

        CtrlControleApresScannerApi.initControleApresScanner()
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
        type: Constants.INIT_CONTROLE_APRES_SCANNER_INIT,
        value: action.value,
    };
}

export function inProgress(action) {
    return {
        type: Constants.INIT_CONTROLE_APRES_SCANNER_IN_PROGRESS,
        value: action.value,
    };
}

export function success(data) {
    return {
        type: Constants.INIT_CONTROLE_APRES_SCANNER_SUCCESS,
        value: data.jsonVO,
    };
}

export function failed(data) {
    return {
        type: Constants.INIT_CONTROLE_APRES_SCANNER_FAILED,
        value: data,
    };
}

export default {
    request,
    success,
    failed,
    inProgress,
};
