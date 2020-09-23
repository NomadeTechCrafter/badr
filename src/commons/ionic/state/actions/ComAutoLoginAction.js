import ComAutoLoginApi from '../../services/api/ComAutoLoginApi';
import * as Constants from '../../../constants/components/ComAutoLoginConstants';
import {ComSessionService} from '../../../services/session/ComSessionService';

export function request(action, navigation) {
  return (dispatch) => {
    dispatch(inProgress(action));

    new ComAutoLoginApi(
      action.value.usr,
      action.value.password,
      action.value.smsCode,
      action.value.bureauCode,
      action.value.bureau,
      action.value.arrondissementCode,
      action.value.arrondissement,
      action.value.profiles,
    )
      .shortAuth()
      .then(() => {
        console.log(JSON.stringify(ComSessionService.getInstance()));
        dispatch(success(action.value));
        if (navigation) {
          navigation.navigate('Home', {fromIonic: true});
        }
      });
  };
}

export function success(action) {
  return {
    type: Constants.AUTOLOGIN_SUCCESS,
    value: action.value,
  };
}

export function failed(action) {
  return {
    type: Constants.AUTOLOGIN_FAILED,
    value: action.value,
  };
}

export function inProgress(action) {
  return {
    type: Constants.AUTOLOGIN_IN_PROGRESS,
    value: action.value,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};