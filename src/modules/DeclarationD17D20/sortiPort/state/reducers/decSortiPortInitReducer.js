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
    dataScanner: [],
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
    

    case Constants.SCANNER_D17_DUM_REQUEST:
      nextState.displayError = false;
      nextState.errorMessage = null;
      nextState.showProgress = true;
      nextState.dataScanner = [];
      return nextState;
    case Constants.SCANNER_D17_DUM_IN_PROGRESS:
      return nextState;
    case Constants.SCANNER_D17_DUM_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.dataScanner = action?.value?.jsonVO;
      return nextState;
    case Constants.SCANNER_D17_DUM_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      if (action?.value?.dtoHeader) {
        nextState.errorMessage = action?.value?.dtoHeader?.messagesErreur
          ? action?.value?.dtoHeader?.messagesErreur
          : action.value;
      } else {
        nextState.errorMessage = translate('errors.technicalIssue');
      }
      return nextState;
    case Constants.SCANNER_D17_DUM_INIT:
      return initialState;
    
    default:
      nextState.showProgress = false;
      return initialState;
  }
};
