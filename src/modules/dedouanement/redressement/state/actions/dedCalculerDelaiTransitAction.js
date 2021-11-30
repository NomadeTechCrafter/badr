/**Constants */
import translate from '../../../../../commons/i18n/ComI18nHelper';
import DedRedressementApi from '../../service/api/DedRedressementApi';
import { getValueByPath } from '../../utils/DedUtils';

export function request(action) {
    return (dispatch) => {
        dispatch(action);
        dispatch(inProgress(action));
        DedRedressementApi.calculerDelaiTransit(action.value).then((response) => {

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
        type: CALCULER_DELAI_TRANSIT_IN_PROGRESS,
        value: action.value
    };
}


export function success(data) {
    return {
        type: CALCULER_DELAI_TRANSIT_SUCCESS,
        value: {
            data: data
        },
    };
}

export function failed(data) {
    return {
        type: CALCULER_DELAI_TRANSIT_FAILED,
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