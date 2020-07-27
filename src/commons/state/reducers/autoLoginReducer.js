import * as Constants from '../../constants/components/autoLogin';

const initialState = {
  showProgress: false,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.AUTOLOGIN_REQUEST:
      nextState.showProgress = true;
      return nextState;
    case Constants.AUTOLOGIN_IN_PROGRESS:
      nextState.showProgress = true;
      return nextState;
    case Constants.AUTOLOGIN_SUCCESS:
      nextState.showProgress = false;
      return nextState;
    case Constants.AUTOLOGIN_FAILED:
      return nextState;
    default:
      return initialState;
  }
};
