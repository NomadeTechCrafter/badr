/** API Services */
import RefApi from '../../../services/api/ref-api';

/**Constants */
import * as Constants from '../../../common/constants/referentiel/plaquesImm';

/** i18n */
import {translate} from '../../../common/translations/i18n';

export function request(action) {
  return dispatch => {
    dispatch(action);
    dispatch(inProgress(action));
    RefApi.rechercheEchangeMetVehicule(
      action.value.login,
      action.value.rechercheObj,
      action.value.pageSize,
      action.value.offset,
    )
      .then(response => {
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
      .catch(e => {
        console.log(e);
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

export function inProgress(action) {
  return {
    type: Constants.PLAQUES_IMM_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: Constants.PLAQUES_IMM_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.PLAQUES_IMM_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.PLAQUES_IMM_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
