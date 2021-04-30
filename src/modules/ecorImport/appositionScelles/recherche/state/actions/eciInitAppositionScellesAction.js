/**i18n */
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import ECIInitAppositionScellesApi from '../../service/api/eciInitAppositionScellesApi';
import * as Constants from '../eciAppositionScellesRechercheConstants';



export function request(action,callBack, navigation, successRedirection) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    ECIInitAppositionScellesApi.initApposerScelles(action.value.referenceEnregistrement, action.value.numeroVoyage)
      .then((response) => {
        if (response) {
          // console.log('response', response);
          const data = response.data;
          if (data && !data.dtoHeader.messagesErreur) {
            //console.log('data', data);
            dispatch(success(data, action.value.referenceDed));
            //vider le formulaire
            callBack();
            /** Naviguer vers la vue suivant. */
            navigation.navigate(successRedirection, {
              referenceEnregistrement: action.value.referenceEnregistrement,
              numeroVoyage: action.value.numeroVoyage,
              cle:action.value.cle,
              appositionScellesVO: data.jsonVO,
            });
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
    type: Constants.ECI_INIT_APPOSITION_SCELLES_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data, refDeclaration) {
  return {
    type: Constants.ECI_INIT_APPOSITION_SCELLES_SUCCESS,
    value: {
      data: data,
      refDeclaration: refDeclaration,
    },
  };
}

export function failed(data) {
  return {
    type: Constants.ECI_INIT_APPOSITION_SCELLES_FAILED,
    value: data,
  };
}

export function init(action) {
  return {
    type: Constants.ECI_INIT_APPOSITION_SCELLES_INIT,
    value: action.value,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
