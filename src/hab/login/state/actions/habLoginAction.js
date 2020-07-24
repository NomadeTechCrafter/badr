/** API Services */
import HabLoginApi from '../../service/api/habLoginApi';

/** Constants */
import * as Constants from '../habLoginConstants';

/**i18n */
import {translate} from '../../../../commons/i18n';

/** Storage */
import {saveStringified} from '../../../../commons/services/async-storage/storage-service';

/** Inmemory session */
import {CommonSession} from '../../../../commons/services/session/commonSession';

export function request(action, navigation) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    HabLoginApi.login(action.value.login, action.value.pwd)
      .then((data) => {
        if (data) {
          if (data.statutConnexion === '1') {
            dispatch(success(data));
            /** Saving the user login into the local storage */
            saveStringified('user', data).then(() => data.login);
            /** Saving the user login into the global in-memory session */
            CommonSession.getInstance().setLogin(data.login);
            /** Naviguer vers la vue suivant. */
            navigation.navigate('SmsVerify', {login: action.value.login});
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

export function requestLogout(action, navigation) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgressLogout(action));
    HabLoginApi.logout()
      .then((data) => {
        if (data) {
          dispatch(successLogout(translate('errors.technicalIssue')));
          navigation.navigate('Login', {});
        } else {
          dispatch(failedLogout(translate('errors.technicalIssue')));
        }
      })
      .catch((e) => {
        dispatch(failedLogout(translate('errors.technicalIssue')));
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

export function inProgressLogout(action) {
  return {
    type: Constants.AUTH_LOGOUT_IN_PROGRESS,
    value: action.value,
  };
}

export function successLogout(data) {
  return {
    type: Constants.AUTH_LOGOUT_SUCCESS,
    value: data,
  };
}

export function failedLogout(data) {
  return {
    type: Constants.AUTH_LOGOUT_FAILED,
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
  requestLogout,
  successLogout,
  failedLogout,
  inProgressLogout,
};
