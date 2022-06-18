import ComTransverseApi from '../../../../../../commons/services/api/ComTransverseApi';
import * as Constants from '../actifsRapportCreationConstants';

export function request(action) {
  console.log('+-+-+-+-+-+-+-+-+-+-+-+-+action-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
  console.log(JSON.stringify(action));
  console.log('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-action+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
  return (dispatch) => {
    dispatch(inProgress(action));
    ComTransverseApi.doProcess(
      action.value.module,
      action.value.command,
      action.value.typeService,
      action.value.jsonVO,
    )
      .then((response) => {
        console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
        console.log(JSON.stringify(response?.data));
        console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
        const data = response.data;
        if (data && data.jsonVO) {
          dispatch(success(data));
        } else {
          dispatch(failed('getIntervenant' === action.value.command ? { value: response?.data?.dtoHeader?.messagesErreur } : { value: 'Centre RC inexistant !' }));
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
