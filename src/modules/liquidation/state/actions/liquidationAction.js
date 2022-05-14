/**Constants */
import * as Constants from '../liquidationConstants';
import translate from '../../../../commons/i18n/ComI18nHelper';
import TransverseApi from '../../../../commons/services/api/ComTransverseApi';
import _ from 'lodash';
/**
 GENERIC LIQ
 */
export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    console.log('----LIQ Action', action);
    TransverseApi.doProcess(
      'ALI_DEC',
      action.value.command,
      action.value.typeService,
      action.value.jsonVO,
    )
      .then((response) => {
        console.log('----LIQ Action response', response?.data);
        if (response && response.data && !_.isNil(response.data.jsonVO)) {
          console.log(response.data.jsonVO);
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

export function handleError(action,error) {

  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    dispatch(
      failed(translate(error), action.value.command),
    );
  };
}

export function inProgress(action) {
  return {
    type: Constants.GENERIC_LIQ_IN_PROGRESS,
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
    type: Constants.GENERIC_LIQ_SUCCESS,
    value: {
      command: command,
      data: data,
    },
  };
}

export function failed(data, command) {
  return {
    type: Constants.GENERIC_LIQ_FAILED,
    value: {
      command: command,
      data: data,
    },
  };
}
