import {TransverseApi} from '../../../services/api/transverse-api';
import * as Constants from '../../../common/constants/badrPicker';

export function request(action) {
  return dispatch => {
    dispatch(action);
    dispatch(inProgress(action));
    TransverseApi.doProcess(
      'YASAG',
      'REF_LIB',
      'getCmbTypeIdentifiant',
      'SP',
      '',
    )
      .then(data => {
        if (data) {
          action.value.payload = data;
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
    type: Constants.BADRPICKER_SUCCESS,
    value: action.value,
  };
}

export function failed(action) {
  return {
    type: Constants.BADRPICKER_FAILED,
    value: action.value,
  };
}

export function inProgress(action) {
  return {
    type: Constants.BADRPICKER_IN_PROGRESS,
    value: action.value,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
