import * as Constants from '../ecorExpVuEmbarquerConstants';

import ComTransverseApi from '../../../../../commons/services/api/ComTransverseApi';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    console.log('request Confirmer VuEmbarquer : ' + JSON.stringify(action));
    ComTransverseApi.doProcess(
      action.value.module,
      action.value.commande,
      action.value.typeService,
      action.value.data,
    )
      .then((response) => {
        // console.log('response Confirmer VuEmbarquer : ' + JSON.stringify(response));
        if (response) {
          const data = response.data;
          const params = action.value.data;
          if (
            data &&
            (data.dtoHeader.messagesErreur == null ||
              data.dtoHeader.messagesErreur.length === 0)
          ) {
            dispatch(success(data));
          } else {
            dispatch(failed(data));
          }
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
    type: Constants.VU_EMB_CONFIRMER_IN_PROGRESS,
    value: action.value,
  };
}

export function init() {
  return {
    type: Constants.VU_EMB_CONFIRMER_REQUEST,
    value: {},
  };
}

export function success(data) {
  return {
    type: Constants.VU_EMB_CONFIRMER_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.VU_EMB_CONFIRMER_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
