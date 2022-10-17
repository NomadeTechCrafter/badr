/** i18n */
import {
  GENERIC_ECI_FAILED,
  GENERIC_ECI_IN_PROGRESS,
  GENERIC_ECI_SUCCESS,
} from '../verifierPContreEcorSsManifesteConstants';
import translate from '../../../../../commons/i18n/ComI18nHelper';
import TransverseApi from '../../../../../commons/services/api/ComTransverseApi';
import _ from 'lodash';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    console.log('----EcorImport Action', action);
    TransverseApi.doProcess(
      action.value.module ? action.value.module :'ECI',
      action.value.command,
      action.value.typeService,
      action.value.jsonVO,
    )
      .then((response) => {
        console.log('----EcorImport rep', JSON.stringify(response));
        if (response) {
          const data = response.data;
          if (data && _.isEmpty(data.dtoHeader.messagesErreur)) {
            dispatch(success(data, action.value.command));
          } else {
            dispatch(failed(data.dtoHeader.messagesErreur,
              action.value.command,));
          }
        } else {
          dispatch(failed(translate('errors.technicalIssue'), action.value.command));
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
    type: GENERIC_ECI_IN_PROGRESS,
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
  console.log('in success', data, command);
  return {
    type: GENERIC_ECI_SUCCESS,
    value: {
      command: command,
      data: data,
    },
  };
}

export function failed(data, command) {
  console.log('in failed', data, command);

  return {
    type: GENERIC_ECI_FAILED,
    value: {
      command: command,
      data: data,
    },
  };
}

export function requestModal(action) {
  return (dispatch) => {
    console.log('----EcorImportrequestModal Action', action);
    dispatch(action);
  };
}
