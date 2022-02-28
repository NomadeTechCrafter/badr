import ComTransverseApi from '../../../../../../commons/services/api/ComTransverseApi';
import * as Constants from '../actifsRapportCreationConstants';

export function request(action) {
  return (dispatch) => {
    dispatch(inProgress(action));
    ComTransverseApi.doProcess(
      action.value.module,
      action.value.command,
      action.value.typeService,
      action.value.jsonVO,
    )
      .then((response) => {
        const data = response.data;
        if (data) {
          dispatch(success(data));
        } else {
          dispatch(failed({ value: 'error while getting data' }));
        }
      })
      .catch((e) => {
        dispatch(failed({ value: 'error while getting data' }));
      });
  };
}

export function success(data) {
  return {
    type: Constants.RECHERCHE_PERSONNE_MORALE_SUCCESS,
    value: data.jsonVO,
  };
}

export function init(action) {
  return {
    type: Constants.RECHERCHE_PERSONNE_MORALE_INIT,
    value: '',
  };
}

export function failed(action) {
  return {
    type: Constants.RECHERCHE_PERSONNE_MORALE_FAILED,
    value: action.value,
  };
}

export function inProgress(action) {
  return {
    type: Constants.RECHERCHE_PERSONNE_MORALE_IN_PROGRESS,
    value: action.value,
  };
}

export default {
  request,
  success,
  failed,
  init,
  inProgress,
};
