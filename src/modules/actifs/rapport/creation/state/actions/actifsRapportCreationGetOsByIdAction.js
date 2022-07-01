import TransverseApi from '../../../../../../commons/services/api/ComTransverseApi';
import * as Constants from '../actifsRapportCreationConstants';
/**i18n */
import {translate} from '../../../../../../commons/i18n/ComI18nHelper';
const MODULE = 'GIB';
const TYPE_SERVICE = 'UC';
export function request(action, navigation, successRedirection) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    console.log('navig success    getOsById action : ', action);
    TransverseApi.doProcess(
      MODULE,
      'editerOrdreService',
      TYPE_SERVICE,
      action.value.data,
    )
      .then((response) => {
        if (response) {
          const data = response.data;
          if (data && !data.dtoHeader.messagesErreur) {
            console.log('data', data.jsonVO);
            dispatch(success(data.jsonVO));
            /** Naviguer vers la vue suivant. */

            console.log('navig success');
          } else {
            dispatch(failed(data));
          }
        } else {
          dispatch(failed(translate('errors.technicalIssue')));
        }
      })
      .catch((e) => {
        console.log('in action request catch', e);
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

export function inProgress(action) {
  return {
    type: Constants.ACTIFS_ENTETE_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.ACTIFS_ENTETE_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.ACTIFS_ENTETE_FAILED,
    value: data,
  };
}

export function init(action) {
  return {
    type: Constants.ACTIFS_ENTETE_INIT,
    value: action.value,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
