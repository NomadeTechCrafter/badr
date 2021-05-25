import * as Constants from '../controleCommonConstants';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';

const initialState = {
  showProgress: false,
  infoMessage: null,
  errorMessage: null,
  searchMode: true,
  resultsMode: false,
  detailMode: false,
  data: {
    init: {},
    listDeclaration: [],
    detail: {},
    confirm: {},
    refDeclaration: '',
  },
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    //INIT_CONTROLE
    case Constants.INIT_CONTROLE_COMMUN_INIT:
      initialState.data.init = {};
      initialState.data.refDeclaration = '';
      return initialState;
    case Constants.INIT_CONTROLE_COMMUN_REQUEST:
      nextState.showProgress = true;
      nextState.infoMessage = null;
      nextState.errorMessage = null;
      return nextState;
    case Constants.INIT_CONTROLE_COMMUN_IN_PROGRESS:
      return nextState;
    case Constants.INIT_CONTROLE_COMMUN_SUCCESS:
      nextState.showProgress = false;
      nextState.infoMessage = null;
      nextState.errorMessage = null;
      nextState.data.init = action.value.data.jsonVO;
      nextState.data.refDeclaration = action.value.refDeclaration;
      return nextState;
    case Constants.IINIT_CONTROLE_COMMUN_FAILED:
      nextState.showProgress = false;
      if (
        action.value.dtoHeader &&
        action.value.dtoHeader.messagesErreur &&
        action.value.dtoHeader.messagesErreur.length > 0
      ) {
        nextState.errorMessage = action.value.dtoHeader.messagesErreur;
      } else {
        nextState.errorMessage = translate('errors.technicalIssue');
      }
      return nextState;

    //LISTDECLARATION_CONTROLE
    case Constants.LISTDECLARATION_CONTROLE_COMMUN_INIT:
      initialState.data.listDeclaration = [];
      return initialState;
    case Constants.LISTDECLARATION_CONTROLE_COMMUN_REQUEST:
      nextState.showProgress = true;
      nextState.infoMessage = null;
      nextState.errorMessage = null;
      initialState.data.listDeclaration = [];
      return nextState;
    case Constants.LISTDECLARATION_CONTROLE_COMMUN_IN_PROGRESS:
      return nextState;
    case Constants.LISTDECLARATION_CONTROLE_COMMUN_SUCCESS:
      nextState.showProgress = false;
      nextState.infoMessage = null;
      nextState.errorMessage = null;
      nextState.data.listDeclaration = action.value.jsonVO;
      return nextState;
    case Constants.LISTDECLARATION_CONTROLE_COMMUN_FAILED:
      nextState.showProgress = false;
      if (
        action.value.dtoHeader &&
        action.value.dtoHeader.messagesErreur &&
        action.value.dtoHeader.messagesErreur.length > 0
      ) {
        nextState.errorMessage = action.value.dtoHeader.messagesErreur;
      } else {
        nextState.errorMessage = translate('errors.technicalIssue');
      }
      return nextState;
      //VALIDATESAVE ACTION
      case Constants.VALIDATESAVE_CONTROLE_COMMUN_REQUEST:
          nextState.showProgress = true;
          nextState.errorMessage = null;
          nextState.infoMessage = null;
          nextState.reponseData = null;
          console.log('--> ValiderSave request...');
          return nextState;
      case Constants.VALIDATESAVE_CONTROLE_COMMUN_IN_PROGRESS:
          console.log('--> ValiderSave in progress...');
          nextState.showProgress = true;
          return nextState;
      case Constants.VALIDATESAVE_CONTROLE_COMMUN_SUCCESS:
          console.log('--> ValiderSave success...');
          nextState.showProgress = false;
          nextState.errorMessage = null;
          nextState.infoMessage = action.value.dtoHeader.messagesInfo;
          nextState.reponseData = action.value.jsonVO;
          return nextState;
      case Constants.VALIDATESAVE_CONTROLE_COMMUN_FAILED:
          console.log('--> ValiderSave failed...');
          nextState.showProgress = false;
          nextState.errorMessage = action.value.dtoHeader.messagesErreur
              ? action.value.dtoHeader.messagesErreur
              : action.value;
          nextState.reponseData = null;
          return nextState;
      case Constants.GENERERCR_CONTROLE_COMMUN_REQUEST:
          nextState.showProgress = true;
          nextState.errorMessage = null;
          nextState.successMessage = null;
          nextState.reponseData = null;
          console.log('--> GENERERCR request...');
          return nextState;
      case Constants.GENERERCR_CONTROLE_COMMUN_IN_PROGRESS:
          console.log('--> GENERERCR in progress...');
          return nextState;
      case Constants.GENERERCR_CONTROLE_COMMUN_SUCCESS:
          console.log('--> GENERERCR success...');
          nextState.showProgress = false;
          nextState.errorMessage = null;
          nextState.successMessage = action.value.dtoHeader.messagesInfo;
          nextState.reponseData = action.value.jsonVO;
          return nextState;
      case Constants.GENERERCR_CONTROLE_COMMUN_FAILED:
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
