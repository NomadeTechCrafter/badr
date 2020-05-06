import ControleApi from '../../../services/api/controle-api';

import * as Constants from '../../../common/constants/controle/regimeInterne';

/**i18n */
import {translate as translate} from '../../../common/translations/i18n';

import {save} from '../../../services/storage-service';

export function validateSave(action, navigation) {
  return dispatch => {
    dispatch(action);
    dispatch(inProgress(action));

    ControleApi.validateSaveAction(
      action.value.login,
      action.value.commande,
      action.value.data,
    )
      .then(response => {
        if (response) {
          console.log('validateaction response',response)

          const data = JSON.parse(response.data);
          if (data && (data.dtoHeader.messagesErreur==null || data.dtoHeader.messagesErreur.length == 0 )) {
            dispatch(success(data));
            console.log('validateaction',data)
          } else {
            dispatch(failed(data));
          }
        } else {
          dispatch(failed(translate('errors.technicalIssue')));
        }
      })
      .catch(e => {
        console.log('in action request catch', e);
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

export function inProgress(action) {
  return {
    type: Constants.REGIMEINTERNE_VALIDATESAVE_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.REGIMEINTERNE_VALIDATESAVE_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.REGIMEINTERNE_VALIDATESAVE_FAILED,
    value: data,
  };
}


export default {
  validateSave,
  success,
  failed,
  inProgress,
};
