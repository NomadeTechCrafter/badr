/**Constants */
import { GENERIC_FAILED, GENERIC_IN_PROGRESS, GENERIC_SUCCESS } from '../../../../../commons/constants/generic/ComGenericConstants';
import translate from '../../../../../commons/i18n/ComI18nHelper';
import { getValueByPath } from '../../utils/DedUtils';
import DedRedressementApi from '../../service/api/DedRedressementApi';

export function request(action, navigation) {
    return (dispatch) => {
        dispatch(action);
        dispatch(inProgress(action));
        DedRedressementApi.initRedresserDum(action.value.idDed).then((response) => {

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
                dispatch(success(response.data.jsonVO, action.value));
                navigation.navigate('DedRedressementScreen', {
                    searchData: action.value ? action.value.jsonVO : {}, title: translate('dedouanement.redressement.title'),
                    subtitle: '', showHeader: true
                });
            } else {
                dispatch(failed(messagesErreurs, action.value));
            }
        })
            .catch((e) => {
                dispatch(failed(translate('errors.technicalIssue')));
            });
    };
}

export function inProgress(action) {
    return {
        type: GENERIC_IN_PROGRESS,
        value: action.value,
    };
}


export function success(data, searchParams) {
    return {
        type: GENERIC_SUCCESS,
        value: {
            searchParams: searchParams,
            data: data,
        },
    };
}

export function failed(data, command) {
    return {
        type: GENERIC_FAILED,
        value: {
            command: command,
            data: data,
        },
    };
}

export default {
    request,
    success,
    failed,
    inProgress,
};