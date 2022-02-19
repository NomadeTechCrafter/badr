/** i18n */
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import * as Constants from '../habSmsVerifyConstants';
import HabSmsVerifyApi from '../../service/api/habSmsVerifyApi';
import {ComSessionService} from '../../../../../commons/services/session/ComSessionService';
import {load,saveStringified,encryptData,decryptData} from '../../../../../commons/services/async-storage/ComStorageService';
export function request(action, navigation) {

  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));

    var codeSms=encryptData(action.value.code)

    HabSmsVerifyApi.verify(codeSms,action.value.typeUser)
      .then((response) => {
        const jsonVO = response.data.jsonVO;
        const decryptedCodeSms=decryptData(jsonVO.codePinSrv)
       if (decryptedCodeSms === action.value.code) {

          dispatch(success(jsonVO));
          ComSessionService.getInstance().setCodeSmsVerify(action.value.code);
          ComSessionService.getInstance().setSessionIdBO(jsonVO.session_id);

          if(action.value.typeUser==='AGENT_DOUANIER')
          navigation.navigate('Profile', {});
          else
          navigation.navigate('OperatValidate', {})

        } else if (jsonVO.connexion && jsonVO.connexion === 'false') {
          dispatch(failed(translate('smsVerify.codeIncorrect')));
        } else {
          dispatch(failed(translate('errors.technicalIssue')));
        }
      })
      .catch((e) => {
        dispatch(failed(translate('errors.technicalIssue')));
      });





}
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
export function requestGenererCodeSms(action, navigation) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgressGenererCodeSms(action));
    HabSmsVerifyApi.genererCodeSms()
      .then((response) => {
        const jsonVO = response.data.jsonVO;
        if (jsonVO) {
          dispatch(successGenererCodeSms(jsonVO));
        } else {
          dispatch(failedGenererCodeSms(translate('smsVerify.technicalIssue')));
        }
      })
      .catch((e) => {
        dispatch(failedGenererCodeSms(translate('errors.technicalIssue')));
      });
  };
}
export function inProgressGenererCodeSms(action) {
  return {
    type: Constants.GENERERCODESMS_IN_PROGRESS,
    value: action.value,
  };
}

export function successGenererCodeSms(data) {
  return {
    type: Constants.GENERERCODESMS_SUCCESS,
    value: data,
  };
}

export function failedGenererCodeSms(data) {
  return {
    type: Constants.GENERERCODESMS_FAILED,
    value: data,
  };
}
