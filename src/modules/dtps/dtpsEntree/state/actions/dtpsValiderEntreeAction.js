import {
  VALIDER_DTPS_ENTREE_FAILED,
  VALIDER_DTPS_ENTREE_IN_PROGRESS,
  VALIDER_DTPS_ENTREE_INIT,
  VALIDER_DTPS_ENTREE_SUCCESS,
} from '../dtpsEntreeConstants';
import translate from '../../../../../commons/i18n/ComI18nHelper';
import ComTransverseApi from '../../../../../commons/services/api/ComTransverseApi';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    ComTransverseApi.doProcess(
      "ECHANGE_LIB",
      "echange.validerEntreeDtps",
      "UC",
      action.value,
    )
      .then((response) => {
        if (response) {
          const data = response?.data;
          if (
            data &&
            (data.dtoHeader.messagesErreur == null ||
              data.dtoHeader.messagesErreur.length === 0)
          ) {
            dispatch(success(data));
            navigation.navigate('Resultat', {});
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
    type: VALIDER_DTPS_ENTREE_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: VALIDER_DTPS_ENTREE_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: VALIDER_DTPS_ENTREE_SUCCESS,
    value: data.jsonVO,
  };
}

export function failed(data) {
  return {
    type: VALIDER_DTPS_ENTREE_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
