import * as Constants from '../decMainleveeConstants';

import ComTransverseApi from '../../../../../commons/services/api/ComTransverseApi';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';

export function request(action, navigation, successRedirection) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    ComTransverseApi.doProcess(
      action.value.module,
      action.value.commande,
      action.value.typeService,
      action.value.data,
    )
      .then((response) => {
        if (response) {
          const data = response.data;
          if (
            data &&
            (data.dtoHeader.messagesErreur == null ||
              data.dtoHeader.messagesErreur.length === 0)
          ) {
            dispatch(success(data));
            //navigation.navigate(successRedirection, data);
            navigation.navigate('Home', {
              screen: 'MainleveeListeDeclaration',
              params: {data},
            });
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

export function inProgress(action) {
  return {
    type: Constants.RECHERCHE_D17_MAINLEVEE_IN_PROGRESS,
    value: action.value,
  };
}

export function init() {
  return {
    type: Constants.RECHERCHE_D17_MAINLEVEE_INIT,
    value: {},
  };
}

export function success(data) {
  return {
    type: Constants.RECHERCHE_D17_MAINLEVEE_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.RECHERCHE_D17_MAINLEVEE_FAILED,
    value: data,
  };
}

export function remove(data) {
  return {
    type: Constants.PREPARE_APUR_REMOVE,
    value: {index: data.value.index},
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
  remove,
};