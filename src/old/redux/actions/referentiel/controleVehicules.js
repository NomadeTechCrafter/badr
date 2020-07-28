/** API Services */
import RefApi from '../../../services/api/ref-api';

/**Constants */
import * as Constants from '../../../common/constants/referentiel/controleVehicules';

/** i18n */
import {translate} from '../../../../commons/i18n/I18nHelper';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    RefApi.findVehiculeVoleByParameter({
      status: action.value.status,
      numeroChassis: action.value.numeroChassis,
      numeroCarteGrise: action.value.numeroCarteGrise,
      matricule: action.value.matricule,
    })
      .then((response) => {
        console.log(action.value);
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
    type: Constants.CONTROLE_VEHICULE_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: Constants.CONTROLE_VEHICULE_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.CONTROLE_VEHICULE_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.CONTROLE_VEHICULE_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
