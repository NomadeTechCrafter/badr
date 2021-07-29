/**Constants */
import {
    DTPS_SORTIE_FAILED,
    DTPS_SORTIE_IN_PROGRESS,
    DTPS_SORTIE_INIT,
    DTPS_SORTIE_REQUEST,
    DTPS_SORTIE_SUCCESS,
    VALIDER_DTPS_SORTIE_FAILED,
    VALIDER_DTPS_SORTIE_IN_PROGRESS,
    VALIDER_DTPS_SORTIE_INIT,
    VALIDER_DTPS_SORTIE_REQUEST,
    VALIDER_DTPS_SORTIE_SUCCESS,
    
} from '../dtpsSortieConstants';

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
        case DTPS_SORTIE_REQUEST:
            nextState.displayError = false;
            nextState.errorMessage = null;
            nextState.infoMessage= null;
            nextState.showProgress = true;
            nextState.data = [];
            return nextState;
        case DTPS_SORTIE_IN_PROGRESS:
            return nextState;
        case DTPS_SORTIE_SUCCESS:
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.infoMessage = action?.messagesInfo;
            nextState.data = action.value;
            return nextState;
        case DTPS_SORTIE_FAILED:
            nextState.showProgress = false;
            nextState.displayError = true;
            nextState.infoMessage = null;
            nextState.errorMessage = action.value;
            return nextState;
        case DTPS_SORTIE_INIT:
            return initialState;
        

        case VALIDER_DTPS_SORTIE_REQUEST:
            nextState.displayError = false;
            nextState.errorMessage = null;
            nextState.infoMessage = null;
            nextState.showProgress = true;
            nextState.data = [];
            return nextState;
        case VALIDER_DTPS_SORTIE_IN_PROGRESS:
            return nextState;
        case VALIDER_DTPS_SORTIE_SUCCESS:
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.infoMessage = 'Succès'//action?.messagesInfo;
            nextState.data = action.value;
            return nextState;
        case VALIDER_DTPS_SORTIE_FAILED:
            nextState.showProgress = false;
            nextState.displayError = true;
            nextState.infoMessage = null;
            nextState.errorMessage = action.value;
            nextState.infoMessage = 'Succès'//action?.messagesInfo;
            return nextState;
        case VALIDER_DTPS_SORTIE_INIT:
            return initialState;
        
        default:
            nextState.showProgress = true;
            return initialState;
    }
};