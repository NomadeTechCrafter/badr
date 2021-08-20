/**Constants */
import {
  CONFIRMATION_ENTREE_ARRIVEE_FAILED,
  CONFIRMATION_ENTREE_ARRIVEE_IN_PROGRESS,
  CONFIRMATION_ENTREE_ARRIVEE_INIT,
  CONFIRMATION_ENTREE_ARRIVEE_REQUEST,
  CONFIRMATION_ENTREE_ARRIVEE_SUCCESS,
} from '../ecorExpConfirmationEntreeArriveeConstants';

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
    case CONFIRMATION_ENTREE_ARRIVEE_REQUEST:
      nextState.displayError = false;
      nextState.errorMessage = null;
      nextState.showProgress = true;
      nextState.data = [];
      return nextState;
    case CONFIRMATION_ENTREE_ARRIVEE_IN_PROGRESS:
      return nextState;
    case CONFIRMATION_ENTREE_ARRIVEE_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data = action.value;
      return nextState;
    case CONFIRMATION_ENTREE_ARRIVEE_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.errorMessage = action.value;
      return nextState;
    case CONFIRMATION_ENTREE_ARRIVEE_INIT:
      return initialState;
    default:
      nextState.showProgress = true;
      return initialState;
  }
};
