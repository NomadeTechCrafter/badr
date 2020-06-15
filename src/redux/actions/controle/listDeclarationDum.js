import ControleApi from '../../../services/api/controle-api';

import * as Constants from '../../../common/constants/controle/listDeclarationDum';
/**i18n */
import {translate} from '../../../common/translations/i18n';

import * as data from '../../../services/api/offline/controle/dataInitControle.json';
export function request(action, navigation, successRedirection) {
  return dispatch => {
    dispatch(action);
    dispatch(inProgress(action));
    ControleApi.initControler(
      action.value.login,
      action.value.commande,
      action.value.data,
    )
      .then(response => {
        if (response) {
          // const data = JSON.parse(response.data);
          //const data = response.data;

          if (data && !data.dtoHeader.messagesErreur) {
            console.log('data', data);
            dispatch(success(data));
            /** Naviguer vers la vue suivant. */
            navigation.navigate(successRedirection, {
              login: action.value.login,
              refDeclaration: action.value.data.referenceDed,
              numeroVoyage: action.value.numeroVoyage,
              cle: action.value.cle,
              declarationRI: data.jsonVO,
            });
          } else {
            dispatch(failed(data));
          }
        } else {
          dispatch(failed(translate('errors.technicalIssue')));
        }
      })
      .catch(e => {
        console.log('in action request catch', e);
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

export function inProgress(action) {
  return {
    type: Constants.LISTDECLARATION_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.LISTDECLARATION_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.LISTDECLARATION_FAILED,
    value: data,
  };
}

export function init(action) {
  return {
    type: Constants.LISTDECLARATION_INIT,
    value: action.value,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
