/** API Services */
import AtApi from '../../../services/api/at-api';

/**Constants */
import * as Constants from '../../../common/constants/at/at';

/** i18n */
import {translate} from '../../../common/translations/i18n';

/**
  Création manuelle
 */

export function requestManuel(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgressManuel(action));
    AtApi.apurerAT(action.value.atVO)
      .then((response) => {
        console.log(response.headers);
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
        console.log(e);
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
    AtApi.apurerAutoAT(action.value.atVO)
      .then((response) => {
        console.log(response);
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
        console.log(e);
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
