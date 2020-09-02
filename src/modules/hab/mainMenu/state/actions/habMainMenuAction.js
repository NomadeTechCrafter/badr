/**Constants */
import * as Constants from '../habMainMenuConstants';
/** Storage  */
import {load} from '../../../../../commons/services/async-storage/StorageService';
/** i18n */
import {translate} from '../../../../../commons/i18n/I18nHelper';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    load('listFonctionnaliteVOs', true)
      .then((data) => {
        if (data) {
          action.value.payload = data;
          dispatch(success(action.value));
        } else {
          dispatch(failed(translate('errors.technicalIssue')));
        }
      })
      .catch((e) => {
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

export function inProgress(action) {
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
  return {
    type: Constants.MENU_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.MENU_FAILED,
    value: data,
  };
}
