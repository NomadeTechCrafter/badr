/**i18n */
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import AutoriserAcheminementApposerScellesApi from '../../service/api/autoriserAcheminementGestionApi';
import * as Constants from '../autoriserAcheminementMainConstants';



export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    AutoriserAcheminementApposerScellesApi.getScellesApposees(action.value.referenceEnregistrement, action.value.numeroVoyage)
      .then((response) => {
        if (response) {
          // console.log('response', response);
          const data = response.data;
          if (data && !data.dtoHeader.messagesErreur) {
            console.log('data', data);
            dispatch(success(data));

          } else {
            console.log('data.dtoHeader.messagesErreur', data.dtoHeader.messagesErreur);
            dispatch(failed(data));
          }
        } else {
          console.log('not response');
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
    type: Constants.AUTORISER_ACHEMINEMENT_GET_SCELLES_APPOSEES_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.AUTORISER_ACHEMINEMENT_GET_SCELLES_APPOSEES_SUCCESS,
    value: {
      data: data
    },
  };
}

export function failed(data) {
  return {
    type: Constants.AUTORISER_ACHEMINEMENT_GET_SCELLES_APPOSEES_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
