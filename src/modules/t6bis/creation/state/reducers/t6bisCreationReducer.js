
/**Constants */
import * as Constants from '../t6bisCreationConstants';

const initialState = {
  confirmed: false,
  showProgress: false,
  displayError: false
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.CREATION_T6BIS_ALL_TYPE_REQUEST:
      console.log(Constants.CREATION_T6BIS_ALL_TYPE_REQUEST)
      nextState.displayError = false;
      nextState.correct = false;
      nextState.showProgress = true;
      return nextState;
    case Constants.CREATION_T6BIS_ALL_TYPE_IN_PROGRESS:
      return nextState;
    case Constants.CREATION_T6BIS_ALL_TYPE_SUCCES:
      console.log('reducer');
      nextState.showProgress = false;
      nextState.confirmed = true;
      console.log('action.value',action.value);
     // items = action.value;
      return nextState;
    case Constants.CREATION_T6BIS_ALL_TYPE_FAILED:
      nextState.showProgress = false;
      nextState.cofirmed = false;
      nextState.displayError = true;
      nextState.errorMessage = action.value;
      return nextState;
    default:
      console.log('action.type', action.type);
      console.log('initialState', initialState);
      nextState.showProgress = false;
      return initialState;
  }
};