import TransverseApi from '../../../services/api/transverse-api';
import * as Constants from '../../../common/constants/components/qrCode';


export function request(action, navigation,screenAfterScan) {
  return dispatch => {
    dispatch(inProgress(action));
    TransverseApi.doProcess(
      action.value.module,
      action.value.command,
      action.value.typeService,
      action.value.param,
    )
      .then(response => {
        const data = response.data;
        if (data && data.jsonVO) {
          console.log('action qrcode :',data.jsonVO);
          action.value.data = data.jsonVO;
          dispatch(success(action));
            navigation.navigate(screenAfterScan , {
                refDeclaration: data.jsonVO
            });
        } else {
          dispatch(failed({value: 'error while getting data'}));
        }
      })
      .catch(e => {
        dispatch(failed({value: 'error while getting data'}));
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
  console.log('in progress fired ...');
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
