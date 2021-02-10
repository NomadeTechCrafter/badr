import * as Constants from '../ecorImportRechercheRefDumConstants';

const initialState = {
  showProgress: false,
  errorMessage: null,
  data: null,
  refDeclaration: null,
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
      nextState.data = action.value.data.jsonVO;
      nextState.refDeclaration = action.value.refDeclaration;
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
