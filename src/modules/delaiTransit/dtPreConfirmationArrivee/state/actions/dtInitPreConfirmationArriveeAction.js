import TransverseApi from '../../../../../commons/services/api/ComTransverseApi';

import * as Constants from '../dtPreConfirmationArriveeConstants';

/**i18n */
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import _ from 'lodash';
export function updateVO(action) {
  return action;
}
export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    TransverseApi.doProcess(
      action.value.module,
      action.value.commande,
      action.value.typeService,
      action.value.data,
    )
      .then((response) => {
        if (response) {
          const data = response.data;
          if (data && _.isEmpty(data.dtoHeader.messagesErreur)) {
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
    type: Constants.INIT_PRE_CONFIRMATION_ARRIVEE_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.INIT_PRE_CONFIRMATION_ARRIVEE_SUCCESS,
    value: data
  };
}

export function failed(data) {
  return {
    type: Constants.INIT_PRE_CONFIRMATION_ARRIVEE_FAILED,
    value: data,
  };
}

export function init(action) {
  return {
    type: Constants.INIT_PRE_CONFIRMATION_ARRIVEE_INIT,
    value: action.value,
  };
}
export default {
  request,
  success,
  failed,
  inProgress,
  init,
  updateVO,
};
