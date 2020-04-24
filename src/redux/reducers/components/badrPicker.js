import * as Constants from '../../../common/constants/badrPicker';

const initialState = {
  loaded: false,
  errorMessage: '',
  displayError: false,
  picker: null,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.BADRPICKER_REQUEST:
      nextState.displayError = false;
      nextState.loaded = false;
      nextState.errorMessage = null;
      return nextState;
    case Constants.BADRPICKER_IN_PROGRESS:
      return nextState;
    case Constants.BADRPICKER_SUCCESS:
      nextState.displayError = false;
      nextState.loaded = true;
      nextState.errorMessage = null;
      if (!nextState.picker) {
        nextState.picker = {};
      }
      nextState.picker[action.value.command] = {};
      nextState.picker[action.value.command].items = action.value.payload;
      return nextState;
    case Constants.BADRPICKER_FAILED:
      nextState.displayError = true;
      nextState.loaded = false;
      nextState.errorMessage = null;
      return nextState;
    case Constants.BADRPICKER_INIT:
      nextState.displayError = true;
      nextState.loaded = false;
      nextState.errorMessage = null;
      nextState.items = [];
      return initialState;
    default:
      return initialState;
  }
};
