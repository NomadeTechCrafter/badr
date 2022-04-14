import * as Constants from '../ApurementConstants';
import _ from 'lodash';
import { translate } from '../../../../../commons/i18n/ComI18nHelper';

const initialState = {
  refDum: null,
  showProgress: false,
  errorMessage: null,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.INIT_D17_DUM_SCREEN:
      return initialState;
    case Constants.RECHERCHE_D17_DUM_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      return nextState;
    case Constants.RECHERCHE_D17_DUM_IN_PROGRESS:
      return nextState;
    case Constants.RECHERCHE_D17_DUM_SUCCESS:
      nextState.showProgress = false;
      nextState.errorMessage = null;
      return nextState;
    case Constants.RECHERCHE_D17_DUM_FAILED:
      nextState.showProgress = false;
      if (!_.isEmpty(action?.value?.dtoHeader?.messagesErreur)) {
        nextState.errorMessage = action?.value?.dtoHeader?.messagesErreur;
      } else if (_.isEmpty(action?.value?.jsonVO)) {
        nextState.errorMessage = 'Aucune déclaration trouvée !!!';
      }else {
        nextState.errorMessage = translate('errors.technicalIssue');
      }
      return nextState;
    case Constants.INIT_D17_DUM_REQUEST:
      return initialState;    
    default:
      nextState.showProgress = false;
      return initialState;
  }
};
