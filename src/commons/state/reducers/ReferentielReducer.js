/**Constants */
import * as Constants from '../../constants/generic/ComGenericConstants';

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
    case Constants.GENERIC_REF_REQUEST:
      nextState.showProgress = true;
      nextState.picker[action.value.command] = {showProgress: true};
      return nextState;
    case Constants.GENERIC_REF_IN_PROGRESS:
      nextState.showProgress = true;
      nextState.picker[action.value.command] = {showProgress: true};
      return nextState;
    case Constants.GENERIC_REF_SUCCESS:
      nextState.showProgress = false;
      nextState.picker[action.value.command] = {
        data: action.value.data,
        errorMessage: null,
        showProgress: false,
      };
      return nextState;
    case Constants.GENERIC_REF_FAILED:
      nextState.showProgress = false;
      nextState.picker[action.value.command] = {
        data: [],
        errorMessage: action.value.data,
        displayError: true,
        showProgress: false,
      };
      return nextState;
    case Constants.GENERIC_REF_INIT:
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
