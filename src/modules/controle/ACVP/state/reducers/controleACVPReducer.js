import * as Constants from '../controleACVPConstants';

const initialState = {
  showProgress: false,
  errorMessage: null,
  successMessage: null,
  reponseData: null,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.ACVP_VALIDATESAVE_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      nextState.successMessage = null;
      nextState.reponseData = null;
      console.log('--> ValiderSave request...');
      return nextState;
    case Constants.ACVP_VALIDATESAVE_IN_PROGRESS:
      console.log('--> ValiderSave in progress...');
      return nextState;
    case Constants.ACVP_VALIDATESAVE_SUCCESS:
      console.log('--> ValiderSave success...');
      nextState.showProgress = false;
      nextState.errorMessage = null;
      nextState.successMessage = action.value.dtoHeader.messagesInfo;
      nextState.reponseData = action.value.jsonVO;
      return nextState;
    case Constants.ACVP_VALIDATESAVE_FAILED:
      console.log('--> ValiderSave failed...');
      nextState.showProgress = false;
      nextState.errorMessage = action.value.dtoHeader.messagesErreur
        ? action.value.dtoHeader.messagesErreur
        : action.value;
      nextState.reponseData = null;
      return nextState;
    case Constants.ACVP_GENERERCR_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      nextState.successMessage = null;
      nextState.reponseData = null;
      console.log('--> GENERERCR request...');
      return nextState;
    case Constants.ACVP_GENERERCR_IN_PROGRESS:
      console.log('--> GENERERCR in progress...');
      return nextState;
    case Constants.ACVP_GENERERCR_FAILED:
      console.log('--> GENERERCR success...');
      nextState.showProgress = false;
      nextState.errorMessage = null;
      nextState.successMessage = action.value.dtoHeader.messagesInfo;
      nextState.reponseData = action.value.jsonVO;
      return nextState;
    case Constants.ACVP_GENERERCR_FAILED:
      console.log('--> GENERERCR failed...');
      nextState.showProgress = false;
      nextState.errorMessage = action.value.dtoHeader.messagesErreur
        ? action.value.dtoHeader.messagesErreur
        : action.value;
      nextState.reponseData = null;
      return nextState;

    default:
      nextState.showProgress = false;
      return initialState;
  }
};
