/** API Services */

import AtApi from '../../service/api/atApi';

/**Constants */
import * as Constants from '../atConstants';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';

/**
 Recherche
 */

export function request(action, navigation) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    AtApi.recupererListAt(action.value.atRechercheBean, action.value.pageSize, action.value.offset)
      .then((response) => {
        if (response) {
          const data = response.data;
          if (
            data &&
            (data.dtoHeader.messagesErreur == null ||
              data.dtoHeader.messagesErreur.length === 0)
          ) {
            dispatch(success(data));
            navigation.navigate('Resultat', {
              first: true,
              rowCount: data.dtoHeader.rowCount,
              atRechercheBean: action.value.atRechercheBean
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


export default {
  request,
  success,
  failed,
  inProgress,
  clearMsg,
};
