import {
  CONSULTATION_BLS_FAILED,
  CONSULTATION_BLS_IN_PROGRESS,
  CONSULTATION_BLS_INIT,
  CONSULTATION_BLS_SUCCESS,
} from '../ctrlResultatScannerConstants';
import EciConsultationBLSApi from '../../service/api/eciConsultationBLSApi';
import translate from '../../../../../commons/i18n/ComI18nHelper';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    EciConsultationBLSApi.findEciRechBls({
      dateBlsDu: action.value.dateBlsDu,
      dateBlsAu: action.value.dateBlsAu,
      referenceBlS: action.value.referenceBLS,
      etat: action.value.etat,
    })
      .then((response) => {
        if (response && response.data && response.data.jsonVO) {
          dispatch(success(response.data.jsonVO));
        } else {
          if (response.data.jsonVO) {
            dispatch(failed(response.data.jsonVO));
          } else {
            dispatch(failed(translate('errors.technicalIssue')));
          }
        }
      })
      .catch((e) => {
        console.log(e);
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

export function inProgress(action) {
  return {
    type: CONSULTATION_BLS_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: CONSULTATION_BLS_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: CONSULTATION_BLS_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: CONSULTATION_BLS_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
