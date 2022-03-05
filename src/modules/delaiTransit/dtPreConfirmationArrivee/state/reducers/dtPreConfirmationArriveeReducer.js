import {
  INIT_PRE_CONFIRMATION_ARRIVEE_FAILED,
  INIT_PRE_CONFIRMATION_ARRIVEE_IN_PROGRESS,
  INIT_PRE_CONFIRMATION_ARRIVEE_INIT,
  INIT_PRE_CONFIRMATION_ARRIVEE_REQUEST,
  INIT_PRE_CONFIRMATION_ARRIVEE_SUCCESS,
} from '../dtPreConfirmationArriveeConstants';

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
    case INIT_PRE_CONFIRMATION_ARRIVEE_REQUEST:
      nextState.displayError = false;
      nextState.errorMessage = null;
      nextState.showProgress = true;
      nextState.data = [];
      return nextState;
    case INIT_PRE_CONFIRMATION_ARRIVEE_IN_PROGRESS:
      return nextState;
    case INIT_PRE_CONFIRMATION_ARRIVEE_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data = action.value;
      return nextState;
    case INIT_PRE_CONFIRMATION_ARRIVEE_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.data = action.value;
      return nextState;
    case INIT_PRE_CONFIRMATION_ARRIVEE_INIT:
      return initialState;
    default:
      nextState.showProgress = true;
      return initialState;
  }
};