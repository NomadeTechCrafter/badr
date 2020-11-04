/**Constants */
/** i18n */
import {
  GENERIC_DED_FAILED,
  GENERIC_DED_IN_PROGRESS,
  GENERIC_DED_SUCCESS,
} from '../DedRedressementConstants';
import translate from '../../../../../commons/i18n/ComI18nHelper';
import TransverseApi from '../../../../../commons/services/api/ComTransverseApi';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    console.log('----dedAction Action', action);
    TransverseApi.doProcess(
      'DED_LIB',
      action.value.command,
      action.value.typeService,
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
    type: GENERIC_DED_IN_PROGRESS,
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
    type: GENERIC_DED_SUCCESS,
    value: {
      command: command,
      data: data,
    },
  };
}

export function failed(data, command) {
  return {
    type: GENERIC_DED_FAILED,
    value: {
      command: command,
      data: data,
    },
  };
}
