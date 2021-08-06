import * as Constants from '../actifsRapportCreationConstants';

export function request(action) {
  return (dispatch) => {
    dispatch(inProgress(action));
    dispatch(success(action));
  };
}

export function inProgress(action) {
  return {
    type: Constants.ACTIFS_DELETE_EMBARCATION_IN_PROGRESS,
    value: action.value,
  };
}

export function success(action) {
  return {
    type: Constants.ACTIFS_DELETE_EMBARCATION_SUCCESS,
    value: action.value,
  };
}

export function failed(action) {
  return {
    type: Constants.ACTIFS_DELETE_EMBARCATION_FAILED,
    value: action.value,
  };
}



export default {
  request,
  success,
  failed,
  inProgress,
};
