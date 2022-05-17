import * as Constants from '../mlvRechercheConstants';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
const initialState = {
  refDum: null,
  showProgress: false,
  errorMessage: null,
  data: {
    init: {},
    confirm: {},
    search: {
      results: [],
      detail: {},
    },
    reference: '',
    typeRecherche: '',
  },
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.MAINLEVEE_RECHERCHEDECLARATION_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      return nextState;
    case Constants.MAINLEVEE_RECHERCHEDECLARATION_IN_PROGRESS:
      return nextState;
    case Constants.MAINLEVEE_RECHERCHEDECLARATION_SUCCESS:
      nextState.showProgress = false;
      nextState.errorMessage = null;
      return nextState;
    case Constants.MAINLEVEE_RECHERCHEDECLARATION_FAILED:
      nextState.showProgress = false;
      nextState.errorMessage = action.value.dtoHeader
        ? action.value.dtoHeader.messagesErreur
        : action.value;
      return nextState;
    case Constants.MAINLEVEE_RECHERCHEDECLARATION_INIT:
      return initialState;

    case Constants.MAINLEVEE_INIT_RECHERCHEDECLARATION_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      return nextState;
    case Constants.MAINLEVEE_INIT_RECHERCHEDECLARATION_IN_PROGRESS:
      return nextState;
    case Constants.MAINLEVEE_INIT_RECHERCHEDECLARATION_SUCCESS:
      nextState.showProgress = false;
      nextState.errorMessage = null;
      console.log('reduceinitrecherche', nextState.value.jsonVO);
      return nextState;
    case Constants.MAINLEVEE_INIT_RECHERCHEDECLARATION_FAILED:
      nextState.showProgress = false;
      nextState.errorMessage = action.value.dtoHeader
        ? action.value.dtoHeader.messagesErreur
        : action.value;
      return nextState;

    case Constants.INIT_ETAT_CHARGEMENT_INIT:
      initialState.data.init = [];
      return initialState;
    case Constants.INIT_ETAT_CHARGEMENT_REQUEST:
      nextState.infoMessage = null;
      nextState.errorMessage = null;
      nextState.showProgress = true;
      return nextState;
    case Constants.INIT_ETAT_CHARGEMENT_IN_PROGRESS:
      return nextState;
    case Constants.INIT_ETAT_CHARGEMENT_SUCCESS:
      nextState.infoMessage = null;
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data.init = action.value;
      //   console.log('data reducer', nextState.data.init.moyensTransport)
      return nextState;
    case Constants.INIT_ETAT_CHARGEMENT_FAILED:
      nextState.showProgress = false;
      nextState.infoMessage = null;
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

    case Constants.SEARCH_ETAT_CHARGEMENT_INIT:
      initialState.data.search.results = [];
      initialState.data.search.detail = [];
      return initialState;
    case Constants.SEARCH_ETAT_CHARGEMENT_REQUEST:
      nextState.infoMessage = null;
      nextState.errorMessage = null;
      nextState.showProgress = true;
      nextState.data.reference = action.value.reference;
      //   nextState.data.typeRecherche = action.value.typeRecherche;
      return nextState;
    case Constants.SEARCH_ETAT_CHARGEMENT_IN_PROGRESS:
      return nextState;
    case Constants.SEARCH_ETAT_CHARGEMENT_SUCCESS:
      if (
        action.value.dtoHeader &&
        action.value.dtoHeader.messagesInfo &&
        action.value.dtoHeader.messagesInfo.length > 0
      ) {
        nextState.infoMessage = action.value.dtoHeader.messagesInfo;
      }
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.searchMode = false;
      nextState.detailMode = true;
      nextState.data.search = action.value;
      return nextState;
    case Constants.SEARCH_ETAT_CHARGEMENT_FAILED:
      nextState.showProgress = false;
      nextState.infoMessage = null;
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

    case Constants.VALIDATE_ETAT_CHARGEMENT_INIT:
      return initialState;
    case Constants.VALIDATE_ETAT_CHARGEMENT_REQUEST:
      nextState.infoMessage = null;
      nextState.errorMessage = null;
      nextState.showProgress = true;
      nextState.data = action.value;
      //   nextState.data.typeRecherche = action.value.typeRecherche;
      return nextState;
    case Constants.VALIDATE_ETAT_CHARGEMENT_IN_PROGRESS:
      return nextState;
    case Constants.VALIDATE_ETAT_CHARGEMENT_SUCCESS:
      if (
        action.value.dtoHeader &&
        action.value.dtoHeader.messagesInfo &&
        action.value.dtoHeader.messagesInfo.length > 0
      ) {
        nextState.infoMessage = action.value.dtoHeader.messagesInfo;
      }
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.searchMode = false;
      nextState.detailMode = true;
      nextState.data.search = action.value;
      return nextState;
    case Constants.VALIDATE_ETAT_CHARGEMENT_FAILED:
      nextState.showProgress = false;
      nextState.infoMessage = null;
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

    case Constants.DELIVER_ETAT_CHARGEMENT_INIT:
      return initialState;
    case Constants.DELIVER_ETAT_CHARGEMENT_REQUEST:
      nextState.infoMessage = null;
      nextState.errorMessage = null;
      nextState.showProgress = true;
      nextState.data = action.value;
      //  nextState.data.reference = action.value.reference;
      //   nextState.data.typeRecherche = action.value.typeRecherche;
      return nextState;
    case Constants.DELIVER_ETAT_CHARGEMENT_IN_PROGRESS:
      return nextState;
    case Constants.DELIVER_ETAT_CHARGEMENT_SUCCESS:
      if (
        action.value.dtoHeader &&
        action.value.dtoHeader.messagesInfo &&
        action.value.dtoHeader.messagesInfo.length > 0
      ) {
        nextState.infoMessage = action.value.dtoHeader.messagesInfo;
      }
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.searchMode = false;
      nextState.detailMode = true;
      nextState.data.search = action.value;

      return nextState;
    case Constants.DELIVER_ETAT_CHARGEMENT_FAILED:
      nextState.showProgress = false;
      nextState.infoMessage = null;
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

    default:
      nextState.showProgress = false;
      return initialState;
  }
};
