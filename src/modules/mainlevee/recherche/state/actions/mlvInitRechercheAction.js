import TransverseApi from '../../service/api/mlvRechercheApi';

import * as Constants from '../mlvRechercheConstants';

/**i18n */
import { translate } from '../../../../../commons/i18n/ComI18nHelper';

const MODULE = 'MLV_LIB';
const TYPE_SERVICE = 'SP';
export function request(action) {

  return (dispatch) => {
        console.log('init3 recherche')
    dispatch(action);
    dispatch(inProgress(action));
    TransverseApi.doProcess(
      MODULE,
      'initRechercheMlv',
      TYPE_SERVICE,
      action.value.data,
    )
      .then((response) => {
        if (response) {
          const data = response.data;
          console.log('responseinitrecherche',data)
          if (data && !data.dtoHeader.messagesErreur) {
            dispatch(success(data));

          } else {
            dispatch(failed(data));
          }
        } else {
          dispatch(failed(translate('errors.technicalIssue')));
        }
      })
      .catch((e) => {
        console.log('in action request catch9', e);
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

export function inProgress(action) {
  return {
    type: Constants.MAINLEVEE_INIT_RECHERCHEDECLARATION_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.MAINLEVEE_INIT_RECHERCHEDECLARATION_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.MAINLEVEE_INIT_RECHERCHEDECLARATION_FAILED,
    value: data,
  };
}

export function init(action) {
  return {
    type: Constants.MAINLEVEE_INIT_RECHERCHEDECLARATION_INIT,
    value: action.value,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
