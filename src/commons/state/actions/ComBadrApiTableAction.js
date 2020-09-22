import ComTransverseApi from '../../services/api/ComTransverseApi';
import * as Constants from '../../constants/components/ComBadrApiTableConstants';

export function request(action) {
  return (dispatch) => {
    dispatch(inProgress(action));
    ComTransverseApi.doProcess(
      action.value.module,
      action.value.command,
      action.value.typeService,
      action.value.searchObject,
      action.value.offset,
      action.value.pageSize,
    )
      .then((rep) => {
        const res = rep.data;
        if (res && res.jsonVO) {
          action.value.payload = res.jsonVO;
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
