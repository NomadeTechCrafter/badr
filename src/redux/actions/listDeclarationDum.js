import ControleApi from '../../services/api/controle-api';

import * as Constants from '../../common/constants/listDeclarationDum';

export function request(action, navigation) {
  return dispatch => {
    dispatch(action);
    dispatch(inProgress(action));
    ControleApi.getDataListDeclaration(
      action.value.login,
      action.value.typeControl,
    )
      .then(response => {
        const data = JSON.parse(response.data);
        if (data.jsonVO.code === '200') {
          dispatch(success(data.jsonVO));
          //navigation.navigate('control', {login: action.value.login});
        } else {
          if (data.jsonVO.message) {
            dispatch(failed(data.jsonVO.message));
          } else {
            dispatch(failed('Code incorrect'));
          }
        }
      })
      .catch(e => {
        console.log(e);
        dispatch(failed('Code incorrect'));
      });
  };
}

export function inProgress(action) {
  return {
    type: Constants.SMSVERIFY_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: Constants.LISTDECLARATION_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.LISTDECLARATION_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.LISTDECLARATION_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
