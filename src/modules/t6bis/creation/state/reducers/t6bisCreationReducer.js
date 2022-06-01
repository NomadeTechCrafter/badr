/**Constants */
import {mapErrorsCreation} from '../../../utils/t6bisUtils';
import * as Constants from '../t6bisCreationConstants';

const initialState = {
  confirmed: false,
  showProgress: false,
  displayError: false,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.CREATION_T6BIS_ALL_TYPE_REQUEST:
      console.log(Constants.CREATION_T6BIS_ALL_TYPE_REQUEST);
      nextState.displayError = false;
      nextState.correct = false;
      nextState.showProgress = true;
      return nextState;
    case Constants.CREATION_T6BIS_ALL_TYPE_IN_PROGRESS:
      return nextState;
    case Constants.CREATION_T6BIS_ALL_TYPE_SUCCES:

      nextState.showProgress = false;
      nextState.confirmed = true;
      nextState.types = action.value;
      console.log('action.value', action.value);
      // items = action.value;
      return nextState;
    case Constants.CREATION_T6BIS_ALL_TYPE_FAILED:
      nextState.showProgress = false;
      nextState.cofirmed = false;
      nextState.displayError = true;
      nextState.errorMessage = action.value;
      return nextState;
    case Constants.T6BIS_INIT_FOR_CREATION_REQUEST:
      console.log(Constants.T6BIS_INIT_FOR_CREATION_REQUEST);
      nextState.displayError = false;
      nextState.correct = false;
      nextState.showProgress = true;
      return nextState;
    case Constants.T6BIS_INIT_FOR_CREATION_IN_PROGRESS:
      return nextState;
    case Constants.T6BIS_INIT_FOR_CREATION_SUCCES:
      nextState.showProgress = false;
      nextState.confirmed = true;
      console.log('action.value', action.value);
      // items = action.value;
      return nextState;
    case Constants.T6BIS_INIT_FOR_CREATION_FAILED:
      console.log(Constants.T6BIS_INIT_FOR_CREATION_FAILED);
      console.log(nextState);
      nextState.showProgress = false;
      nextState.cofirmed = false;
      nextState.displayError = true;
      console.log(typeof action.value);
      nextState.errorMessage = mapErrorsCreation(action.value);
      return nextState;
    default:
      nextState.showProgress = false;
      return initialState;
  }
};
