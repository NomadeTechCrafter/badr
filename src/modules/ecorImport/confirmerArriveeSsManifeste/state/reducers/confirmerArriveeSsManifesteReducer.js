/**Constants */
import {
  GENERIC_ECI_FAILED,
  GENERIC_ECI_IN_PROGRESS,
  GENERIC_ECI_INIT,
  GENERIC_ECI_REQUEST,
  GENERIC_ECI_SUCCESS,
  GENERIC_OPEN_MODAL,
  GENERIC_CLOSE_MODAL,
} from '../confirmerArriveeSsManifesteConstants';

const initialState = {
  showProgress: false,
  picker: {
    empty: {
      showProgress: false,
      loaded: false,
      data: [],
    },
  },
  showListeLotsApures: false,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case GENERIC_ECI_REQUEST:
      nextState.showProgress = true;
      nextState.picker[action.value.command] = {showProgress: true};
      return nextState;
    case GENERIC_ECI_IN_PROGRESS:
      nextState.showProgress = true;
      nextState.picker[action.value.command] = {showProgress: true};
      return nextState;
    case GENERIC_ECI_SUCCESS:
      nextState.showProgress = false;
      nextState.picker[action.value.command] = {
        data: action.value.data.jsonVO,
        errorMessage: null,
        successMessage: action.value.data.dtoHeader.messagesInfo,
        showProgress: false,
      };
      return nextState;
    case GENERIC_ECI_FAILED:
      nextState.showProgress = false;
      nextState.picker[action.value.command] = {
        errorMessage: action.value.data,
        successMessage: '',
        displayError: true,
        showProgress: false,
      };
      return nextState;
    case GENERIC_ECI_INIT:
      nextState.picker[action.value.command] = {
        data: [],
        errorMessage: '',
        successMessage: '',
        showProgress: false,
        displayError: false,
        showListeLotsApures: false,
      };
      nextState.showListeLotsApures = false;
      return nextState;
    case GENERIC_OPEN_MODAL:
      nextState.showListeLotsApures = true;
      return nextState;
    case GENERIC_CLOSE_MODAL:
      nextState.showListeLotsApures = false;
      return nextState;
    default:
      return nextState ? nextState : initialState;
  }
};
