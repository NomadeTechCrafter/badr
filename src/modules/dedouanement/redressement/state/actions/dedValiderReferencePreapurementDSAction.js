/**Constants */
import translate from '../../../../../commons/i18n/ComI18nHelper';
import DedRedressementApi from '../../service/api/DedRedressementApi';
import { getValueByPath } from '../../utils/DedUtils';
import { VALIDER_REF_PREAP_DS_FAILED, VALIDER_REF_PREAP_DS_INIT, VALIDER_REF_PREAP_DS_IN_PROGRESS, VALIDER_REF_PREAP_DS_SUCCESS } from '../DedRedressementConstants';

export function request(action) {
    return (dispatch) => {
        dispatch(action);
        dispatch(inProgress(action));
        DedRedressementApi.validerReferencePreapurementDS(action.value.dedDumPreapVO).then((response) => {
            console.log('response', response);
            const messagesErreurs = getValueByPath(
                'data.dtoHeader.messagesErreur',
                response,
            );
            console.log('response.data', response.data);
            console.log('response.data.dtoHeader', response.data.dtoHeader);
            console.log('response.data.dtoHeader.messagesErreur', response.data.dtoHeader.messagesErreur);
            console.log('messagesErreurs', messagesErreurs);
            if (
                response &&
                response.data &&
                response.data.jsonVO &&
                !messagesErreurs
            ) {
                console.log('success');
                dispatch(success(response.data.jsonVO));
               
            } else {
                console.log('Failed');
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
        type: VALIDER_REF_PREAP_DS_IN_PROGRESS,
        value: action.value
    };
}
export function init() {
    return {
        type: VALIDER_REF_PREAP_DS_INIT
    };
}


export function success(data) {
    return {
        type: VALIDER_REF_PREAP_DS_SUCCESS,
        value: data
    };
}

export function failed(data) {
    return {
        type: VALIDER_REF_PREAP_DS_FAILED,
        value: {
            data: data
        },
    };
}

export default {
    init,
    request,
    success,
    failed,
    inProgress,
};