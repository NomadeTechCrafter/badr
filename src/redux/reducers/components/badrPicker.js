import * as Constants from '../../../common/constants/badrPicker';

const initialState = {
  loaded: false,
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
    case Constants.SMSVERIFY_REQUEST:
      nextState.displayError = false;
      nextState.loaded = false;
      nextState.errorMessage = null;
      return nextState;
    case Constants.SMSVERIFY_IN_PROGRESS:
      return nextState;
    case Constants.SMSVERIFY_SUCCESS:
      nextState.displayError = false;
      nextState.loaded = true;
      nextState.errorMessage = null;
      nextState.data = action.value;
      return nextState;
    case Constants.SMSVERIFY_FAILED:
      nextState.displayError = true;
      nextState.loaded = false;
      nextState.errorMessage = null;
      return nextState;
    case Constants.SMSVERIFY_INIT:
      nextState.displayError = true;
      nextState.loaded = false;
      nextState.errorMessage = null;
      nextState.data = [];
      return initialState;
    default:
      return initialState;
  }
};
