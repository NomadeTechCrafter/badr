/** API Services */

/**Constants */
import * as Constants from '../DedRedressementConstants';
import DedRedressementApi from '../../service/api/DedRedressementApi';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    DedRedressementApi.initConsultationDum(action.value).then((response) => {
      if (response && response.data && response.data.jsonVO) {
        dispatch(success(response.data));
      } else {
        dispatch(error(response.data.dtoHeader));
      }
    });
  };
}

export function inProgress(action) {
  return {
    type: Constants.INIT_CONSULTATION_DUM_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: Constants.INIT_CONSULTATION_DUM_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.INIT_CONSULTATION_DUM_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.INIT_CONSULTATION_DUM_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
