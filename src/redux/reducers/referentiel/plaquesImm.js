/**Constants */
import * as Constants from '../../../common/constants/referentiel/plaquesImm';

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
    case Constants.PLAQUES_IMM_REQUEST:
      nextState.displayError = false;
      nextState.errorMessage = null;
      nextState.showProgress = true;
      nextState.data = [];
      return nextState;
    case Constants.PLAQUES_IMM_IN_PROGRESS:
      return nextState;
    case Constants.PLAQUES_IMM_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data = action.value;
      return nextState;
    case Constants.PLAQUES_IMM_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.errorMessage = action.value;
      return nextState;
    case Constants.PLAQUES_IMM_INIT:
      return initialState;
    default:
      nextState.showProgress = true;
      return initialState;
  }
};
