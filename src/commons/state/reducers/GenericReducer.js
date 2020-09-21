/**Constants */
import * as Constants from '../../constants/generic/GenericConstants';

const initialState = {
  refresh: false,
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
    case Constants.GENERIC_REQUEST:
      nextState.refresh = false;
      nextState.displayError = false;
      nextState.errorMessage = null;
      nextState.showProgress = true;
      nextState.data = [];
      return nextState;
    case Constants.GENERIC_IN_PROGRESS:
      return nextState;
    case Constants.GENERIC_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data = action.value;
      return nextState;
    case Constants.GENERIC_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.errorMessage = action.value;
      return nextState;
    case Constants.GENERIC_REFRESH:
      nextState.refresh = true;
      return nextState;
    case Constants.GENERIC_CATCH_API:
      nextState.refresh = true;
      nextState.data = action.value;
      return nextState;
    case Constants.GENERIC_INIT_REFRESH:
      nextState.refresh = false;
      return nextState;
    case Constants.GENERIC_INIT:
      return initialState;
    default:
      return nextState ? nextState : initialState;
  }
};
