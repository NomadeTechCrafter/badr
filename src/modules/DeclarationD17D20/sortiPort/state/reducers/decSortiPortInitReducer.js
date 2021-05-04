import * as Constants from '../decSortiPortConstants';

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
    case Constants.RECHERCHE_D17_DUM_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      return nextState;
    case Constants.RECHERCHE_D17_DUM_IN_PROGRESS:
      return nextState;
    case Constants.RECHERCHE_D17_DUM_SUCCESS:
      nextState.showProgress = false;
      nextState.errorMessage = null;
      return nextState;
    case Constants.RECHERCHE_D17_DUM_FAILED:
      nextState.showProgress = false;
      nextState.errorMessage = action.value.dtoHeader.messagesErreur;
      return nextState;
    case Constants.INIT_D17_DUM_REQUEST:
      return initialState;
    default:
      nextState.showProgress = false;
      return initialState;
  }
};
