/** API Services */
/**Constants */
import * as Constants from '../habOperatConstants';

import HabOperatApi from '../../service/api/habOperatApi';

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

    HabOperatApi.confirmConnexionDeclarant(
      action.value.operateur
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
  console.log('save data list functions')
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
    type: Constants.CONFIRMCNX_DECLARANT_IN_PROGRESS,
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
    type: Constants.CONFIRMCNX_DECLARANT_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.CONFIRMCNX_DECLARANT_FAILED,
    value: data,
  };
}
