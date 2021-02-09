import TransverseApi from '../../../../../commons/services/api/ComTransverseApi';

import * as Constants from '../controleCommonConstants';

/**i18n */
import {translate} from '../../../../../commons/i18n/ComI18nHelper';

export function request(action, navigation, successRedirection) {
  return (dispatch) => {
    console.log(action.value);
    dispatch(action);
    dispatch(inProgress(action));
    TransverseApi.doProcess(
      action.value.module,
      action.value.commande,
      action.value.typeService,
      action.value.data,
    )
      .then((response) => {
        console.log('in response in action');
        if (response) {
          const data = response.data;
          console.log('in response in action data ', data);
          if (data && !data.dtoHeader.messagesErreur) {
            console.log('****dispatch sucess ');
            dispatch(success(data, action.value.referenceDed));
            /** Naviguer vers la vue suivant. */
            navigation.navigate(successRedirection, {
              login: action.value.login,
              refDeclaration: action.value.referenceDed,
              numeroVoyage: action.value.numeroVoyage,
              cle: action.value.cle,
              declarationRI: data.jsonVO,
              sousReservePaiementMLV: action.value.sousReservePaiementMLV,
            });
          } else {
            console.log('****dispatch faild ');
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
    type: Constants.INIT_CONTROLE_COMMUN_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data, refDeclaration) {
  console.log('in dispatch succes action dunction');
  return {
    type: Constants.INIT_CONTROLE_COMMUN_SUCCESS,
    value: {
      data: data,
      refDeclaration: refDeclaration,
    },
  };
}

export function failed(data) {
  return {
    type: Constants.IINIT_CONTROLE_COMMUN_FAILED,
    value: data,
  };
}

export function init(action) {
  return {
    type: Constants.INIT_CONTROLE_COMMUN_INIT,
    value: action.value,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
