import * as Constants from '../../../common/constants/controle/regimeInterne';

const initialState = {
  refDum: null,
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
    case Constants.REGIMEINTERNE_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      console.log('--> initControle request...');
      return nextState;
    case Constants.REGIMEINTERNE_IN_PROGRESS:
      console.log('--> initControle in progress...');
      return nextState;
    case Constants.REGIMEINTERNE_SUCCESS:
      console.log('--> initControle success...');
      nextState.showProgress = false;
      nextState.errorMessage = null;
      nextState.loggedIn = true;
      nextState.user = action.value;
      return nextState;
    case Constants.REGIMEINTERNE_FAILED:
      console.log('--> initControle failed...');
      nextState.showProgress = false;
      nextState.loggedIn = false;
      nextState.errorMessage = action.value.messagesRetour ? JSON.stringify(action.value.messagesRetour[0]) : action.value;
      return nextState;
    case Constants.REGIMEINTERNE_INIT:
      return initialState;
    default:
      nextState.showProgress = false;
      return initialState;
  }
};
