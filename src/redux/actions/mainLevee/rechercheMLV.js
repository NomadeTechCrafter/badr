import TransverseApi from '../../../services/api/transverse-api';
import * as Constants from '../../../common/constants/mainLevee/rechercheMLV';
/**i18n */
import {translate} from '../../../common/translations/i18n';

const MODULE = "MLV_LIB";
const TYPE_SERVICE = "SP";
export function request(action, navigation,successRedirection) {
  return dispatch => {
    dispatch(action);
    dispatch(inProgress(action));
      TransverseApi.doProcess(
      MODULE,
      "initDelivrerMlv",
      TYPE_SERVICE,
      action.value.data,
    )
      .then(response => {
        if (response) {

         const data = response.data;
          if (data && !data.dtoHeader.messagesErreur) {
            console.log('data' ,data);
            dispatch(success(data));
            /** Naviguer vers la vue suivant. */
            navigation.navigate(successRedirection , {
              login: action.value.login,
              refDeclaration: action.value.data.referenceDed,
              numeroVoyage: action.value.numeroVoyage,
              cle: action.value.cle,
              declarationRI: data.jsonVO,
            });
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
    type: Constants.MAINLEVEE_RECHERCHEDECLARATION_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.MAINLEVEE_RECHERCHEDECLARATION_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.MAINLEVEE_RECHERCHEDECLARATION_FAILED,
    value: data,
  };
}

export function init(action) {
  return {
    type: Constants.MAINLEVEE_RECHERCHEDECLARATION_INIT,
    value: action.value,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
