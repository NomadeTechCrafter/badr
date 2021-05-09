/**Constants */
/** i18n */
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import { CONFIRMER_CERTIFICAT_RECEPTION_FAILED, CONFIRMER_CERTIFICAT_RECEPTION_INIT, CONFIRMER_CERTIFICAT_RECEPTION_IN_PROGRESS, CONFIRMER_CERTIFICAT_RECEPTION_REQUEST, CONFIRMER_CERTIFICAT_RECEPTION_SUCCESS } from '../../../redressement/state/DedRedressementConstants';

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
    case CONFIRMER_CERTIFICAT_RECEPTION_REQUEST:
      nextState.showProgress = true;
      nextState.displayError = false;
      nextState.messageInfo = null;
      nextState.errorMessage = null;
      nextState.data = {};
      return nextState;
    case CONFIRMER_CERTIFICAT_RECEPTION_IN_PROGRESS:
      nextState.showProgress = true;
      return nextState;
    case CONFIRMER_CERTIFICAT_RECEPTION_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.messageInfo = action.value.messagesInfo;
      nextState.success = true;
      return nextState;
    case CONFIRMER_CERTIFICAT_RECEPTION_FAILED:
      console.log('CONFIRMER_CERTIFICAT_RECEPTION_FAILED : ',action);
      nextState.showProgress = false;
      nextState.displayError = true;
      if (action.value.dtoHeader) {
        nextState.errorMessage = action.value.dtoHeader.messagesErreur
          ? action.value.dtoHeader.messagesErreur
          : action.value;
      } else {
        nextState.errorMessage = translate('errors.technicalIssue');
      }
      return nextState;
    case CONFIRMER_CERTIFICAT_RECEPTION_INIT:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.errorMessage = null;
      nextState.messageInfo = null;
      nextState.success = false;
      return nextState;
    
    default:
      if (nextState.successMessage) {
        delete nextState.successMessage;
      }
      nextState.showProgress = false;
      return nextState.data ? nextState : initialState;
  }
};
