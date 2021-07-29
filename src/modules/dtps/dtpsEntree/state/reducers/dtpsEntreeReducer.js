/**Constants */
import {
    DTPS_ENTREE_FAILED,
    DTPS_ENTREE_IN_PROGRESS,
    DTPS_ENTREE_INIT,
    DTPS_ENTREE_REQUEST,
    DTPS_ENTREE_SUCCESS,
    VALIDER_DTPS_ENTREE_FAILED,
    VALIDER_DTPS_ENTREE_IN_PROGRESS,
    VALIDER_DTPS_ENTREE_INIT,
    VALIDER_DTPS_ENTREE_REQUEST,
    VALIDER_DTPS_ENTREE_SUCCESS,
} from '../dtpsEntreeConstants';

const initialState = {
    showProgress: false,
    errorMessage: '',
    infoMessage: null,
    displayError: false,
    data: [],
};

export default (state = initialState, action) => {
    let nextState = {
        ...state,
        value: action.value,
    };
    switch (action.type) {
        case DTPS_ENTREE_REQUEST:
            nextState.displayError = false;
            nextState.errorMessage = null;
            nextState.infoMessage = null;
            nextState.showProgress = true;
            nextState.data = [];
            return nextState;
        case DTPS_ENTREE_IN_PROGRESS:
            return nextState;
        case DTPS_ENTREE_SUCCESS:
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.data = action.value;
            nextState.infoMessage = null;
            return nextState;
        case DTPS_ENTREE_FAILED:
            nextState.showProgress = false;
            nextState.displayError = true;
            nextState.errorMessage = action.value;
            nextState.infoMessage = null;
            return nextState;
        case DTPS_ENTREE_INIT:
            return initialState;
        

        case VALIDER_DTPS_ENTREE_REQUEST:
            nextState.displayError = false;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.infoMessage = null;
            nextState.data = [];
            return nextState;
        case VALIDER_DTPS_ENTREE_IN_PROGRESS:
            return nextState;
        case VALIDER_DTPS_ENTREE_SUCCESS:
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.data = action.value;
            nextState.infoMessage = 'Succès'//action?.messagesInfo;
            return nextState;
        case VALIDER_DTPS_ENTREE_FAILED:
            nextState.showProgress = false;
            nextState.displayError = true;
            nextState.errorMessage = action.value;
            nextState.infoMessage = 'Succès'//action?.messagesInfo;
            return nextState;
        case VALIDER_DTPS_ENTREE_INIT:
            return initialState;
        
        default:
            nextState.showProgress = true;
            return initialState;
    }
};