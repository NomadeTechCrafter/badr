/**Constants */
import * as Constants from '../atConstants';
import _ from 'lodash';
/** Inmemory session */
import {ComSessionService} from '../../../../../commons/services/session/ComSessionService';
/** i18n */
import {translate} from '../../../../../commons/i18n/ComI18nHelper';

const initialState = {
  showProgress: false,
  errorMessage: '',
  displayError: false,
  data: [],
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.CONSULTER_AT_REQUEST:
      nextState.displayError = false;
      nextState.messageInfo = null;
      nextState.errorMessage = null;
      nextState.data = [];
      if (nextState.successMessage) {
        delete nextState.successMessage;
      }
      return nextState;
    case Constants.CONSULTER_AT_IN_PROGRESS:
      nextState.showProgress = true;
      return nextState;
    case Constants.CONSULTER_AT_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data = action.value.jsonVO;
      return nextState;
    case Constants.CONSULTER_AT_FAILED:
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
    case Constants.CONSULTER_AT_INIT:
      return initialState;
    case Constants.CONSULTER_AT_CLEAR_MSG:
      if (nextState.successMessage) {
        delete nextState.successMessage;
      }
      return nextState;
    default:
      if (nextState.successMessage) {
        delete nextState.successMessage;
      }
      nextState.showProgress = false;
      return nextState.data ? nextState : initialState;
  }
};
