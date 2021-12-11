/**Constants */
import translate from '../../../../../commons/i18n/ComI18nHelper';
import * as Constants from '../pecEtatChargementConstants';

const initialState = {
    showProgress: false,
    errorMessage: '',
    displayError: false,
    data: {},
    dataHistorique: [],
    dataVersions: [],
    dataScanner: [],
    dataScellesApresScanner: [],
    infoMessage : null,
    success : false
};

export default (state = initialState, action) => {
    let nextState = {
        ...state,
        value: action.value,
    };
    switch (action.type) {
        case Constants.ETAT_CHARGEMENT_VE_REQUEST:
            nextState.displayError = false;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.infoMessage = null;
            nextState.success = false;
            nextState.data = {};
            return nextState;
        case Constants.ETAT_CHARGEMENT_VE_IN_PROGRESS:
            return nextState;
        case Constants.ETAT_CHARGEMENT_VE_SUCCESS:
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.data = action?.value?.jsonVO;

            console.log('testtest ETAT_CHARGEMENT_VE_SUCCESS', JSON.stringify(nextState) );
            return nextState;
        case Constants.ETAT_CHARGEMENT_VE_FAILED:
            nextState.showProgress = false;
            nextState.displayError = true;
            if (action?.value?.dtoHeader) {
                nextState.errorMessage = action?.value?.dtoHeader?.messagesErreur
                    ? action?.value?.dtoHeader?.messagesErreur
                    : action.value;
            } else {
                nextState.errorMessage = translate('errors.technicalIssue');
            }
            console.log('testtest ETAT_CHARGEMENT_VE_FAILED', nextState);
            return nextState;
        case Constants.ETAT_CHARGEMENT_VE_INIT:
            return initialState;
        

        case Constants.RECH_IMM_ETAT_CHARGEMENT_VE_REQUEST:
            nextState.displayError = false;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.infoMessage = null;
            nextState.success = false;
            nextState.data = {};
            return nextState;
        case Constants.RECH_IMM_ETAT_CHARGEMENT_VE_IN_PROGRESS:
            return nextState;
        case Constants.RECH_IMM_ETAT_CHARGEMENT_VE_SUCCESS:
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.data = action?.value?.jsonVO;

            console.log('RECH_IMM_ETAT_CHARGEMENT_VE_SUCCESS', JSON.stringify(nextState));
            return nextState;
        case Constants.RECH_IMM_ETAT_CHARGEMENT_VE_FAILED:
            nextState.showProgress = false;
            nextState.displayError = true;
            if (action?.value?.dtoHeader) {
                nextState.errorMessage = action?.value?.dtoHeader?.messagesErreur
                    ? action?.value?.dtoHeader?.messagesErreur
                    : action.value;
            } else {
                nextState.errorMessage = translate('errors.technicalIssue');
            }
            console.log('', nextState);
            return nextState;
        case Constants.RECH_IMM_ETAT_CHARGEMENT_VE_INIT:
            return initialState;


        case Constants.INIT_ETAT_CHARGEMENT_VE_REQUEST:
            nextState.displayError = false;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.data = {};
            nextState.codeBureau = action.value.codeBureau;
            nextState.regime = action.value.regime;
            nextState.anneeEnregistrement = action.value.anneeEnregistrement;
            nextState.numeroSerieEnregistrement = action.value.numeroSerieEnregistrement;
            nextState.cleIHM = action.value.cleIHM;
            console.log('testtest request', nextState);
            return nextState;
        case Constants.INIT_ETAT_CHARGEMENT_VE_IN_PROGRESS:
            return nextState;
        case Constants.INIT_ETAT_CHARGEMENT_VE_SUCCESS:
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.data = action?.value?.jsonVO;
            console.log('testtest success', nextState);
            return nextState;
        case Constants.INIT_ETAT_CHARGEMENT_VE_FAILED:
            console.log('testtest failed');
            nextState.showProgress = false;
            nextState.displayError = true;
            if (action?.value?.dtoHeader) {
                nextState.errorMessage = action?.value?.dtoHeader?.messagesErreur
                    ? action?.value?.dtoHeader?.messagesErreur
                    : action.value;
            } else {
                nextState.errorMessage = translate('errors.technicalIssue');
            }
            console.log('testtest failed', nextState);
            return nextState;
        case Constants.INIT_ETAT_CHARGEMENT_VE_INIT:
            return initialState;


        case Constants.VALIDER_ETAT_CHARGEMENT_VE_REQUEST:
            nextState.displayError = false;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.data = {};
            return nextState;
        case Constants.VALIDER_ETAT_CHARGEMENT_VE_IN_PROGRESS:
            return nextState;
        case Constants.VALIDER_ETAT_CHARGEMENT_VE_SUCCESS:
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.data = action?.value?.jsonVO;
            nextState.infoMessage = action.value?.dtoHeader?.messagesInfo;
            nextState.success = true;
            console.log('VALIDER_ETAT_CHARGEMENT_VE_SUCCESS ', action.value);
            return nextState;
        case Constants.VALIDER_ETAT_CHARGEMENT_VE_FAILED:
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
        case Constants.VALIDER_ETAT_CHARGEMENT_VE_INIT:
            return initialState;
        case Constants.HISTORIQUE_ETAT_CHARGEMENT_VE_REQUEST:
            nextState.displayError = false;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.dataHistorique = [];
            return nextState;
        case Constants.HISTORIQUE_ETAT_CHARGEMENT_VE_IN_PROGRESS:
            return nextState;
        case Constants.HISTORIQUE_ETAT_CHARGEMENT_VE_SUCCESS:
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.dataHistorique = action?.value?.jsonVO;
            return nextState;
        case Constants.HISTORIQUE_ETAT_CHARGEMENT_VE_FAILED:
            nextState.showProgress = false;
            nextState.displayError = true;
            if (action?.value?.dtoHeader) {
                nextState.errorMessage = action?.value?.dtoHeader?.messagesErreur
                    ? action?.value?.dtoHeader?.messagesErreur
                    : action.value;
            } else {
                nextState.errorMessage = translate('errors.technicalIssue');
            }
            console.log('testtest HISTORIQUE_ETAT_CHARGEMENT_VE_FAILED', nextState);

            return nextState;
        case Constants.HISTORIQUE_ETAT_CHARGEMENT_VE_INIT:
            return initialState;

        case Constants.VERSIONS_ETAT_CHARGEMENT_VE_REQUEST:
            nextState.displayError = false;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.dataVersions = [];
            return nextState;
        case Constants.VERSIONS_ETAT_CHARGEMENT_VE_IN_PROGRESS:
            return nextState;
        case Constants.VERSIONS_ETAT_CHARGEMENT_VE_SUCCESS:
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.dataVersions = action?.value?.jsonVO;
            return nextState;
        case Constants.VERSIONS_ETAT_CHARGEMENT_VE_FAILED:
            nextState.showProgress = false;
            nextState.displayError = true;
            if (action?.value?.dtoHeader) {
                nextState.errorMessage = action?.value?.dtoHeader?.messagesErreur
                    ? action?.value?.dtoHeader?.messagesErreur
                    : action.value;
            } else {
                nextState.errorMessage = translate('errors.technicalIssue');
            }
            console.log('testtest VERSIONS_ETAT_CHARGEMENT_VE_FAILED', nextState);
            return nextState;
        case Constants.VERSIONS_ETAT_CHARGEMENT_VE_INIT:
            return initialState;
        
        case Constants.SCANNER_ETAT_CHARGEMENT_VE_REQUEST:
            nextState.displayError = false;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.dataScanner = [];
            return nextState;
        case Constants.SCANNER_ETAT_CHARGEMENT_VE_IN_PROGRESS:
            return nextState;
        case Constants.SCANNER_ETAT_CHARGEMENT_VE_SUCCESS:
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.dataScanner = action?.value?.jsonVO;
            return nextState;
        case Constants.SCANNER_ETAT_CHARGEMENT_VE_FAILED:
            nextState.showProgress = false;
            nextState.displayError = true;
            if (action?.value?.dtoHeader) {
                nextState.errorMessage = action?.value?.dtoHeader?.messagesErreur
                    ? action?.value?.dtoHeader?.messagesErreur
                    : action.value;
            } else {
                nextState.errorMessage = translate('errors.technicalIssue');
            }
            console.log('testtest SCANNER_ETAT_CHARGEMENT_VE_FAILED', nextState);
            return nextState;
        case Constants.SCANNER_ETAT_CHARGEMENT_VE_INIT:
            return initialState;
        

        case Constants.SCELLES_APRES_SCANNER_ETAT_CHARGEMENT_VE_REQUEST:
            nextState.displayError = false;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.dataScellesApresScanner = [];
            return nextState;
        case Constants.SCELLES_APRES_SCANNER_ETAT_CHARGEMENT_VE_IN_PROGRESS:
            return nextState;
        case Constants.SCELLES_APRES_SCANNER_ETAT_CHARGEMENT_VE_SUCCESS:
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.dataScellesApresScanner = action?.value?.jsonVO;
            return nextState;
        case Constants.SCELLES_APRES_SCANNER_ETAT_CHARGEMENT_VE_FAILED:
            nextState.showProgress = false;
            nextState.displayError = true;
            if (action?.value?.dtoHeader) {
                nextState.errorMessage = action?.value?.dtoHeader?.messagesErreur
                    ? action?.value?.dtoHeader?.messagesErreur
                    : action.value;
            } else {
                nextState.errorMessage = translate('errors.technicalIssue');
            }
            console.log('testtest SCELLES_APRES_SCANNER_ETAT_CHARGEMENT_VE_FAILED', nextState);
            return nextState;
        case Constants.SCELLES_APRES_SCANNER_ETAT_CHARGEMENT_VE_INIT:
            return initialState;
        
        default:
            return nextState ? nextState : initialState;
    }
};