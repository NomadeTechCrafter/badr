/**Constants */
import * as Constants from '../mlvDelivrerConstants';
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
    case Constants.DELIVRERMLV_VALIDERMLV_REQUEST:
      nextState.displayError = false;
      nextState.errorMessage = null;
      nextState.showProgress = true;
      nextState.data = [];
      return nextState;
    case Constants.DELIVRERMLV_VALIDERMLV_IN_PROGRESS:
      return nextState;
    case Constants.DELIVRERMLV_VALIDERMLV_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data = action.value;
      return nextState;
    case Constants.DELIVRERMLV_VALIDERMLV_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.errorMessage = action.value;
      return nextState;
    case Constants.DELIVRERMLV_VALIDERMLV_INIT:
      return initialState;
    default:
      nextState.showProgress = true;
      return initialState;
  }
};
