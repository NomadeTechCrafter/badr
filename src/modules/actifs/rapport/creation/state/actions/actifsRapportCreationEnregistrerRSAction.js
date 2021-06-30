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
    TransverseApi.doProcess(
      MODULE,
      'enregistrerRS',
      TYPE_SERVICE,
      action.value.data,
    )
      .then((response) => {
        if (response) {
          const data = response.data;
          console.log('response enregistrerRS', response);
          if (data && !data.dtoHeader.messagesErreur) {
            console.log('data enregistrerRS', data);
            dispatch(success(data));
            /** Naviguer vers la vue suivant. */

            console.log('navig success');
          } else {
            console.log('failed(data) enregistrerRS',data);
            dispatch(failed(data));
          }
        } else {
          console.log('failed(data) 2 enregistrerRS', response);
          dispatch(failed(translate('errors.technicalIssue')));
        }
      })
      .catch((e) => {
        console.log('in action request catch enregistrerRS ', e);
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

export function inProgress(action) {
  return {
    type: Constants.ACTIFS_CREATION_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.ACTIFS_CREATION_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.ACTIFS_CREATION_FAILED,
    value: data,
  };
}

export function init(action) {
  return {
    type: Constants.ACTIFS_CREATION_INIT,
    value: action.value,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
