/**Constants */
import * as Constants from '../../constants/generic/ComGenericConstants';

/** i18n */
import {translate} from '../../i18n/ComI18nHelper';
import TransverseApi from '../../services/api/ComTransverseApi';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    TransverseApi.doProcess(
      action.value.module ? action.value.module : 'REF_LIB',
      action.value.command,
      'SP',
      action.value.jsonVO,
    )
      .then((response) => {
        if (response && response.data && response.data.jsonVO) {
          dispatch(success(response.data.jsonVO, action.value.command));
        } else {
          dispatch(
            failed(translate('errors.technicalIssue'), action.value.command),
          );
        }
      })
      .catch((e) => {
        dispatch(
          failed(translate('errors.technicalIssue'), action.value.command),
        );
      });
  };
}

export function inProgress(action) {
  return {
    type: Constants.GENERIC_REF_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: action.type,
    value: action.value,
  };
}

export function success(data, command) {
  return {
    type: Constants.GENERIC_REF_SUCCESS,
    value: {
      command: command,
      data: data,
    },
  };
}

export function failed(data, command) {
  return {
    type: Constants.GENERIC_REF_FAILED,
    value: {
      command: command,
      data: data,
    },
  };
}
