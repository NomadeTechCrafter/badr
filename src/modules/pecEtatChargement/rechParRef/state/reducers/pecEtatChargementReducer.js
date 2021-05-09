/**Constants */
import * as Constants from '../pecEtatChargementConstants';

const initialState = {
    showProgress: false,
    errorMessage: '',
    displayError: false,
    data: {},
    dataHistorique: [],
    dataVersions: [],
    dataScanner: [],
};

export default (state = initialState, action) => {
    let nextState = {
        ...state,
        value: action.value,
    };
    switch (action.type) {
        case Constants.ETAT_CHARGEMENT_REQUEST:
            nextState.displayError = false;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.data = {};
            return nextState;
        case Constants.ETAT_CHARGEMENT_IN_PROGRESS:
            return nextState;
        case Constants.ETAT_CHARGEMENT_SUCCESS:
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.data = action?.value?.jsonVO;
            return nextState;
        case Constants.ETAT_CHARGEMENT_FAILED:
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
        case Constants.ETAT_CHARGEMENT_INIT:
            return initialState;
        case Constants.HISTORIQUE_ETAT_CHARGEMENT_REQUEST:
            nextState.displayError = false;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.dataHistorique = [];
            return nextState;
        case Constants.HISTORIQUE_ETAT_CHARGEMENT_IN_PROGRESS:
            return nextState;
        case Constants.HISTORIQUE_ETAT_CHARGEMENT_SUCCESS:
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.dataHistorique = action?.value?.jsonVO;
            return nextState;
        case Constants.HISTORIQUE_ETAT_CHARGEMENT_FAILED:
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
        case Constants.HISTORIQUE_ETAT_CHARGEMENT_INIT:
            return initialState;

        case Constants.VERSIONS_ETAT_CHARGEMENT_REQUEST:
            nextState.displayError = false;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.dataVersions = [];
            return nextState;
        case Constants.VERSIONS_ETAT_CHARGEMENT_IN_PROGRESS:
            return nextState;
        case Constants.VERSIONS_ETAT_CHARGEMENT_SUCCESS:
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.dataVersions = action?.value?.jsonVO;
            return nextState;
        case Constants.VERSIONS_ETAT_CHARGEMENT_FAILED:
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
        case Constants.VERSIONS_ETAT_CHARGEMENT_INIT:
            return initialState;
        case Constants.SCANNER_ETAT_CHARGEMENT_REQUEST:
            nextState.displayError = false;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.dataScanner = [];
            return nextState;
        case Constants.SCANNER_ETAT_CHARGEMENT_IN_PROGRESS:
            return nextState;
        case Constants.SCANNER_ETAT_CHARGEMENT_SUCCESS:
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.dataScanner = action?.value?.jsonVO;
            return nextState;
        case Constants.SCANNER_ETAT_CHARGEMENT_FAILED:
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
        case Constants.SCANNER_ETAT_CHARGEMENT_INIT:
            return initialState;
        default:
            nextState.showProgress = true;
            return initialState;
    }
};