import TransverseApi from '../../../../../commons/services/api/ComTransverseApi';

import * as Constants from '../ecorExpConfirmationEntreeConstants';

/**i18n */
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import _ from 'lodash';
export function updateVO(action) {
  return action;
}
export function request(action, navigation) {
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
          // console.log('response action confirmationentre', response);
          const data = response.data;
          if (data && _.isEmpty(data.dtoHeader.messagesErreur)) {
            console.log('data', data);
            dispatch(success(data));
          } else {
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
    type: Constants.CONFIRMERNTREE_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.CONFIRMERNTREE_SUCCESS,
    value: {
      data: data,
    },
  };
}

export function failed(data) {
  return {
    type: Constants.CONFIRMERNTREE_FAILED,
    value: data,
  };
}

export function init(action) {
  return {
    type: Constants.CONFIRMERNTREE_INIT,
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
