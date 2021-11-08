import * as Constants from '../ecorExpVuEmbarquerConstants';

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
      nextState.errorMessage = action?.value?.dtoHeader?.messagesErreur;
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


    case Constants.VU_EMB_SUPPRIMER_REQUEST:
      nextState.displayError = false;
      nextState.messageInfo = null;
      nextState.errorMessage = null;
      nextState.data = {};
      nextState.success = false;
      if (nextState.successMessage) {
        delete nextState.successMessage;
      }
      return nextState;
    case Constants.VU_EMB_SUPPRIMER_IN_PROGRESS:
      nextState.showProgress = true;
      return nextState;
    case Constants.VU_EMB_SUPPRIMER_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data = action.value.jsonVO;
      nextState.messageInfo = action.value.dtoHeader.messagesInfo;
      nextState.success = true;
      return nextState;
    case Constants.VU_EMB_SUPPRIMER_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.messageInfo = null;
      nextState.success = false;
      nextState.errorMessage = action?.value?.dtoHeader?.messagesErreur
        ? action?.value?.dtoHeader?.messagesErreur
        : translate('errors.technicalIssue');
      return nextState;


    case Constants.VU_EMB_CONFIRMER_REQUEST:
      nextState.displayError = false;
      nextState.messageInfo = null;
      nextState.errorMessage = null;
      nextState.data = {};
      nextState.success = false;
      if (nextState.successMessage) {
        delete nextState.successMessage;
      }
      return nextState;
    case Constants.VU_EMB_CONFIRMER_IN_PROGRESS:
      nextState.showProgress = true;
      return nextState;
    case Constants.VU_EMB_CONFIRMER_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data = action.value.jsonVO;
      nextState.messageInfo = action.value.dtoHeader.messagesInfo;
      nextState.success = true;
      return nextState;
    case Constants.VU_EMB_CONFIRMER_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.messageInfo = null;
      nextState.success = false;
      console.log('response Confirmer VuEmbarquer : ' + JSON.stringify(action));
      nextState.errorMessage = action?.value?.dtoHeader?.messagesErreur
        ? action?.value?.dtoHeader?.messagesErreur
        : translate('errors.technicalIssue');
      return nextState;

    default:
      // nextState.showProgress = true;
      return nextState ? nextState : initialState;
  }
};
