/** i18n */
import {translate} from '../../../../../commons/i18n/I18nHelper';
import * as Constants from '../habSmsVerifyConstants';
import HabSmsVerifyApi from '../../service/api/habSmsVerifyApi';
import {Session} from '../../../../../commons/services/session/Session';

export function request(action, navigation) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    HabSmsVerifyApi.verify(action.value.code)
      .then((response) => {
        const jsonVO = response.data.jsonVO;
        if (jsonVO.connexion && jsonVO.connexion === 'true') {
          dispatch(success(jsonVO));
          Session.getInstance().setCodeSmsVerify(action.value.code);
          navigation.navigate('Profile', {});
        } else if (jsonVO.connexion && jsonVO.connexion === 'false') {
          dispatch(failed(translate('smsVerify.codeIncorrect')));
        } else {
          dispatch(failed(translate('errors.technicalIssue')));
        }
      })
      .catch((e) => {
        dispatch(failed(translate('errors.technicalIssue')));
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
