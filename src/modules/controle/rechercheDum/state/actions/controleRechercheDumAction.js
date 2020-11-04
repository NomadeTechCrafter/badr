import ControleApi from '../../service/api/controleRechercheDumApi';

import * as Constants from '../controleRechercheDumConstants';

/**i18n */
import {translate} from '../../../../../commons/i18n/ComI18nHelper';

// Search List Declaration Dum
export function searchListeDeclaration(action, navigation) {
  console.log('searchListeDeclaration', action, navigation);
  return (dispatch) => {
    dispatch(action);
    dispatch(searchListeDeclaration_inProgress(action));
    console.info('afetrinprogress');
    ControleApi.getDataListDeclaration(
      action.value.login,
      action.value.typeControle,
      action.value.offset,
      action.value.pageSize,
    )
      .then((response) => {
        console.info('after reponse', response);
        if (response && response.data) {
          const data = response.data;
          console.info('afetrinprogress2', data);
          dispatch(searchListeDeclaration_success(data));
          /** Naviguer vers la vue suivant. */
          navigation.navigate('controleListDecalarationDumScreen', {
            login: action.value.login,
            typeControle: action.value.typeControle,
            listeDeclaration: data.jsonVO,
          });
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
