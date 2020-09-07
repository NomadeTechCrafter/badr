import TransverseApi from '../../services/api/TransverseApi';
import * as Constants from '../../constants/components/QrCodeConstants';
import translate from '../../i18n/I18nHelper';

export function request(action) {
  return (dispatch) => {
    dispatch(inProgress(action));
    TransverseApi.doProcess(
      action.value.module,
      action.value.command,
      action.value.typeService,
      action.value.param,
    )
      .then((response) => {
        const data = response.data;
        if (data && data.jsonVO) {
          console.log('action qrcode :', data.jsonVO);
          action.value.data = data.jsonVO;
          dispatch(success(action));
        } else {
          dispatch(failed({value: translate('qr.at_invalide')}));
        }
      })
      .catch((e) => {
        dispatch(failed({value: translate('qr.at_invalide')}));
      });
  };
}

export function success(action) {
  return {
    type: Constants.QRCODE_SUCCESS,
    value: action.value,
  };
}

export function failed(action) {
  return {
    type: Constants.QRCODE_FAILED,
    value: action.value,
  };
}

export function inProgress(action) {
  return {
    type: Constants.QRCODE_IN_PROGRESS,
    value: action.value,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
