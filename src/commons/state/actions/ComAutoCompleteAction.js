import ComTransverseApi from '../../services/api/ComTransverseApi';
import * as Constants from '../../constants/components/ComAutoCompleteConstants';
/** Loadash */
import _ from 'lodash';
export function request(action) {
  return (dispatch) => {
    dispatch(inProgress(action));
    ComTransverseApi.doProcess(
      action.value.module,
      action.value.command,
      action.value.typeService,
      action.value.param,
    )
      .then((response) => {
        const data = response.data;
        if (data && data.jsonVO) {
          action.value.data =
            action.value.nbElements === -1
              ? data.jsonVO
              : _.take(data.jsonVO, action.value.nbElements);
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
