/**Constants */
import { GENERIC_FAILED, GENERIC_IN_PROGRESS, GENERIC_SUCCESS } from '../../../../../commons/constants/generic/ComGenericConstants';
import translate from '../../../../../commons/i18n/ComI18nHelper';
import { getValueByPath } from '../../utils/DedUtils';
import DedRedressementApi from '../../service/api/DedRedressementApi';
import { CONSULTER_AMP_DED_FAILED,CONSULTER_AMP_DED_IN_PROGRESS,CONSULTER_AMP_DED_SUCCESS } from '../DedRedressementConstants';

export function request(action) {
    return (dispatch) => {
        dispatch(action);
        dispatch(inProgress(action));
        DedRedressementApi.consulterAMPByDed(action.value.reference).then((response) => {
            console.log('response', response);
            const messagesErreurs = getValueByPath(
                'data.dtoHeader.messagesErreur',
                response,
            );
            if (
                response &&
                response.data &&
                response.data.jsonVO &&
                !messagesErreurs
            ) {
                dispatch(success(response.data.jsonVO));
               
            } else {
                dispatch(failed(messagesErreurs));
            }
        })
            .catch((e) => {
                dispatch(failed(translate('errors.technicalIssue')));
            });
    };
}

export function inProgress(action) {
    return {
        type: CONSULTER_AMP_DED_IN_PROGRESS,
        value: action.value
    };
}


export function success(data) {
    return {
        type: CONSULTER_AMP_DED_SUCCESS,
        value: {
            data: data
        },
    };
}

export function failed(data) {
    return {
        type: CONSULTER_AMP_DED_FAILED,
        value: {
            data: data
        },
    };
}

export default {
    request,
    success,
    failed,
    inProgress,
};