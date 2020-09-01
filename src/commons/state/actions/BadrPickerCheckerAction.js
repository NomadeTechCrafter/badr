import TransverseApi from '../../services/api/TransverseApi';
import * as Constants from '../../constants/components/BadrPickerConstants';
import translate from '../../i18n/I18nHelper';

export function request(action) {
  return dispatch => {
    dispatch(inProgress(action));
    TransverseApi.doProcess(
      action.value.module,
      action.value.command,
      action.value.typeService,
      action.value.param,
    )
      .then(response => {
        const data = response.data;
        if (data && data.jsonVO) {
          action.value.payload = data.jsonVO;
          dispatch(success(action));
        } else {
          dispatch(failed({value:response.dtoHeader.messagesErreur}));
        }
      })
      .catch(e => {
        dispatch(failed({value: translate('errors.technicalIssue')}));
      });
  };
}

export function success(action) {
  return {
    type: Constants.BADRPICKER_CHECKER_SUCCESS,
    value: action.value,
  };
}

export function failed(action) {
  return {
    type: Constants.BADRPICKER_CHECKER_FAILED,
    value: action.value,
  };
}

export function inProgress(action) {
  return {
    type: Constants.BADRPICKER_CHECKER_IN_PROGRESS,
    value: action.value,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
