import TransverseApi from '../../../../../commons/services/api/ComTransverseApi';

import * as Constants from '../ecorImportRechercheRefDumConstants';

/**i18n */
import {translate} from '../../../../../commons/i18n/ComI18nHelper';

export function request(action, navigation, successRedirection) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    TransverseApi.doProcess(
      action.value.module,
      action.value.commande,
      action.value.typeService,
      action.value.data,
    )
      .then((response) => {
        if (response) {
          // console.log('response', response);
          const data = response.data;
          if (data && !data.dtoHeader.messagesErreur) {
            //console.log('data', data);
            dispatch(success(data, action.value.referenceDed));
            /** Naviguer vers la vue suivant. */
            navigation.navigate(successRedirection, {
              login: action.value.login,
              refDeclaration: action.value.referenceDed,
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
      .catch((e) => {
        console.log('in action request catch', e);
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

export function inProgress(action) {
  return {
    type: Constants.RECHERCHEREFDUM_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data, refDeclaration) {
  return {
    type: Constants.RECHERCHEREFDUM_SUCCESS,
    value: {
      data: data,
      refDeclaration: refDeclaration,
    },
  };
}

export function failed(data) {
  return {
    type: Constants.RECHERCHEREFDUM_FAILED,
    value: data,
  };
}

export function init(action) {
  return {
    type: Constants.RECHERCHEREFDUM_INIT,
    value: action.value,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
