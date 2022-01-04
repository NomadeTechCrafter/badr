import TransverseApi from '../../../../../commons/services/api/ComTransverseApi';

import * as Constants from '../ecorExpConfirmationArriveeConstants';

/**i18n */
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import _ from 'lodash';
export function request(action, navigation, route) {
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
          const data = response.data;
          if (data && _.isEmpty(data.dtoHeader.messagesErreur)) {
            console.log('data', data);
            dispatch(success(data, action.value.referenceDed));

            navigation.navigate(route, {
              first: true,
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
    type: Constants.INITCONFIRMATIONARRIVEE_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data, refDeclaration) {
  return {
    type: Constants.INITCONFIRMATIONARRIVEE_SUCCESS,
    value: {
      data: data,
      refDeclaration: refDeclaration,
    },
  };
}

export function failed(data) {
  return {
    type: Constants.INITCONFIRMATIONARRIVEE_FAILED,
    value: data,
  };
}

export function init(action) {
  return {
    type: Constants.INITCONFIRMATIONARRIVEE_INIT,
    value: action.value,
  };
}
export function requestFindDumByEtatChargement(action, navigation) {
  console.log('requestFindDumByEtatChargement action 123 ' + JSON.stringify(action));
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
          console.log('response action confirmationentre', response);
          const data = response.data;
          if (data && _.isEmpty(data.dtoHeader.messagesErreur)) {
            console.log('data requestFindDumByEtatChargement', data);

            dispatch(successFindDumByEtatChargement(data.jsonVO));
            // completerInformationDum(data.jsonVO, dispatch, navigation);
          } else {
            dispatch(failedFindDumByEtatChargement(data));
          }
        } else {
          dispatch(
            failedFindDumByEtatChargement(translate('errors.technicalIssue')),
          );
        }
      })
      .catch((e) => {
        console.log('in action request catch', e);
        dispatch(
          failedFindDumByEtatChargement(translate('errors.technicalIssue')),
        );
      });
  };
}
export function inProgressFindDumByEtatChargement(action) {
  return {
    type: Constants.INITCONFIRMATIONARRIVEE_ETATCHARGEMENT_IN_PROGRESS,
    value: action.value,
  };
}

export function successFindDumByEtatChargement(data) {
  return {
    type: Constants.INITCONFIRMATIONARRIVEE_ETATCHARGEMENT_SUCCESS,
    value: {
      data: data,
    },
  };
}

export function failedFindDumByEtatChargement(data) {
  return {
    type: Constants.INITCONFIRMATIONARRIVEE_ETATCHARGEMENT_FAILED,
    value: data,
  };
}

export function initFindDumByEtatChargement(action) {
  return {
    type: Constants.INITCONFIRMATIONARRIVEE_ETATCHARGEMENT_INIT,
    value: action.value,
  };
}
// Completer les informations de la DUM liées à l'état de chargement
export async function completerInformationDum(listDum, dispatch, navigation) {
  console.log('in completerInformationDum', listDum);
  var promises = [];
  let listDeclaration = [];
  for (var i = 0; i < listDum.length; i++) {
    //promises.push(recupererDumInfo(listDum[i].codeDum));
    await TransverseApi.doProcess(
      'ECOREXP_LIB',
      'recupererDumInfo',
      'SP',
      listDum[i].codeDum,
    )
      .then((response) => {
        if (response) {
          const data = response.data;
          if (data && data.jsonVO) {
            console.log('response action recupererDumInfo jsonVO', data.jsonVO);

            let declaration = data.jsonVO;

            listDeclaration.push(declaration);
          }
        }
      })
      .catch((e) => {
        console.log('in action request catch', e);
        dispatch(
          failedFindDumByEtatChargement(translate('errors.technicalIssue')),
        );
      });
  }
  console.log('end for.', listDeclaration);
  dispatch(successFindDumByEtatChargement(listDeclaration));
  if (navigation != null) {
    navigation.navigate('Resultat', {
      first: true,
    });
  }
}

export default {
  request,
  success,
  failed,
  inProgress,
  requestFindDumByEtatChargement,
  inProgressFindDumByEtatChargement,
  successFindDumByEtatChargement,
  failedFindDumByEtatChargement,
  initFindDumByEtatChargement,
};
