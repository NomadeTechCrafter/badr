import HabApi from '../../services/api/hab-api';

import * as Constants from '../../common/constants/confirmConnexion';
import {save} from '../../services/storage-service';

export function request(action, navigation) {
  return dispatch => {
    dispatch(action);
    dispatch(inProgress(action));
    HabApi.confirmConnexion(
      action.value.codeBureau,
      action.value.listeProfilCoche,
      action.value.login,
    )
      .then(response => {
        const data = JSON.parse(response.data).jsonVO;
        if (data) {
          console.log('SUCCESS => ');
          save('listFonctionnaliteVOs', JSON.stringify(data.listFonctionnaliteVOs)).then(() => data.listFonctionnaliteVOs);
          dispatch(success(data));
           navigation.navigate('Home', {login: action.value.login});
        } else {
          dispatch(failed(data.jsonVO.message));
        }
      })
      .catch(e => {
        dispatch(failed('Cannot confirm connexion'));
      });
  };
}

export function inProgress(action) {
  return {
    type: Constants.CONFIRMCNX_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: Constants.CONFIRMCNX_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.CONFIRMCNX_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.CONFIRMCNX_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
