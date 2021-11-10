import * as Constants from '../ecorExpVuEmbarquerConstants';

const initialState = {
  showProgress: false,
  errorMessage: null,
  dataScanner: null,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {

    case Constants.SCANNER_VU_EMB_REQUEST:
      nextState.displayError = false;
      nextState.errorMessage = null;
      nextState.showProgress = true;
      nextState.dataScanner = null;
      nextState.success = false;
      return nextState;
    case Constants.SCANNER_VU_EMB_IN_PROGRESS:
      return nextState;
    case Constants.SCANNER_VU_EMB_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.dataScanner = action?.value?.jsonVO;
      nextState.success = true;

      console.log('nextState Resultat Scanner VuEmbarquer : ' + JSON.stringify(nextState));
      return nextState;
    case Constants.SCANNER_VU_EMB_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.errorMessage = action?.value?.dtoHeader?.messagesErreur
        ? action?.value?.dtoHeader?.messagesErreur
        : translate('errors.technicalIssue');
      nextState.success = false;
      return nextState;
    case Constants.SCANNER_VU_EMB_INIT:
      return initialState;

    
    default:
      // nextState.showProgress = true;
      return nextState ? nextState : initialState;
  }
};
