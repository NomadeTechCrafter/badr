import TransverseApi from '../../../services/api/transverse-api';
import * as Constants from '../../../common/constants/components/autoComplete';


export function request(action) {
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
          console.log('dispatch success', data.jsonVO)
          action.value.data = data.jsonVO;
          dispatch(success(action));
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
    type: Constants.AUTOCOMPLETE_SUCCESS,
    value: action.value,
  };
}

export function failed(action) {
  return {
    type: Constants.AUTOCOMPLETE_FAILED,
    value: action.value,
  };
}

export function inProgress(action) {
  console.log('in progress fired ...');
  return {
    type: Constants.AUTOCOMPLETE_IN_PROGRESS,
    value: action.value,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
