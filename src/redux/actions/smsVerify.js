import HabApi from '../../services/api/hab-api';

import * as Constants from '../../common/constants/smsVerify';

import * as ConstantsConfirmCnx from '../../common/constants/confirmConnexion';

import * as confirmCnxAction from './confirmCnx';

const buildConfirmConnexionAction = (
  navigation,
  codeBureau,
  listeProfilCoche,
  login,
) => {
  var action = confirmCnxAction.request(
    {
      type: ConstantsConfirmCnx.CONFIRMCNX_REQUEST,
      value: {
        login: login,
        codeBureau: codeBureau,
        listeProfilCoche: listeProfilCoche,
      },
    },
    navigation,
  );
  return action;
};

export function request(action, navigation) {
  return dispatch => {
    dispatch(action);
    dispatch(inProgress(action));
    HabApi.verify(action.value.code, action.value.login)
      .then(response => {
        const data = JSON.parse(response.data);
        if (data.jsonVO.code === '200') {
          dispatch(success(data.jsonVO));
          dispatch(
            buildConfirmConnexionAction(
              navigation,
              '309',
              ['ALLPROFIL'],
              action.value.login,
            ),
          );
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
    type: Constants.SMSVERIFY_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.SMSVERIFY_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.SMSVERIFY_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
