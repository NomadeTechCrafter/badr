/**Constants */
/** i18n */
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import {
  DED_INIT_CONTROLE_COMMUN_FAILED,
  DED_INIT_CONTROLE_COMMUN_IN_PROGRESS,
  DED_INIT_CONTROLE_COMMUN_INIT,
  DED_INIT_CONTROLE_COMMUN_REQUEST,
  DED_INIT_CONTROLE_COMMUN_SUCCESS, DED_INIT_LIST_CONTROLE_COMMUN_FAILED,
  DED_INIT_LIST_CONTROLE_COMMUN_IN_PROGRESS, DED_INIT_LIST_CONTROLE_COMMUN_INIT,
  DED_INIT_LIST_CONTROLE_COMMUN_REQUEST,
  DED_INIT_LIST_CONTROLE_COMMUN_SUCCESS,
} from '../dedInitierControlConstants';

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
    case DED_INIT_CONTROLE_COMMUN_REQUEST:
      nextState.showProgress = true;
      nextState.displayError = false;
      nextState.messageInfo = null;
      nextState.errorMessage = null;
      nextState.data = {};
      return nextState;
    case DED_INIT_CONTROLE_COMMUN_IN_PROGRESS:
    //  alert('reduceer in progress')
      nextState.showProgress = true;
      return nextState;
    case DED_INIT_CONTROLE_COMMUN_SUCCESS:
   //   alert('reducer success')
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.messageInfo = action.value.messagesInfo;
      nextState.success = true;
      return nextState;
    case DED_INIT_CONTROLE_COMMUN_FAILED:
      console.log('DED_INIT_CONTROLE_COMMUN_FAILED : ',action);
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
    case DED_INIT_CONTROLE_COMMUN_INIT:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.errorMessage = null;
      nextState.messageInfo = null;
      nextState.success = false;
      return nextState;




    case DED_INIT_LIST_CONTROLE_COMMUN_REQUEST:
      nextState.showProgress = true;
      nextState.displayError = false;
      nextState.messageInfo = null;
      nextState.errorMessage = null;
      nextState.data = {};
      return nextState;
    case DED_INIT_LIST_CONTROLE_COMMUN_IN_PROGRESS:
      //  alert('reduceer in progress')
      nextState.showProgress = true;
      return nextState;
    case DED_INIT_LIST_CONTROLE_COMMUN_SUCCESS:
      //   alert('reducer success')
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.messageInfo = action.value.messagesInfo;
      nextState.success = true;
      return nextState;
    case DED_INIT_LIST_CONTROLE_COMMUN_FAILED:
      console.log('DED_INIT_LIST_CONTROLE_COMMUN_FAILED : ',action);
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
    case DED_INIT_LIST_CONTROLE_COMMUN_INIT:
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
