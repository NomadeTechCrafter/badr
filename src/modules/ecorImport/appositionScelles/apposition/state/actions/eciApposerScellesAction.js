/**i18n */
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import EciApposerScellesApi from '../../service/api/eciApposerScellesApi';
import * as Constants from '../eciAppositionScellesConstants';



export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    EciApposerScellesApi.apposerScelles(action.value.appositionScellesVO)
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
    type: Constants.ECI_APPOSER_SCELLES_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.ECI_APPOSER_SCELLES_SUCCESS,
    value: {
      data: data
    },
  };
}

export function failed(data) {
  return {
    type: Constants.ECI_APPOSER_SCELLES_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
