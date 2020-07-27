import AutoLoginApi from '../../services/api/autoLoginApi';
import * as Constants from '../../constants/components/autoLogin';
import {Session} from '../../services/session/Session';

export function request(action, navigation) {
  return (dispatch) => {
    dispatch(inProgress(action));

    new AutoLoginApi(
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
        console.log(action.value);
        console.log(JSON.stringify(Session.getInstance()));
        dispatch(success(action.value));
        console.log(navigation);
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
