/**Constants */
import * as Constants from '../habOperatConstants';

const initialState = {
  confirmed: false,
  showProgress: false,
  displayError: false,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.CONFIRMCNX_DECLARANT_REQUEST:
  
      nextState.displayError = false;
      nextState.correct = false;
      nextState.showProgress = true;
      return nextState;
    case Constants.CONFIRMCNX_DECLARANT_IN_PROGRESS:
      return nextState;
    case Constants.CONFIRMCNX_DECLARANT_SUCCESS:
   
      nextState.showProgress = false;
      nextState.confirmed = true;
      return nextState;
    case Constants.CONFIRMCNX_DECLARANT_FAILED:
      nextState.showProgress = false;
      nextState.cofirmed = false;
      nextState.displayError = true;
      nextState.errorMessage = action.value;
      return nextState;
    case Constants.CONFIRMCNX_DECLARANT_INIT:
      return initialState;
    default:
      nextState.showProgress = false;
      return initialState;
  }
};
