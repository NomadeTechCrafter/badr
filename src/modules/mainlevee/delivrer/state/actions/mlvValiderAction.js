import TransverseApi from '../../service/api/mlvDelivrerApi';

import * as Constants from '../mlvDelivrerConstants';

/**i18n */
import { translate } from '../../../../../commons/i18n/ComI18nHelper';

const WS_MODULE_PARAM = 'MLV_LIB';
const WS_TYPESERVICE_PARAM = 'UC';
export function validerMLV(action, navigation) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));

    TransverseApi.doProcess(
      WS_MODULE_PARAM,
      'validerMlv',
      WS_TYPESERVICE_PARAM,
      action.value.data,
    )
      .then((response) => {
        if (response) {
          const data = response.data;
            if (
                data &&
                (data.dtoHeader.messagesInfo != null ||
                    data.dtoHeader.messagesInfo.length != 0)
            )
                dispatch(failed(data));
          if (
            data &&
            (data.dtoHeader.messagesErreur == null ||
              data.dtoHeader.messagesErreur.length === 0)
          ) {
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
    type: Constants.DELIVRERMLV_VALIDERMLV_INIT,
    value: action.value,
  };
}

export function inProgress(action) {
  return {
    type: Constants.DELIVRERMLV_VALIDERMLV_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.DELIVRERMLV_VALIDERMLV_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.DELIVRERMLV_VALIDERMLV_FAILED,
    value: data,
  };
}

export default {
  validerMLV,
  success,
  failed,
  inProgress,
};
