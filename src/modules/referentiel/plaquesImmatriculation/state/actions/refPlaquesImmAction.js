/** API Services */
/**Constants */
/** i18n */
import {
  PLAQUES_IMM_FAILED,
  PLAQUES_IMM_IN_PROGRESS,
  PLAQUES_IMM_INIT,
  PLAQUES_IMM_SUCCESS,
} from '../refPlaquesImmConstants';
import RefPlaquesImmApi from '../../service/api/refPlaquesImmApi';
import translate from '../../../../../commons/i18n/ComI18nHelper';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    RefPlaquesImmApi.rechercheEchangeMetVehicule(
      action.value.login,
      action.value.rechercheObj,
      action.value.pageSize,
      action.value.offset,
    )
      .then((response) => {
        if (response && response.data && response.data.jsonVO) {
          dispatch(success(response.data.jsonVO));
        } else {
          if (response.data.jsonVO) {
            dispatch(failed(response.data.jsonVO));
          } else {
            dispatch(failed(translate('errors.technicalIssue')));
          }
        }
      })
      .catch((e) => {
        console.log(e);
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

export function inProgress(action) {
  return {
    type: PLAQUES_IMM_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: PLAQUES_IMM_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: PLAQUES_IMM_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: PLAQUES_IMM_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
