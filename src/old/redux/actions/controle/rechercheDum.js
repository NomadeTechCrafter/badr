import ControleApi from '../../../services/api/controle-api';

import * as Constants from '../../../common/constants/controle/rechercheDum';

/**i18n */
import {translate} from '../../../../commons/i18n/ComI18nHelper';

// Search List Declaration Dum
export function searchListeDeclaration(action, navigation) {
  return (dispatch) => {
    dispatch(action);
    dispatch(searchListeDeclaration_inProgress(action));
    ControleApi.getDataListDeclaration(
      action.value.login,
      action.value.typeControle,
    )
      .then((response) => {
        if (response) {
          const data = JSON.parse(response.data);
          if (data && !data.dtoHeader.messagesErreur) {
            dispatch(searchListeDeclaration_success(data));
            /** Naviguer vers la vue suivant. */
            navigation.navigate('ListDeclarationDum', {
              login: action.value.login,
              typeControle: action.value.typeControle,
              listeDeclaration: data.jsonVO,
            });
          } else {
            dispatch(searchListeDeclaration_failed(data));
          }
        } else {
          dispatch(
            searchListeDeclaration_failed(translate('errors.technicalIssue')),
          );
        }
      })
      .catch((e) => {
        dispatch(
          searchListeDeclaration_failed(translate('errors.technicalIssue')),
        );
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
  searchListeDeclaration,
  searchListeDeclaration_inProgress,
  searchListeDeclaration_success,
  searchListeDeclaration_failed,
};
