/**Constants */
import * as Constants from '../../../common/constants/at/at';

const initialState = {
  showProgress: false,
  errorMessage: '',
  displayError: false,
  data: {},
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.INIT_APUR_REQUEST:
      nextState.displayError = false;
      nextState.errorMessage = null;
      nextState.data = {};
      return nextState;
    case Constants.INIT_APUR_IN_PROGRESS:
      nextState.showProgress = true;
      return nextState;
    case Constants.INIT_APUR_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data = action.value.jsonVO;
      return nextState;
    case Constants.INIT_APUR_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.data = {};
      nextState.errorMessage = action.value.dtoHeader.messagesErreur
        ? action.value.dtoHeader.messagesErreur
        : action.value;
      return nextState;
    case Constants.INIT_APUR_INIT:
      return initialState;
    default:
      nextState.showProgress = true;
      return initialState;
  }
};
