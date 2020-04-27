import ControleApi from '../../../services/api/controle-api';

import * as Constants from '../../../common/constants/controle/regimeInterne';

/**i18n */
import {translate as translate} from '../../../common/translations/i18n';

import {save} from '../../../services/storage-service';

export function request(action, navigation) {
  return dispatch => {
    console.log('regimeInterne test request');
    dispatch(action);
    dispatch(inProgress(action));
  };
}

export function inProgress(action) {
  return {
    type: Constants.REGIMEINTERNE_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.REGIMEINTERNE_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.REGIMEINTERNE_FAILED,
    value: data,
  };
}

export function init(action) {
  return {
    type: Constants.REGIMEINTERNE_INIT,
    value: action.value,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
