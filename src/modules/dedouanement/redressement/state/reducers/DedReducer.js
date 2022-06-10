/**Constants */
import {
  GENERIC_DED_FAILED,
  GENERIC_DED_IN_PROGRESS,
  GENERIC_DED_INIT,
  GENERIC_DED_REQUEST,
  GENERIC_DED_SUCCESS,
  VALIDER_COMPTE_RED_FAILED,
  VALIDER_COMPTE_RED_IN_PROGRESS, VALIDER_COMPTE_RED_INIT,
  VALIDER_COMPTE_RED_REQUEST,
  VALIDER_COMPTE_RED_SUCCESS,
} from '../DedRedressementConstants';

const initialState = {
  showProgress: false,
  picker: {
    empty: {
      showProgress: false,
      loaded: false,
      data: [],
    },
  },
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case GENERIC_DED_REQUEST:
      nextState.showProgress = true;
      nextState.picker[action.value.command] = {showProgress: true};
      return nextState;
    case GENERIC_DED_IN_PROGRESS:
      nextState.showProgress = true;
      nextState.picker[action.value.command] = {showProgress: true};
      return nextState;
    case GENERIC_DED_SUCCESS:
      nextState.showProgress = false;
      nextState.picker[action.value.command] = {
        data: action.value.data,
        errorMessage: null,
        showProgress: false,
      };
      return nextState;
    case GENERIC_DED_FAILED:
      nextState.showProgress = false;
      nextState.picker[action.value.command] = {
        errorMessage: action.value.data,
        displayError: true,
        showProgress: false,
      };
      return nextState;
    case GENERIC_DED_INIT:
      nextState.picker[action.value.command] = {
        data: [],
        errorMessage: {},
        showProgress: false,
        displayError: false,
      };
      return nextState;
    case VALIDER_COMPTE_RED_REQUEST:
      nextState.showProgress = true;
      nextState.picker[action.value.command] = {showProgress: true};
      return nextState;
    case VALIDER_COMPTE_RED_IN_PROGRESS:
      nextState.showProgress = true;
      nextState.picker[action.value.command] = {showProgress: true};
      return nextState;
    case VALIDER_COMPTE_RED_SUCCESS:
      console.log('data reducer',action.value.data)
      nextState.showProgress = false;
      nextState.picker[action.value.command] = {
        data: action.value.data,
        errorMessage: null,
        showProgress: false,
      };
      return nextState;
    case VALIDER_COMPTE_RED_FAILED:
      nextState.showProgress = false;
      nextState.picker[action.value.command] = {
        errorMessage: action.value.data,
        displayError: true,
        showProgress: false,
      };
      return nextState;
    case VALIDER_COMPTE_RED_INIT:
      nextState.picker[action.value.command] = {
        data: [],
        errorMessage: {},
        showProgress: false,
        displayError: false,
      };
      return nextState;
    default:
      return nextState ? nextState : initialState;
  }
};
