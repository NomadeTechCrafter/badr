import * as Constants from '../eciAppositionScellesRechercheConstants';

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
    case Constants.ECI_INIT_APPOSITION_SCELLES_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      return nextState;
    case Constants.ECI_INIT_APPOSITION_SCELLES_IN_PROGRESS:
      return nextState;
    case Constants.ECI_INIT_APPOSITION_SCELLES_SUCCESS:
      nextState.showProgress = false;
      nextState.errorMessage = null;
      nextState.data = action.value.data.jsonVO;
      nextState.refDeclaration = action.value.refDeclaration;
      return nextState;
    case Constants.ECI_INIT_APPOSITION_SCELLES_FAILED:
      nextState.showProgress = false;
      nextState.errorMessage = action.value.dtoHeader
        ? action.value.dtoHeader.messagesErreur
        : action.value;
      return nextState;
    case Constants.ECI_INIT_APPOSITION_SCELLES_INIT:
      return initialState;
    default:
      return nextState ? nextState : initialState;
  }
};
