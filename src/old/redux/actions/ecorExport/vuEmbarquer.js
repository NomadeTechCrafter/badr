/** API Services */
import TransverseApi from '../../../services/api/transverse-api';
/**Constants */
import * as Constants from '../../../common/constants/ecorExport/vuEmbarquer';

/** i18n */
import {translate} from '../../../common/translations/i18n';

/** Constant */
const WS_MODULE_PARAM = 'ECOREXP_LIB';
const WS_TYPESERVICE_PARAM = 'UC';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    TransverseApi.doProcess(
      WS_MODULE_PARAM,
      'vuEmbarquer',
      WS_TYPESERVICE_PARAM,
      action.value.data,
    )
      .then((response) => {
        console.log(action.value);
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
    type: Constants.CONFIRMER_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: Constants.CONFIRMER_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.CONFIRMER_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.CONFIRMER_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
