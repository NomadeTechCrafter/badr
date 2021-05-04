/**Constants */
import * as Constants from '../decSortiPortConstants';
/** i18n */
import {translate} from '../../../../../commons/i18n/ComI18nHelper';

const initialState = {
  showProgress: false,
  errorMessage: '',
  displayError: false,
  data: {},
  success: false,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.VU_EMB_RECH_BY_REF_VH_REQUEST:
      nextState.displayError = false;
      nextState.messageInfo = null;
      nextState.errorMessage = null;
      nextState.data = {};
      nextState.success = false;
      if (nextState.successMessage) {
        delete nextState.successMessage;
      }
      return nextState;
    case Constants.VU_EMB_RECH_BY_REF_VH_IN_PROGRESS:
      nextState.showProgress = true;
      return nextState;
    case Constants.VU_EMB_RECH_BY_REF_VH_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data = action.value.jsonVO;
      nextState.messageInfo = action.value.dtoHeader.messagesInfo;
      nextState.success = true;
      return nextState;
    case Constants.VU_EMB_RECH_BY_REF_VH_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.messageInfo = null;
      nextState.success = false;
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
