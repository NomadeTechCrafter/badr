/** Constants */
import * as Constants from '../habLoginConstants';

const initialState = {
  user: null,
  loggedIn: false,
  showProgress: false,
  errorMessage: null,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.AUTH_LOGIN_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      return nextState;
    case Constants.AUTH_LOGIN_IN_PROGRESS:
      return nextState;
    case Constants.AUTH_LOGIN_SUCCESS:
      nextState.showProgress = false;
      nextState.errorMessage = null;
      nextState.loggedIn = true;
      nextState.user = action.value;
      return nextState;
    case Constants.AUTH_LOGIN_FAILED:
      nextState.showProgress = false;
      nextState.loggedIn = false;
      if (action.value.messagesRetour) {
        nextState.errorMessage = action.value.messagesRetour
          ? JSON.stringify(action.value.messagesRetour[0])
          : action.value;
      } else if (action.value.statutConnexion === '2') {
        /** pour afficher msg de confirmation de connx. */
        nextState.errorMessage = '2';
      } else {
        nextState.errorMessage = action.value;
      }
      return nextState;
    case Constants.AUTH_LOGOUT_REQUEST:
      nextState.errorMessage = null;
      return nextState;
    case Constants.AUTH_LOGOUT_IN_PROGRESS:
      nextState.showProgress = true;
      return nextState;
    case Constants.AUTH_LOGOUT_SUCCESS:
      nextState.showProgress = false;
      nextState.loggedIn = false;
      return initialState;
    case Constants.AUTH_LOGOUT_FAILED:
      nextState.showProgress = false;
      nextState.loggedIn = true;
      return nextState;
    case Constants.LOGIN_INIT:
      return initialState;
    default:
      nextState.showProgress = false;
      return initialState;
  }
};
