import * as Constants from '../controleRechercheDumConstants';

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
    case Constants.RECHERCHEDUM_LISTDECLARATION_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      return nextState;
    case Constants.RECHERCHEDUM_LISTDECLARATION_IN_PROGRESS:
      return nextState;
    case Constants.RECHERCHEDUM_LISTDECLARATION_SUCCESS:
      nextState.showProgress = false;
      nextState.errorMessage = null;
      return nextState;
    case Constants.RECHERCHEDUM_LISTDECLARATION_FAILED:
      nextState.showProgress = false;
      nextState.errorMessage = action.value.dtoHeader.messagesErreur;
      return nextState;
    case Constants.RECHERCHEDUM_LISTDECLARATION_INIT:
      return initialState;
    default:
      nextState.showProgress = false;
      return initialState;
  }
};
