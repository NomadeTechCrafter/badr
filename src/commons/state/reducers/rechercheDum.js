import * as Constants from '../../constants/components/rechercheRefDum';

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
    case Constants.RECHERCHEREFDUM_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      return nextState;
    case Constants.RECHERCHEREFDUM_IN_PROGRESS:
      return nextState;
    case Constants.RECHERCHEREFDUM_SUCCESS:
      nextState.showProgress = false;
      nextState.errorMessage = null;
      return nextState;
    case Constants.RECHERCHEREFDUM_FAILED:
      nextState.showProgress = false;
      nextState.errorMessage = action.value.dtoHeader
        ? action.value.dtoHeader.messagesErreur
        : action.value;
      return nextState;
    case Constants.RECHERCHEREFDUM_INIT:
      return initialState;
    default:
      return initialState;
  }
};
