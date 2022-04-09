import {
  INIT_JUSTIF_RETARD_TRANSIT_FAILED,
  INIT_JUSTIF_RETARD_TRANSIT_IN_PROGRESS,
  INIT_JUSTIF_RETARD_TRANSIT_INIT,
  INIT_JUSTIF_RETARD_TRANSIT_REQUEST,
  INIT_JUSTIF_RETARD_TRANSIT_SUCCESS,
  JUSTIF_RETARD_TRANSIT_FAILED,
  JUSTIF_RETARD_TRANSIT_IN_PROGRESS,
  JUSTIF_RETARD_TRANSIT_INIT,
  JUSTIF_RETARD_TRANSIT_REQUEST,
  JUSTIF_RETARD_TRANSIT_SUCCESS,
} from '../dtJustifRetardTransitConstants';

const initialState = {
  showProgress: false,
  errorMessage: '',
  displayError: false,
  data: [],
  initSucces: false,
  confirmerSucces: false,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case INIT_JUSTIF_RETARD_TRANSIT_REQUEST:
      nextState.displayError = false;
      nextState.errorMessage = null;
      nextState.showProgress = true;
      nextState.data = [];
      return nextState;
    case INIT_JUSTIF_RETARD_TRANSIT_IN_PROGRESS:
      return nextState;
    case INIT_JUSTIF_RETARD_TRANSIT_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.initSucces = true;
      nextState.data = action.value;
      return nextState;
    case INIT_JUSTIF_RETARD_TRANSIT_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.data = action.value;
      return nextState;
    case INIT_JUSTIF_RETARD_TRANSIT_INIT:
      return initialState;    

    case JUSTIF_RETARD_TRANSIT_REQUEST:
      nextState.displayError = false;
      nextState.errorMessage = null;
      nextState.showProgress = true;
      nextState.data = [];
      return nextState;
    case JUSTIF_RETARD_TRANSIT_IN_PROGRESS:
      return nextState;
    case JUSTIF_RETARD_TRANSIT_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.confirmerSucces = true;
      nextState.data = action.value;
      return nextState;
    case JUSTIF_RETARD_TRANSIT_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.data = action.value;
      return nextState;
    case JUSTIF_RETARD_TRANSIT_INIT:
      return initialState;
    
    default:
      nextState.showProgress = true;
      return initialState;
  }
};