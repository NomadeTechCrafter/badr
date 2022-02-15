/**Constants */
import {
  GENERIC_LIQ_FAILED,
  GENERIC_LIQ_IN_PROGRESS,
  GENERIC_LIQ_INIT,
  GENERIC_LIQ_REQUEST,
  GENERIC_LIQ_SUCCESS,
} from '../liquidationConstants';

const initialState = {
  showProgress: false,
  repData: {
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
    case GENERIC_LIQ_REQUEST:
      nextState.showProgress = true;
      nextState.repData[action.value.command] = {showProgress: true};
      return nextState;
    case GENERIC_LIQ_IN_PROGRESS:
      nextState.showProgress = true;
      nextState.repData[action.value.command] = {showProgress: true};
      return nextState;
    case GENERIC_LIQ_SUCCESS:
      nextState.showProgress = false;
      nextState.repData[action.value.command] = {
        data: action.value.data,
        errorMessage: null,
        showProgress: false,
      };
      return nextState;
    case GENERIC_LIQ_FAILED:
      nextState.showProgress = false;
      nextState.repData[action.value.command] = {
        errorMessage: action.value.data,
        displayError: true,
        showProgress: false,
      };
      return nextState;
    case GENERIC_LIQ_INIT:
      nextState.repData[action.value.command] = {
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
