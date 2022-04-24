import ControleApi from '../../service/api/controleCommonApi';

import * as Constants from '../controleCommonConstants';
import _ from 'lodash';
/**i18n */
import {translate} from '../../../../../commons/i18n/ComI18nHelper';

export function validateSave(action, navigation) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));

    ControleApi.validateSaveAction(
      action.value.commande,
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
    type: Constants.VALIDATESAVE_CONTROLE_COMMUN_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.VALIDATESAVE_CONTROLE_COMMUN_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.VALIDATESAVE_CONTROLE_COMMUN_FAILED,
    value: data,
  };
}

export function genererCR(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(genererCR_inProgress(action));
    console.log('genererCR action.value.data', action.value.data);
    ControleApi.genererCompteRendu(action.value.data)
      .then((response) => {
        if (response) {
          const data = response.data;
          console.log('genererCR data', data);
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
    type: Constants.GENERERCR_CONTROLE_COMMUN_IN_PROGRESS,
    value: action.value,
  };
}

export function genererCR_success(data) {
  return {
    type: Constants.GENERERCR_CONTROLE_COMMUN_SUCCESS,
    value: data,
  };
}

export function genererCR_failed(data) {
  return {
    type: Constants.GENERERCR_CONTROLE_COMMUN_FAILED,
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
