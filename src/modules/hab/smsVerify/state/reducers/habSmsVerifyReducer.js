/**Constants */
import * as Constants from '../habSmsVerifyConstants';

const initialState = {
  correct: false,
  showProgress: false,
  errorMessage: '',
  code: null,
  displayError: false,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.SMSVERIFY_REQUEST:
      console.log('request...');
      nextState.displayError = false;
      nextState.correct = false;
      nextState.errorMessage = null;
      nextState.code = null;
      nextState.showProgress = true;
      return nextState;
    case Constants.SMSVERIFY_IN_PROGRESS:
      return nextState;
    case Constants.SMSVERIFY_SUCCESS:
      nextState.errorMessage = null;
      nextState.correct = true;
      nextState.code = action.value.code;
      nextState.showProgress = false;
      return nextState;
    case Constants.SMSVERIFY_FAILED:
      console.log(action);
      nextState.showProgress = false;
      nextState.correct = false;
      nextState.displayError = true;
      nextState.errorMessage = action.value;
      return nextState;
    case Constants.SMSVERIFY_INIT:
      nextState.showProgress = false;
      return initialState;
    default:
      nextState.showProgress = true;
      return initialState;
  }
};
