/**Constants */
import * as Constants from '../../common/constants/hab/confirmConnexion';

const initialState = {
  confirmed: false,
  showProgressConfirmCnx: false,
  displayError: false,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.CONFIRMCNX_REQUEST:
      nextState.displayError = false;
      nextState.correct = false;
      nextState.showProgressConfirmCnx = true;
      return nextState;
    case Constants.CONFIRMCNX_IN_PROGRESS:
      return nextState;
    case Constants.CONFIRMCNX_SUCCESS:
      nextState.showProgressConfirmCnx = false;
      nextState.confirmed = true;
      return nextState;
    case Constants.CONFIRMCNX_FAILED:
      nextState.showProgressConfirmCnx = false;
      nextState.cofirmed = false;
      nextState.displayError = true;
      nextState.errorMessage = action.value;
      return nextState;
    case Constants.CONFIRMCNX_INIT:
      return initialState;
    default:
      nextState.showProgressConfirmCnx = false;
      return initialState;
  }
};
