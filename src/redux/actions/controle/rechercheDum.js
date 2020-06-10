import ControleApi from '../../../services/api/controle-api';

import * as Constants from '../../../common/constants/controle/rechercheDum';

/**i18n */
import {translate} from '../../../common/translations/i18n';

import {save} from '../../../services/storage-service';
import * as data from '../../../services/api/localData/controle/dataInitControle.json';
export function request(action, navigation,successRedirection) {
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
            console.log('data' ,data);
            dispatch(success(data));
            /** Naviguer vers la vue suivant. */
            navigation.navigate(successRedirection , {
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
    type: Constants.RECHERCHEDUM_INITCONTROLE_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.RECHERCHEDUM_INITCONTROLE_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.RECHERCHEDUM_INITCONTROLE_FAILED,
    value: data,
  };
}

export function init(action) {
  return {
    type: Constants.RECHERCHEDUM_INITCONTROLE_INIT,
    value: action.value,
  };
}


// Search List Declaration Dum
export function searchListeDeclaration(action, navigation) {
  return dispatch => {
    dispatch(action);
    dispatch(searchListeDeclaration_inProgress(action));
    ControleApi.getDataListDeclaration(
      action.value.login,
      action.value.typeControle)
      .then(response => {
        if (response) {
        const data = JSON.parse(response.data);
        if (data && !data.dtoHeader.messagesErreur) {
          dispatch(searchListeDeclaration_success(data));
             /** Naviguer vers la vue suivant. */
             navigation.navigate('ListDeclarationDum' , {
              login: action.value.login,
              typeControle:action.value.typeControle,
              listeDeclaration: data.jsonVO,
            });
        } else {
          dispatch(searchListeDeclaration_failed(data));
        }
      }else{
        dispatch(searchListeDeclaration_failed(translate('errors.technicalIssue')));
      }
      })
      .catch(e => {
        console.log('in action request catch', e);
        dispatch(searchListeDeclaration_failed(translate('errors.technicalIssue')));
      });
  };
}

export function searchListeDeclaration_inProgress(action) {
  return {
    type: Constants.RECHERCHEDUM_LISTDECLARATION_IN_PROGRESS,
    value: action.value,
  };
}

export function searchListeDeclaration_success(data) {
  return {
    type: Constants.RECHERCHEDUM_LISTDECLARATION_SUCCESS,
    value: data,
  };
}

export function searchListeDeclaration_failed(data) {
  return {
    type: Constants.RECHERCHEDUM_LISTDECLARATION_FAILED,
    value: data,
  };
}

export function searchListeDeclaration_init(action) {
  return {
    type: Constants.RECHERCHEDUM_LISTDECLARATION_INIT,
    value: action.value,
  };
}
export default {
  request,
  success,
  failed,
  inProgress,
  searchListeDeclaration,
  searchListeDeclaration_inProgress,
  searchListeDeclaration_success,
  searchListeDeclaration_failed,

};
