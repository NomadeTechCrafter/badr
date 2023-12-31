/** API Services */
import HabApi from '../../../services/api/hab-api';

/**Constants */
import * as Constants from '../../../common/constants/hab/smsVerify';

/** i18n */
import {translate} from '../../../common/translations/i18n';

export function request(action, navigation) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    HabApi.verify(action.value.code)
      .then((response) => {
        const jsonVO = response.data.jsonVO;
        console.log('-------------------');
        console.log(jsonVO.connexion);
        if (jsonVO.connexion && jsonVO.connexion === 'true') {
          dispatch(success(jsonVO));
          navigation.navigate('Profile', {});
        } else if (jsonVO.connexion && jsonVO.connexion === 'false') {
          dispatch(failed(translate('smsVerify.codeIncorrect')));
        } else {
          console.log(response);
          dispatch(failed(translate('errors.technicalIssue')));
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
