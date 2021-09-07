/** API Services */

import AtApi from '../../service/api/atApi';

/**Constants */
import * as Constants from '../atConstants';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';

/**
 Recherche
 */

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    console.log('action.value.atRechercheBean');
    console.log(action.value.atRechercheBean);
    AtApi.recupererListAt(action.value.atRechercheBean)
      .then((response) => {
        if (response) {
          const data = response.data;
          if (
            data &&
            (data.dtoHeader.messagesErreur == null ||
              data.dtoHeader.messagesErreur.length === 0)
          ) {
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
    type: Constants.RECH_MULTI_IN_PROGRESS,
    value: action.value,
  };
}

export function clearMsg(action) {
  return {
    type: Constants.RECH_MULTI_CLEAR_MSG,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: Constants.RECH_MULTI_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.RECH_MULTI_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.RECH_MULTI_FAILED,
    value: data,
  };
}
/** Consulter AT */

export function requestConsulter(action, navigation) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgressConsulter(action));
    AtApi.searchAtByRef(action.value.referenceVO)
      .then((response) => {
        if (response) {
          const data = response.data;
          if (
            data &&
            (data.dtoHeader.messagesErreur == null ||
              data.dtoHeader.messagesErreur.length === 0)
          ) {
            dispatch(successConsulter(data));
            navigation.navigate('AtEntete', {});
            // navigation.navigate('Home', {
            //   screen: 'AtEntete',
            //   params: { data },
            // });
          } else {
            dispatch(failedConsulter(data));
          }
        } else {
          dispatch(failedConsulter(translate('errors.technicalIssue')));
        }
      })
      .catch((e) => {
        dispatch(failedConsulter(translate('errors.technicalIssue')));
      });
  };
}

export function inProgressConsulter(action) {
  return {
    type: Constants.CONSULTER_AT_IN_PROGRESS,
    value: action.value,
  };
}

export function clearMsgConsulter(action) {
  return {
    type: Constants.CONSULTER_AT_CLEAR_MSG,
    value: action.value,
  };
}

export function initConsulter(action) {
  return {
    type: Constants.CONSULTER_AT_INIT,
    value: action.value,
  };
}

export function successConsulter(data) {
  return {
    type: Constants.CONSULTER_AT_SUCCESS,
    value: data,
  };
}

export function failedConsulter(data) {
  return {
    type: Constants.CONSULTER_AT_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
  clearMsg,
  requestConsulter,
  successConsulter,
  failedConsulter,
  inProgressConsulter,
  clearMsgConsulter,
};
