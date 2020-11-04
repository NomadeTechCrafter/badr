import TransverseApi from '../../../../../../commons/services/api/ComTransverseApi';
import * as Constants from '../../../../../common/constants/actifs/rapport/creation/details';
/**i18n */
import {translate} from '../../../../../../commons/i18n/ComI18nHelper';

const MODULE = 'GIB';
const TYPE_SERVICE = 'SP';
export function request(action, navigation, successRedirection) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    TransverseApi.doProcess(
      MODULE,
      'getNaturesIncident',
      TYPE_SERVICE,
      action.value.data,
    )
      .then((response) => {
        if (response) {
          const data = response.data;
          if (data && !data.dtoHeader.messagesErreur) {
            console.log('data', data);
            dispatch(success(data));
            /** Naviguer vers la vue suivant. */

            console.log('navig success');
            /* navigation.navigate(successRedirection , {
                             login: action.value.login,
                             refDeclaration: action.value.data.referenceDed,
                             numeroVoyage: action.value.numeroVoyage,
                             cle: action.value.cle,
                             declarationRI: data.jsonVO,
                         });*/
          } else {
            dispatch(failed(data));
          }
        } else {
          dispatch(failed(translate('errors.technicalIssue')));
        }
      })
      .catch((e) => {
        console.log('in action request catch', e);
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

export function inProgress(action) {
  return {
    type: Constants.ACTIFS_DETAILS_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.ACTIFS_DETAILS_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.ACTIFS_DETAILS_FAILED,
    value: data,
  };
}

export function init(action) {
  return {
    type: Constants.ACTIFS_DETAILS_INIT,
    value: action.value,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
