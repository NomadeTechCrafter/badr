/**Constants */
import * as Constants from '../habMainMenuConstants';
/** Utils */
import habMainMenuUtils from '../../utils/habMainMenuUtils';

const initialState = {
  menuList: [],
  level: 1,
  showProgress: false,
  displayError: false,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.MENU_REQUEST:
      nextState.displayError = false;
      nextState.showProgress = true;
      return nextState;
    case Constants.MENU_IN_PROGRESS:
      return nextState;
    case Constants.MENU_SUCCESS:
      nextState.showProgress = false;
      var collection = action.value.payload;
      nextState.menuList = habMainMenuUtils.unflatten(collection);
      return nextState;
    case Constants.MENU_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.errorMessage = action.value;
      return nextState;
    case Constants.MENU_INIT:
      return state;
    default:
      nextState.showProgress = false;
      return state;
  }
};
