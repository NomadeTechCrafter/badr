/**Constants */
import * as Constants from '../../constants/generic/ComGenericConstants';

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
      nextState.data = action.value.data;
      nextState.searchData = action.value.searchParams;
      return nextState;
    case Constants.GENERIC_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.errorMessage = action.value.data;
      return nextState;
    case Constants.GENERIC_REFRESH:
      nextState.refresh = true;
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
