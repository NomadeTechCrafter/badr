/**Constants */
import {
    RESULTAT_SCANNER_FAILED,
    RESULTAT_SCANNER_IN_PROGRESS,
    RESULTAT_SCANNER_INIT,
    RESULTAT_SCANNER_REQUEST,
    RESULTAT_SCANNER_SUCCESS,
} from '../ctrlResultatScannerConstants';

const initialState = {
    showProgress: false,
    errorMessage: '',
    displayError: false,
    data: [],
};

export default (state = initialState, action) => {
    let nextState = {
        ...state,
        value: action.value,
    };
    switch (action.type) {
        case RESULTAT_SCANNER_REQUEST:
            nextState.displayError = false;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.data = [];
            return nextState;
        case RESULTAT_SCANNER_IN_PROGRESS:
            return nextState;
        case RESULTAT_SCANNER_SUCCESS:
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.data = action.value;
            return nextState;
        case RESULTAT_SCANNER_FAILED:
            nextState.showProgress = false;
            nextState.displayError = true;
            nextState.errorMessage = action.value;
            return nextState;
        case RESULTAT_SCANNER_INIT:
            return initialState;
        default:
            nextState.showProgress = true;
            return initialState;
    }
};