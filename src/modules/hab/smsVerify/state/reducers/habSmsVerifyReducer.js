/**Constants */
import * as Constants from '../habSmsVerifyConstants';

const initialState = {
  correct: false,
  showProgress: false,
  errorMessage: '',
  code: null,
  displayError: false,
  infoMessage: null,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.SMSVERIFY_REQUEST:
      nextState.displayError = false;
      nextState.correct = false;
      nextState.errorMessage = null;
      nextState.infoMessage = null;
      nextState.code = null;
      nextState.showProgress = true;
      return nextState;
    case Constants.SMSVERIFY_IN_PROGRESS:
      return nextState;
    case Constants.SMSVERIFY_SUCCESS:
      nextState.errorMessage = null;
      nextState.infoMessage = null;
      nextState.correct = true;
      nextState.code = action.value.code;
      nextState.showProgress = false;
      return nextState;
    case Constants.SMSVERIFY_FAILED:
      nextState.showProgress = false;
      nextState.correct = false;
      nextState.displayError = true;
      nextState.infoMessage = null;
      nextState.errorMessage = action.value;
      return nextState;
    case Constants.SMSVERIFY_INIT:
      nextState.showProgress = false;
      return initialState;
    case Constants.GENERERCODESMS_REQUEST:
      nextState.displayError = false;
      nextState.correct = false;
      nextState.errorMessage = null;
      nextState.infoMessage = null;
      nextState.showProgress = true;
      return nextState;
    case Constants.GENERERCODESMS_IN_PROGRESS:
      nextState.showProgress = true;
      return nextState;
    case Constants.GENERERCODESMS_SUCCESS:
      nextState.displayError = false;
      nextState.errorMessage = null;
      nextState.correct = true;
      nextState.infoMessage = action.value;
      nextState.showProgress = false;
      return nextState;
    case Constants.GENERERCODESMS_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.correct = false;
      nextState.errorMessage = action.value;
      nextState.infoMessage = null;
      return nextState;
    default:
      nextState.showProgress = true;
      return initialState;
  }
};
