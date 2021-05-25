import TransverseApi from '../../../services/api/transverse-api';
import * as Constants from '../../../common/constants/components/badrApiTable';

export function request(action) {
  return (dispatch) => {
    dispatch(inProgress(action));
    TransverseApi.doProcess(
      action.value.module,
      action.value.command,
      action.value.typeService,
      action.value.searchObject,
      action.value.offset,
      action.value.pageSize,
    )
      .then((response) => {
        const data = response.data;
        if (data && data.jsonVO) {
          action.value.payload = data.jsonVO;
          dispatch(success(action));
        } else {
          dispatch(failed({value: 'error while getting data'}));
        }
      })
      .catch((e) => {
        dispatch(failed({value: 'error while getting data'}));
      });
  };
}

export function success(action) {
  return {
    type: Constants.BADR_APITABLE_SUCCESS,
    value: action.value,
  };
}

export function failed(action) {
  console.log(action.value);
  return {
    type: Constants.BADR_APITABLE_FAILED,
    value: action.value,
  };
}

export function inProgress(action) {
  return {
    type: Constants.BADR_APITABLE_IN_PROGRESS,
    value: action.value,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
