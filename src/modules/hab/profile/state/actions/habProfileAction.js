/** API Services */
/**Constants */
import * as Constants from '../habProfileConstants';

import HabProfileApi from '../../service/api/habProfileApi';

/** Storage  */
import {saveStringified} from '../../../../../commons/services/async-storage/ComStorageService';

/** Inmemory session */
import {ComSessionService} from '../../../../../commons/services/session/ComSessionService';
/** i18n */
import {translate} from '../../../../../commons/i18n/ComI18nHelper';

export function request(action, navigation) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    HabProfileApi.confirmConnexion(
      action.value.codeBureau,
      action.value.listeProfilCoche,
      action.value.codeArrondissement,
    )
      .then((response) => {
        const data = response.data.jsonVO;
        if (data) {
          doAsyncStorageOperations(data);
          dispatch(success(data));
          navigation.navigate('Home', {});
        } else {
          dispatch(failed(data));
        }
      })
      .catch((e) => {
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

function doAsyncStorageOperations(data) {
  /** Saving the listFonctionnaliteVOs for menu usage */
  saveStringified('listFonctionnaliteVOs', data.listFonctionnaliteVOs).then(
    () => data.listFonctionnaliteVOs,
  );
  const user = {
    login: data.codeAgent,
    nomAgent: data.nomAgent,
    prenomAgent: data.prenomAgent,
    codeUOR: data.codeUOR,
  };

  ComSessionService.getInstance().setUserObject(user);
  /** Saving user information in the local storage */
  saveStringified('user', user).then(() => user);
}

export function inProgress(action) {
  return {
    type: Constants.CONFIRMCNX_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: Constants.CONFIRMCNX_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.CONFIRMCNX_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.CONFIRMCNX_FAILED,
    value: data,
  };
}
