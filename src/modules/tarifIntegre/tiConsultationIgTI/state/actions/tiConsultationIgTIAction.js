import {
    CONSULTATION_IGTI_FAILED,
    CONSULTATION_IGTI_IN_PROGRESS,
    CONSULTATION_IGTI_INIT,
    CONSULTATION_IGTI_SUCCESS,
} from '../tiConsultationIgTIConstants';
import TiConsultationIgTIApi from '../../service/api/tiConsultationIgTIApi';
import translate from '../../../../../commons/i18n/ComI18nHelper';

export function request(action) {
    return (dispatch) => {
        dispatch(action);
        dispatch(inProgress(action));
        TiConsultationIgTIApi.consulterTI(action.value)
            .then((response) => {
                if (response && response.data && response.data.jsonVO) {
                    dispatch(success(response.data.jsonVO));
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
        type: CONSULTATION_IGTI_IN_PROGRESS,
        value: action.value,
    };
}

export function init(action) {
    return {
        type: CONSULTATION_IGTI_INIT,
        value: action.value,
    };
}

export function success(data) {
    return {
        type: CONSULTATION_IGTI_SUCCESS,
        value: data,
    };
}

export function failed(data) {
    return {
        type: CONSULTATION_IGTI_FAILED,
        value: data,
    };
}

export default {
    request,
    success,
    failed,
    inProgress,
};