/**Constants */
import * as Constants from '../DedRedressementConstants';
/** i18n */
import {translate} from '../../../../../commons/i18n/ComI18nHelper';

const initialState = {
  showProgress: false,
  errorMessage: '',
  dedDumMotifIInputVO: { motif:''},
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.ENREGISTRER_REDRESSEMENT_REQUEST:
      nextState.showProgress = true;
      nextState.displayError = false;
      nextState.messageInfo = null;
      nextState.errorMessage = null;
      nextState.data = {};
      return nextState;
    case Constants.ENREGISTRER_REDRESSEMENT_IN_PROGRESS:
      nextState.showProgress = true;
      return nextState;
    case Constants.ENREGISTRER_REDRESSEMENT_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data = action.value.jsonVO;
      return nextState;
    case Constants.ENREGISTRER_REDRESSEMENT_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      if (action.value.dtoHeader) {
        nextState.errorMessage = action.value.dtoHeader.messagesErreur
          ? action.value.dtoHeader.messagesErreur
          : action.value;
      } else {
        nextState.errorMessage = translate('errors.technicalIssue');
      }
      return nextState;
    case Constants.ENREGISTRER_REDRESSEMENT_INIT:
      console.log('ENREGISTRER_REDRESSEMENT_INIT action : ', action);
      nextState.dedDumMotifIInputVO= { motif: '' };
      return nextState;
    case Constants.ENREGISTRER_REDRESSEMENT_UPDATE:
      console.log('ENREGISTRER_REDRESSEMENT_UPDATE action : ', action);
      nextState.dedDumMotifIInputVO = action.data;
      return nextState;
    default:
      if (nextState.successMessage) {
        delete nextState.successMessage;
      }
      nextState.showProgress = false;
      return nextState.data ? nextState : initialState;
  }
};
