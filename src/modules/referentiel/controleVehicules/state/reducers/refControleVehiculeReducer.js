/**Constants */
import {
  CONTROLE_VEHICULE_FAILED,
  CONTROLE_VEHICULE_IN_PROGRESS,
  CONTROLE_VEHICULE_INIT,
  CONTROLE_VEHICULE_REQUEST,
  CONTROLE_VEHICULE_SUCCESS,
} from '../refControleVehiculeConstants';

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
    case CONTROLE_VEHICULE_REQUEST:
      nextState.displayError = false;
      nextState.errorMessage = null;
      nextState.showProgress = true;
      nextState.data = [];
      return nextState;
    case CONTROLE_VEHICULE_IN_PROGRESS:
      return nextState;
    case CONTROLE_VEHICULE_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data = action.value;
      return nextState;
    case CONTROLE_VEHICULE_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.errorMessage = action.value;
      return nextState;
    case CONTROLE_VEHICULE_INIT:
      return initialState;
    default:
      nextState.showProgress = true;
      return initialState;
  }
};
