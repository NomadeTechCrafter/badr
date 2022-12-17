/**Constants */
import * as Constants from '../../constants/generic/ComGenericConstants';

/** i18n */
import {translate} from '../../i18n/ComI18nHelper';
import ComTransverseApi from '../../services/api/ComTransverseApi';

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
        if (action.value.command === 'isNouvelleLibelleFormation') {
          dispatch(success(response.data.jsonVO));
        } else {
          if (response && response.data && response.data.jsonVO) {
            dispatch(success(response.data.jsonVO));
          } else {
            dispatch(failed(translate('errors.technicalIssue')));
          }
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
    type: Constants.GENERIC_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: Constants.GENERIC_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.GENERIC_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.GENERIC_FAILED,
    value: data,
  };
}
