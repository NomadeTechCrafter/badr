/** API Services */

import AtApurementApi from '../../service/api/atApurementApi';

/**Constants */
import * as Constants from '../atApurementConstants';
import {translate} from '../../../../../commons/i18n/I18nHelper';

/**
 Création manuelle
 */

export function requestManuel(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgressManuel(action));
    AtApurementApi.apurerAT(action.value.atVO)
      .then((response) => {
        if (response) {
          const data = response.data;
          if (
            data &&
            (data.dtoHeader.messagesErreur == null ||
              data.dtoHeader.messagesErreur.length === 0)
          ) {
            dispatch(successManuel(data));
          } else {
            dispatch(failedManuel(data));
          }
        } else {
          dispatch(failedManuel(translate('errors.technicalIssue')));
        }
      })
      .catch((e) => {
        dispatch(failedManuel(translate('errors.technicalIssue')));
      });
  };
}

export function inProgressManuel(action) {
  return {
    type: Constants.CREATE_APUR_IN_PROGRESS,
    value: action.value,
  };
}

export function clearMsgManuel(action) {
  return {
    type: Constants.CREATE_APUR_CLEAR_MSG,
    value: action.value,
  };
}

export function initManuel(action) {
  return {
    type: Constants.CREATE_APUR_INIT,
    value: action.value,
  };
}

export function successManuel(data) {
  return {
    type: Constants.CREATE_APUR_SUCCESS,
    value: data,
  };
}

export function failedManuel(data) {
  return {
    type: Constants.CREATE_APUR_FAILED,
    value: data,
  };
}

/**
 Création automatique
 */

export function requestAutomatique(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgressAutomatique(action));
    AtApurementApi.apurerAutoAT(action.value.atVO)
      .then((response) => {
        if (response) {
          const data = response.data;
          if (
            data &&
            (data.dtoHeader.messagesErreur == null ||
              data.dtoHeader.messagesErreur.length === 0)
          ) {
            dispatch(successAutomatique(data));
          } else {
            dispatch(failedAutomatique(data));
          }
        } else {
          dispatch(failedAutomatique(translate('errors.technicalIssue')));
        }
      })
      .catch((e) => {
        dispatch(failedAutomatique(translate('errors.technicalIssue')));
      });
  };
}

export function inProgressAutomatique(action) {
  return {
    type: Constants.CREATE_APURAUTO_IN_PROGRESS,
    value: action.value,
  };
}

export function initAutomatique(action) {
  return {
    type: Constants.CREATE_APURAUTO_INIT,
    value: action.value,
  };
}

export function successAutomatique(data) {
  return {
    type: Constants.CREATE_APURAUTO_SUCCESS,
    value: data,
  };
}

export function failedAutomatique(data) {
  return {
    type: Constants.CREATE_APURAUTO_FAILED,
    value: data,
  };
}

export default {
  requestManuel,
  successManuel,
  failedManuel,
  inProgressManuel,
  clearMsgManuel,
};
