
import * as Constants from '../autoriserAcheminementMainConstants';
import AutoriserAcheminementGestionApi from '../../service/api/autoriserAcheminementGestionApi';

/**i18n */
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';

import _ from 'lodash';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    AutoriserAcheminementGestionApi.autoriserAcheminement(
      action.value.ecorDumVO
     
    )
      .then((response) => {
        if (response) {
          console.log('response autoriser acheminement', response);
          const data = response.data;
          if (data && _.isEmpty(data.dtoHeader.messagesErreur)) {
            console.log('data', data);
            
            dispatch(success(data));
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
    type: Constants.AUTORISER_ACHEMINEMENT_UC_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.AUTORISER_ACHEMINEMENT_UC_SUCCESS,
    value: {
      data: data,
    },
  };
}

export function failed(data) {
  return {
    type: Constants.AUTORISER_ACHEMINEMENT_UC_FAILED,
    value: data,
  };
}


export default {
  request,
  success,
  failed,
  inProgress
};
