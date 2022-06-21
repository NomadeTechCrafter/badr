import * as Constants from '../actifsRapportCreationConstants';
import TransverseApi from '../../../../../../commons/services/api/ComTransverseApi';
import translate from '../../../../../../commons/i18n/ComI18nHelper';

const MODULE = 'GIB';
const TYPE_SERVICE = 'UC';

export function request(action) {
  console.log('ConfirmerNavigationMaritime');
  console.log('ConfirmerNavigationMaritime');
  console.log('ConfirmerNavigationMaritime');
  console.log('ConfirmerNavigationMaritime');

  console.log(JSON.stringify(action.value));
  console.log('ConfirmerNavigationMaritime');
  console.log('ConfirmerNavigationMaritime');
  console.log('ConfirmerNavigationMaritime');
  console.log('ConfirmerNavigationMaritime');
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    TransverseApi.doProcess(
      MODULE,
      'ConfirmerNavigationMaritime',
      TYPE_SERVICE,
      action.value,
    )
      .then((response) => {
        console.log('response : ', JSON.stringify(response));
        if (response) {
          console.log('response if : ', JSON.stringify(response));
          const data = response.data;
          if (data && !data.dtoHeader.messagesErreur) {
            dispatch(success(data, action));
            /** Naviguer vers la vue suivant. */

            console.log('ConfirmerNavigationMaritime navig success');
          } else {
            console.log('failed(data) enregistrerRS', data);
            dispatch(failed(data));
          }
        } else {
          console.log('failed(data) 2 enregistrerRS', response);
          dispatch(failed(translate('errors.technicalIssue')));
        }
      })
      .catch((e) => {
        console.log('in action request catch enregistrerRS ', e);
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

export function inProgress(action) {
  return {
    type: Constants.ACTIFS_CONFIRMER_EMBARCATION_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data, action) {
  return {
    type: Constants.ACTIFS_CONFIRMER_EMBARCATION_SUCCESS,
    value: action.value,
    data: data,
  };
}

export function failed(action) {
  return {
    type: Constants.ACTIFS_CONFIRMER_EMBARCATION_FAILED,
    value: action,
  };
}



export default {
  request,
  success,
  failed,
  inProgress,
};
