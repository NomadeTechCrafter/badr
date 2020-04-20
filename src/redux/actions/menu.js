import * as Constants from '../../common/constants/menu';
import {load} from '../../services/storage-service';

export function request(action) {
  return dispatch => {
    dispatch(action);
    dispatch(inProgress(action));
    load('listFonctionnaliteVOs')
      .then(data => {
        if (data) {
          action.value.payload = data;
          dispatch(success(action.value));
        } else {
          dispatch(failed('Cannot retrieve menu list.'));
        }
      })
      .catch(e => {
        dispatch(failed('Cannot retrieve menu list.'));
      });
  };
}

export function inProgress(action) {
  console.log("inprogress...");
  return {
    type: Constants.MENU_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: Constants.MENU_INIT,
    value: action.value,
  };
}

export function success(data) {
    console.log("sucess...");
  return {
    type: Constants.MENU_SUCCESS,
    value: data,
  };
}

export function failed(data) {
    console.log("failed...");
  return {
    type: Constants.MENU_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
