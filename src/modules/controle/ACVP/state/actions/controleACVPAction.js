import ControleApi from '../../service/api/controleACVPApi';

import * as Constants from '../controleACVPConstants';
import _ from 'lodash';
/**i18n */
import {translate} from '../../../../../commons/i18n/ComI18nHelper';

export function validateSave(action, navigation) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));

    ControleApi.validateSaveAction(
      action.value.login,
      action.value.commade,
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
    type: Constants.ACVP_VALIDATESAVE_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.ACVP_VALIDATESAVE_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.ACVP_VALIDATESAVE_FAILED,
    value: data,
  };
}

export function genererCR(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(genererCR_inProgress(action));

    ControleApi.genererCompteRendu(action.value.login, action.value.data)
      .then((response) => {
        if (response) {
          const data = response.data;
          if (data && _.isEmpty(data.dtoHeader.messagesErreur)) {
            dispatch(genererCR_success(data));
          } else {
            dispatch(genererCR_failed(data));
          }
        } else {
          dispatch(genererCR_failed(translate('errors.technicalIssue')));
        }
      })
      .catch((e) => {
        console.log('in action request catch', e);
        dispatch(genererCR_failed(translate('errors.technicalIssue')));
      });
  };
}

export function genererCR_inProgress(action) {
  return {
    type: Constants.ACVP_GENERERCR_IN_PROGRESS,
    value: action.value,
  };
}

export function genererCR_success(data) {
  return {
    type: Constants.ACVP_GENERERCR_SUCCESS,
    value: data,
  };
}

export function genererCR_failed(data) {
  return {
    type: Constants.ACVP_GENERERCR_FAILED,
    value: data,
  };
}

export default {
  validateSave,
  success,
  failed,
  inProgress,
  genererCR,
  genererCR_inProgress,
  genererCR_success,
  genererCR_failed,
};
