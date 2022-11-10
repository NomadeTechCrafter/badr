/**Constants */
import {
  CO_CONSULTATION_FAILED,
  CO_CONSULTATION_IN_PROGRESS,
  CO_CONSULTATION_INIT,
  CO_CONSULTATION_REQUEST,
  CO_CONSULTATION_SUCCESS,
} from '../coConstants';

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
    case CO_CONSULTATION_REQUEST:
      nextState.displayError = false;
      nextState.errorMessage = null;
      nextState.showProgress = true;
      nextState.data = [];
      return nextState;
    case CO_CONSULTATION_IN_PROGRESS:
      return nextState;
    case CO_CONSULTATION_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data = action.value;
      return nextState;
    case CO_CONSULTATION_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.errorMessage = action.value;
      return nextState;
    case CO_CONSULTATION_INIT:
      return initialState;
    default:
      nextState.showProgress = true;
      return initialState;
  }
};
