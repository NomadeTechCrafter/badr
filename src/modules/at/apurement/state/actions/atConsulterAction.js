/** API Services */

import AtApi from '../../service/api/atApi';

/**Constants */
import * as Constants from '../atConstants';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';

/** Utils */
import ComUtils from '../../../../../commons/utils/ComUtils';

/** Consulter AT */

export function request(action, navigation) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    AtApi.searchAtByRef(action.value)
      .then((response) => {
        if (response) {
          const data = response.data;
          if (
            data &&
            (data.dtoHeader.messagesErreur == null ||
              data.dtoHeader.messagesErreur.length === 0)
          ) {
            dispatch(success(data));
            navigation.navigate('AtGestion', {
              screen: "AtEntete",
              data: data,
              consultation: true
            });
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
    type: Constants.CONSULTER_AT_IN_PROGRESS,
    value: action.value,
  };
}

export function clearMsg(action) {
  return {
    type: Constants.CONSULTER_AT_CLEAR_MSG,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: Constants.CONSULTER_AT_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.CONSULTER_AT_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.CONSULTER_AT_FAILED,
    value: data,
  };
}

export function requestFile(action, navigation) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgressFile(action));
    AtApi.consulterFichierDocument(action.value)
      .then((response) => {
        if (response) {
          const data = response.data;
          if (
            data &&
            (data.dtoHeader.messagesErreur == null ||
              data.dtoHeader.messagesErreur.length === 0)
          ) {
            console.log('data -FILE ');
            console.log(data);
            ComUtils.downloadFile(data.fileName, data.content);
            dispatch(successFile(data));
          } else {
            dispatch(failedFile(data));
          }
        } else {
          dispatch(failedFile(translate('errors.technicalIssue')));
        }
      })
      .catch((e) => {
        dispatch(failedFile(translate('errors.technicalIssue')));
      });
  };
}

export function inProgressFile(action) {
  return {
    type: Constants.FILE_AT_IN_PROGRESS,
    value: action.value,
  };
}

export function clearMsgFile(action) {
  return {
    type: Constants.FILE_AT_CLEAR_MSG,
    value: action.value,
  };
}

export function initFile(action) {
  return {
    type: Constants.FILE_AT_INIT,
    value: action.value,
  };
}

export function successFile(data) {
  return {
    type: Constants.FILE_AT_SUCCESS,
    value: data,
  };
}

export function failedFile(data) {
  return {
    type: Constants.FILE_AT_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
  clearMsg,
  requestFile,
  successFile,
  failedFile,
  inProgressFile,
  clearMsgFile,
};
