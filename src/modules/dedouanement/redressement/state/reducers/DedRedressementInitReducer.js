/**Constants */
import * as Constants from '../DedRedressementConstants';
/** i18n */
import {translate} from '../../../../../commons/i18n/I18nHelper';

const initialState = {
  showProgress: false,
  errorMessage: '',
  displayError: false,
  data: {},
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.INIT_CONSULTATION_DUM_REQUEST:
      nextState.displayError = false;
      nextState.messageInfo = null;
      nextState.errorMessage = null;
      nextState.data = {};
      return nextState;
    case Constants.INIT_CONSULTATION_DUM_IN_PROGRESS:
      nextState.showProgress = true;
      return nextState;
    case Constants.INIT_CONSULTATION_DUM_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data = action.value.jsonVO;
      return nextState;
    case Constants.INIT_CONSULTATION_DUM_FAILED:
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
    case Constants.INIT_CONSULTATION_DUM_INIT:
      return initialState;
    default:
      if (nextState.successMessage) {
        delete nextState.successMessage;
      }
      nextState.showProgress = false;
      return nextState.data ? nextState : initialState;
  }
};
