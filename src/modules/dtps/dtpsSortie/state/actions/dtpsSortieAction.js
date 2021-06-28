import {
  DTPS_SORTIE_FAILED,
  DTPS_SORTIE_IN_PROGRESS,
  DTPS_SORTIE_INIT,
  DTPS_SORTIE_SUCCESS,
} from '../dtpsSortieConstants';
import translate from '../../../../../commons/i18n/ComI18nHelper';
import ComTransverseApi from '../../../../../commons/services/api/ComTransverseApi';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    ComTransverseApi.doProcess(
      "ECHANGE_LIB",
      "echange.findDtpsByCritereForSortie",
      "SP",
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
    type: DTPS_SORTIE_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: DTPS_SORTIE_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: DTPS_SORTIE_SUCCESS,
    value: data.jsonVO,
  };
}

export function failed(data) {
  return {
    type: DTPS_SORTIE_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
