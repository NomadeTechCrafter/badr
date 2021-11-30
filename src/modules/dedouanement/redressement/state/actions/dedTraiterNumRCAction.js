/**Constants */
import { GENERIC_FAILED, GENERIC_IN_PROGRESS, GENERIC_SUCCESS } from '../../../../../commons/constants/generic/ComGenericConstants';
import translate from '../../../../../commons/i18n/ComI18nHelper';
import { getValueByPath } from '../../utils/DedUtils';
import DedRedressementApi from '../../service/api/DedRedressementApi';
import { TRAITER_NUM_RC_FAILED, TRAITER_NUM_RC_IN_PROGRESS, TRAITER_NUM_RC_SUCCESS } from '../DedRedressementConstants';

export function request(action) {
    return (dispatch) => {
        dispatch(action);
        dispatch(inProgress(action));
        DedRedressementApi.traiterNumRC(action.value.dedDumOperateurVO).then((response) => {
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
                dispatch(success(action.value.dedDumOperateurVO,action.value.typeOperateur, action.value.operateurEngageFlag,response.data.jsonVO));
               
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
        type: TRAITER_NUM_RC_IN_PROGRESS,
        value: action.value
    };
}


export function success(dedDumOperateurVO, typeOperateur, operateurEngageFlag,data) {
    return {
        type: TRAITER_NUM_RC_SUCCESS,
        value: {
            dedDumOperateurVO: dedDumOperateurVO,
            typeOperateur: typeOperateur,
            operateurEngageFlag: operateurEngageFlag,
            data: data
        },
    };
}

export function failed(data) {
    return {
        type: TRAITER_NUM_RC_FAILED,
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