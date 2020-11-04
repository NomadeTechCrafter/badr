/**Constants */
import * as Constants from '../../../common/constants/ecorExport/vuEmbarquer';

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
    case Constants.CONFIRMER_REQUEST:
      nextState.displayError = false;
      nextState.errorMessage = null;
      nextState.showProgress = true;
      nextState.data = [];
      return nextState;
    case Constants.CONFIRMER_IN_PROGRESS:
      return nextState;
    case Constants.CONFIRMER_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data = action.value;
      return nextState;
    case Constants.CONFIRMER_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.errorMessage = action.value;
      return nextState;
    case Constants.CONFIRMER_INIT:
      return initialState;
    default:
      nextState.showProgress = true;
      return initialState;
  }
};
