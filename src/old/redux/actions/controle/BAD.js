import ControleApi from '../../../services/api/controle-api';

import * as Constants from '../../../common/constants/controle/BAD';

/**i18n */
import {translate} from '../../../../commons/i18n/ComI18nHelper';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    ControleApi.getDetailBAD(action.value)
      .then((response) => {
        if (response) {
          const data = response.data.jsonVO;
          if (data) {
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

export function inProgress(action) {
  return {
    type: Constants.DETAIL_BAD_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.DETAIL_BAD_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.DETAIL_BAD_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
