import ControleApi from '../../../services/api/controle-api';

import * as Constants from '../../../common/constants/controle/BAD';

/**i18n */
import {translate} from '../../../common/translations/i18n';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    console.log(action.value);
    ControleApi.getDetailBAD(action.value)
      .then((response) => {
        if (response) {
          console.log('####################################');
          console.log(response);
          console.log('####################################');
          const data = response.data.jsonVO;
          if (data) {
            console.log('SUCCESSSSSS');
            dispatch(success(data));
          } else {
            console.log('ERROR');
            dispatch(failed(data));
          }
        } else {
          dispatch(failed(translate('errors.technicalIssue')));
        }
      })
      .catch((e) => {
        console.log('in action request catch', e);
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
