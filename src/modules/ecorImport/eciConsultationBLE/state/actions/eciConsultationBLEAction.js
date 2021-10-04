import {
  CONSULTATION_BLE_FAILED,
  CONSULTATION_BLE_IN_PROGRESS,
  CONSULTATION_BLE_INIT,
  CONSULTATION_BLE_SUCCESS,
} from '../eciConsultationBLEConstants';
import EciConsultationBLEApi from '../../service/api/eciConsultationBLEApi';
import translate from '../../../../../commons/i18n/ComI18nHelper';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    EciConsultationBLEApi.findEciRechBle({
      dateBleDu: action.value.dateBleDu,
      dateBleAu: action.value.dateBleAu,
      referenceBle: action.value.referenceBLE,
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
    type: CONSULTATION_BLE_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: CONSULTATION_BLE_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: CONSULTATION_BLE_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: CONSULTATION_BLE_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
