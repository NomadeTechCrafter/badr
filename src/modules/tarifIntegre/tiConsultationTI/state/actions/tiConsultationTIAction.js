import {
    CONSULTATION_TI_FAILED,
    CONSULTATION_TI_IN_PROGRESS,
    CONSULTATION_TI_INIT,
    CONSULTATION_TI_SUCCESS,
} from '../tiConsultationTIConstants';
import TiConsultationTIApi from '../../service/api/tiConsultationTIApi';
import translate from '../../../../../commons/i18n/ComI18nHelper';
import ComTransverseApi from '../../../../../commons/services/api/ComTransverseApi';

export function request(action) {
    return (dispatch) => {
        dispatch(action);
        dispatch(inProgress(action));
        ComTransverseApi.doProcess(
            "TI_LIB",
            "consulterTI",
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
                        dispatch(success(data.jsonVO));
                    } else {
                        dispatch(failed(data.jsonVO));
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
        type: CONSULTATION_TI_IN_PROGRESS,
        value: action.value,
    };
}

export function init(action) {
    return {
        type: CONSULTATION_TI_INIT,
        value: action.value,
    };
}

export function success(data) {
    return {
        type: CONSULTATION_TI_SUCCESS,
        value: data,
    };
}

export function failed(data) {
    return {
        type: CONSULTATION_TI_FAILED,
        value: data,
    };
}

export default {
    request,
    success,
    failed,
    inProgress,
};