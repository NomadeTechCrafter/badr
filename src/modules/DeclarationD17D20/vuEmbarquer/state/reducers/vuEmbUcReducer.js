/**Constants */
import * as Constants from '../vuEmbarquerConstants';
/** i18n */
import {translate} from '../../../../../commons/i18n/ComI18nHelper';

const initialState = {
  showProgress: false,
  errorMessage: '',
  displayError: false,
  data: {},
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.VU_EMB_CONFIRMER_REQUEST:
      nextState.displayError = false;
      nextState.messageInfo = null;
      nextState.errorMessage = null;
      nextState.data = {};
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
      return nextState;
    case Constants.VU_EMB_CONFIRMER_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.messageInfo = null;
      if (action.value.dtoHeader) {
        nextState.errorMessage = action.value.dtoHeader.messagesErreur
          ? action.value.dtoHeader.messagesErreur
          : action.value;
      } else {
        nextState.errorMessage = translate('errors.technicalIssue');
      }
      return nextState;

    default:
      nextState.showProgress = false;
      return initialState;
  }
};
