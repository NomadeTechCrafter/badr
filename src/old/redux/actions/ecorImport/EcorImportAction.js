/**Constants */
/** i18n */
import {
  GENERIC_ECI_FAILED,
  GENERIC_ECI_IN_PROGRESS,
  GENERIC_ECI_SUCCESS,
} from '../../../common/constants/ecorImport/EcorImportConstants';
import translate from '../../../../commons/i18n/ComI18nHelper';
import TransverseApi from '../../../../commons/services/api/ComTransverseApi';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    console.log('----EcorImport Action', action);
    TransverseApi.doProcess(
      'ECI',
      action.value.command,
      action.value.typeService,
      action.value.jsonVO,
    )
      .then((response) => {
        console.log('----EcorImport rep', response);
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
  return {
    type: GENERIC_ECI_SUCCESS,
    value: {
      command: command,
      data: data,
    },
  };
}

export function failed(data, command) {
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
