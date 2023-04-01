import {
  CO_CONSULTATION_FAILED,
  CO_CONSULTATION_IN_PROGRESS,
  CO_CONSULTATION_INIT,
  CO_CONSULTATION_SUCCESS,
} from '../coConstants';
import translate from '../../../../commons/i18n/ComI18nHelper';
import ComTransverseApi from '../../../../commons/services/api/ComTransverseApi';

import {MODULE_CO} from '../../../../commons/Config';

export function request(action, navigation, successRedirection) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    ComTransverseApi.doProcess(MODULE_CO, action.command, 'SP', action.value)
      .then((response) => {
        if (response) {
          const data = response?.data;
          if (
            data &&
            (data.dtoHeader.messagesErreur == null ||
              data.dtoHeader.messagesErreur.length === 0)
          ) {
            dispatch(success(data));
            if (successRedirection) {
              navigation.navigate(successRedirection);
            }
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
    type: CO_CONSULTATION_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: CO_CONSULTATION_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: CO_CONSULTATION_SUCCESS,
    value: data.jsonVO,
  };
}

export function failed(data) {
  return {
    type: CO_CONSULTATION_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
