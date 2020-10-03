/**Constants */
import * as Constants from '../../constants/generic/GenericConstants';

const initialState = {
  picker: {},
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.GENERIC_REF_REQUEST:
      return nextState;
    case Constants.GENERIC_REF_IN_PROGRESS:
      nextState.picker[action.value.command] = {};
      return nextState;
    case Constants.GENERIC_REF_SUCCESS:
      nextState.picker[action.value.command] = {
        data: action.value.data,
        errorMessage: null,
        showProgress: false,
      };
      return nextState;
    case Constants.GENERIC_REF_FAILED:
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
