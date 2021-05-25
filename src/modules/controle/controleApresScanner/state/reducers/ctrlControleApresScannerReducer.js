import * as Constants from '../ctrlControleApresScannerConstants';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';

const initialState = {
    showProgress: false,
    searchMode: true,
    showResults: false,
    detailMode: false,
    infoMessage: null,
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
        case Constants.INIT_CONTROLE_APRES_SCANNER_INIT:
            initialState.data.init = [];
            return initialState;
        case Constants.INIT_CONTROLE_APRES_SCANNER_REQUEST:
            nextState.infoMessage = null;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            return nextState;
        case Constants.INIT_CONTROLE_APRES_SCANNER_IN_PROGRESS:
            return nextState;
        case Constants.INIT_CONTROLE_APRES_SCANNER_SUCCESS:
            nextState.infoMessage = null;
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.data.init = action.value;
            return nextState;
        case Constants.INIT_CONTROLE_APRES_SCANNER_FAILED:
            nextState.showProgress = false;
            nextState.infoMessage = null;
            if (action.value.dtoHeader && action.value.dtoHeader.messagesErreur && action.value.dtoHeader.messagesErreur.length > 0) {
                nextState.errorMessage = action.value.dtoHeader.messagesErreur;
            } else {
                nextState.errorMessage = translate('errors.technicalIssue');
            }
            return nextState;
        case Constants.CONFIRM_CONTROLE_APRES_SCANNER_INIT:
            initialState.data.confirm = [];
            return initialState;
        case Constants.CONFIRM_CONTROLE_APRES_SCANNER_REQUEST:
            nextState.infoMessage = null;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            return nextState;
        case Constants.CONFIRM_CONTROLE_APRES_SCANNER_IN_PROGRESS:
            return nextState;
        case Constants.CONFIRM_CONTROLE_APRES_SCANNER_SUCCESS:
            if (action.value.dtoHeader && action.value.dtoHeader.messagesInfo && action.value.dtoHeader.messagesInfo.length > 0) {
                nextState.infoMessage = action.value.dtoHeader.messagesInfo;
            }
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.data.confirm = action.value;
            return nextState;
        case Constants.CONFIRM_CONTROLE_APRES_SCANNER_FAILED:
            nextState.showProgress = false;
            nextState.infoMessage = null;
            if (action.value.dtoHeader && action.value.dtoHeader.messagesErreur && action.value.dtoHeader.messagesErreur.length > 0) {
                nextState.errorMessage = action.value.dtoHeader.messagesErreur;
            } else {
                nextState.errorMessage = translate('errors.technicalIssue');
            }
            return nextState;
        case Constants.SEARCH_CONTROLE_APRES_SCANNER_INIT:
            initialState.data.search.results = [];
            initialState.data.search.detail = [];
            return initialState;
        case Constants.SEARCH_CONTROLE_APRES_SCANNER_REQUEST:
            nextState.infoMessage = null;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.data.reference = action.value.reference;
            nextState.data.typeRecherche = action.value.typeRecherche;
            return nextState;
        case Constants.SEARCH_CONTROLE_APRES_SCANNER_IN_PROGRESS:
            return nextState;
        case Constants.SEARCH_CONTROLE_APRES_SCANNER_SUCCESS:
            if (action.value.dtoHeader && action.value.dtoHeader.messagesInfo && action.value.dtoHeader.messagesInfo.length > 0) {
                nextState.infoMessage = action.value.dtoHeader.messagesInfo;
            }
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.searchMode = false;
            nextState.detailMode = true;
            nextState.data.search.detail = action.value;
            return nextState;
        case Constants.SEARCH_CONTROLE_APRES_SCANNER_FAILED:
            nextState.showProgress = false;
            nextState.infoMessage = null;
            if (action.value.dtoHeader && action.value.dtoHeader.messagesErreur && action.value.dtoHeader.messagesErreur.length > 0) {
                nextState.errorMessage = action.value.dtoHeader.messagesErreur;
            } else {
                nextState.errorMessage = translate('errors.technicalIssue');
            }
            return nextState;
        default:
            return nextState;
    }
};
