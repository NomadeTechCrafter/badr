import * as Constants from '../../../common/constants/mainLevee/rechercheMLV';

const initialState = {
  refDum: null,
  showProgress: false,
  errorMessage: null,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.MAINLEVEE_RECHERCHEDECLARATION_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      return nextState;
    case Constants.MAINLEVEE_RECHERCHEDECLARATION_IN_PROGRESS:
      return nextState;
    case Constants.MAINLEVEE_RECHERCHEDECLARATION_SUCCESS:
      nextState.showProgress = false;
      nextState.errorMessage = null;
      return nextState;
    case Constants.MAINLEVEE_RECHERCHEDECLARATION_FAILED:
      nextState.showProgress = false;
      nextState.errorMessage = action.value.dtoHeader
        ? action.value.dtoHeader.messagesErreur
        : action.value;
      return nextState;
    case Constants.MAINLEVEE_RECHERCHEDECLARATION_INIT:
      return initialState;
    default:
      nextState.showProgress = false;
      return initialState;
  }
};
