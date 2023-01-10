/** API Services */

/**Constants */
import dedInitierControlApi from '../../service/api/dedInitierControlApi';
import * as Constants from '../dedInitierControlConstants';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    dedInitierControlApi.initierControle(action.value).then((response) => {
      console.log('response initierControle ', response)
     // alert('inprogress')
      if (response && response.data) {
       // alert(response.data.jsonVO)
        if (response.data.jsonVO === "")
          dispatch(failed(response.data));
        else{
          dispatch(success(response.data.dtoHeader));

      }
      } else {
      //  alert('ko')
        dispatch(failed(response.data));
      }
    });
  };
}

export function inProgress(action) {
  return {
    type: Constants.DED_INIT_CONTROLE_COMMUN_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: Constants.DED_INIT_CONTROLE_COMMUN_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.DED_INIT_CONTROLE_COMMUN_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.DED_INIT_CONTROLE_COMMUN_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  init,
  inProgress,
};
