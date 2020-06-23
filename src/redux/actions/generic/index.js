/** API Services */
import TransverseApi from '../../../services/api/transverse-api';

/**Constants */
import * as Constants from '../../../common/constants/generic';

/** i18n */
import {translate} from '../../../common/translations/i18n';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    TransverseApi.doProcess(
      action.value.module,
      action.value.command,
      action.value.typeService,
      action.value.jsonVO,
    )
      .then((response) => {
        if (response && response.data && response.data.jsonVO) {
          dispatch(success(response.data.jsonVO));
        } else {
          dispatch(failed(translate('errors.technicalIssue')));
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
    type: Constants.GENERIC_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: Constants.GENERIC_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.GENERIC_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.GENERIC_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
