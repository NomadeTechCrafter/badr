
import * as Constants from '../rechercheAutoriserAcheminementConstants';
import RechercheAutoriserAcheminementApi from '../../service/api/rechercheAutoriserAcheminementApi';

/**i18n */
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';

import _ from 'lodash';

export function request(action, navigation) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    RechercheAutoriserAcheminementApi.initAutoriserAcheminement(
      action.value.dumVO
     
    )
      .then((response) => {
        if (response) {
          console.log('response action confirmationentre', response);
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
    type: Constants.INIT_AUTORISER_ACHEMINEMENT_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.INIT_AUTORISER_ACHEMINEMENT_SUCCESS,
    value: {
      data: data,
    },
  };
}

export function failed(data) {
  return {
    type: Constants.INIT_AUTORISER_ACHEMINEMENT_FAILED,
    value: data,
  };
}


export default {
  request,
  success,
  failed,
  inProgress
};
