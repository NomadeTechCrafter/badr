/**Constants */
import * as Constants from '../GenericConstants';

/** i18n */
// import {translate} from '../../i18n/ComI18nHelper';
// import ComTransverseApi from '../../services/api/ComTransverseApi';
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import ComTransverseApi from '../../../../../../commons/services/api/ComTransverseApi';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    ComTransverseApi.doProcess(
      action.value.module,
      action.value.command,
      action.value.typeService,
      action.value.jsonVO,
    )
      .then((response) => {
        console.log('ComGenericAction response ' + JSON.stringify(response));
        if (response && response.data && response.data.jsonVO) {
          dispatch(success(response.data.jsonVO));
        } else {
          dispatch(failed(response));
        }
      })
      .catch((e) => {
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

export function refresh(action) {
  return (dispatch) => {
    dispatch(action);
  };
}

export function inProgress(action) {
  return {
    type: Constants.ACTIFS_GENERIC_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: Constants.ACTIFS_GENERIC_INIT,
    value: action.value,
  };
}

export function success(data) {
  console.log('ComGenericAction success ' + JSON.stringify(data));
  return {
    type: Constants.ACTIFS_GENERIC_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  console.log('Act ComGenericAction failed ' + JSON.stringify(data));
  return {
    type: Constants.ACTIFS_GENERIC_FAILED,
    value: data,
  };
}
