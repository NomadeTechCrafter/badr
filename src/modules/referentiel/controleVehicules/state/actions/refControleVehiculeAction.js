import {
  CONTROLE_VEHICULE_FAILED,
  CONTROLE_VEHICULE_IN_PROGRESS,
  CONTROLE_VEHICULE_INIT,
  CONTROLE_VEHICULE_SUCCESS,
} from '../refControleVehiculeConstants';
import RefControleVehiculeApi from '../../service/api/refControleVehiculeApi';
import translate from '../../../../../commons/i18n/ComI18nHelper';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    RefControleVehiculeApi.findVehiculeVoleByParameter({
      status: action.value.status,
      numeroChassis: action.value.numeroChassis,
      numeroCarteGrise: action.value.numeroCarteGrise,
      matricule: action.value.matricule,
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
    type: CONTROLE_VEHICULE_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: CONTROLE_VEHICULE_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: CONTROLE_VEHICULE_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: CONTROLE_VEHICULE_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
