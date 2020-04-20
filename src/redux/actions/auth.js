import HabApi from '../../services/api/hab-api';

import * as Constants from '../../common/constants/auth';

/**i18n */
import {translate as translate} from '../../common/translations/i18n';

import {save} from '../../services/storage-service';

export function request(action, navigation) {
  return dispatch => {
    dispatch(action);
    dispatch(inProgress(action));
    HabApi.login(action.value.login, action.value.pwd)
      .then(data => {
        if (data) {
          if (data.statutConnexion === '1') {
            dispatch(success(data));
            /** Sauvegarde de l'utilisateur dans la base de donnée locale. */
            save('user', JSON.stringify(data)).then(() => data.login);
            /** Naviguer vers la vue suivant. */
            navigation.navigate('SmsVerify', {login: action.value.login});
          } else {
            dispatch(failed(data));
          }
        } else {
          dispatch(failed(translate('errors.technicalIssue')));
        }
      })
      .catch(e => {
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

export function inProgress(action) {
  return {
    type: Constants.AUTH_LOGIN_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.AUTH_LOGIN_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.AUTH_LOGIN_FAILED,
    value: data,
  };
}

export function init(action) {
  return {
    type: Constants.LOGIN_INIT,
    value: action.value,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
