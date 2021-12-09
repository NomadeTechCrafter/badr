import * as Constants from '../actifsRapportCreationConstants';

export function request(action) {
  return (dispatch) => {
    dispatch(inProgress(action));
    dispatch(success(action));
  };
}

export function inProgress(action) {
  return {
    type: Constants.ACTIFS_CONFIRMER_AVITAILLEMENTENTREE_IN_PROGRESS,
    value: action.value,
  };
}

export function success(action) {
  return {
    type: Constants.ACTIFS_CONFIRMER_AVITAILLEMENTENTREE_SUCCESS,
    value: action.value,
  };
}

export function failed(action) {
  return {
    type: Constants.ACTIFS_CONFIRMER_AVITAILLEMENTENTREE_FAILED,
    value: action.value,
  };
}



export default {
  request,
  success,
  failed,
  inProgress,
};