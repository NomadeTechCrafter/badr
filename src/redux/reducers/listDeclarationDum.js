import * as Constants from '../../common/constants/listDeclarationDum';

const initialState = {
  dataDeclaration: null,
  showProgress: false,
  errorMessage: null,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.LISTDECLARATION_REQUEST:
      nextState.errorMessage = null;
      nextState.showProgress = true;
      return nextState;
    case Constants.LISTDECLARATION_IN_PROGRESS:
      return nextState;
    case Constants.LISTDECLARATION_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.dataDeclaration = action.value;
      return nextState;
    case Constants.LISTDECLARATION_FAILED:
      nextState.showProgress = false;
      nextState.errorMessage = action.value;
      return nextState;
    case Constants.LISTDECLARATION_INIT:
      nextState.showProgress = false;
      return initialState;
    default:
      nextState.showProgress = true;
      return initialState;
  }
};
