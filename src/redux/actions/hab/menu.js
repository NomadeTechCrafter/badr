/** API Services */
import * as Constants from '../../../common/constants/hab/menu';

/** Storage  */
import {loadParsed} from '../../../services/storage-service';

/** i18n */
import {translate} from '../../../common/translations/i18n';

export function request(action) {
  return dispatch => {
    console.log('reloading menu...');
    dispatch(action);
    dispatch(inProgress(action));
    loadParsed('listFonctionnaliteVOs')
      .then(data => {
        if (data) {
          action.value.payload = data;
          dispatch(success(action.value));
        } else {
          dispatch(failed(translate('errors.technicalIssue')));
        }
      })
      .catch(e => {
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

export function inProgress(action) {
  console.log('inprogress...');
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
  console.log('sucess...');
  return {
    type: Constants.MENU_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  console.log('failed...');
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
