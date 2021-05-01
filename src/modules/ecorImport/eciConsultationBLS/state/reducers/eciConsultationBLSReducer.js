/**Constants */
import {
    CONSULTATION_BLS_FAILED,
    CONSULTATION_BLS_IN_PROGRESS,
    CONSULTATION_BLS_INIT,
    CONSULTATION_BLS_REQUEST,
    CONSULTATION_BLS_SUCCESS,
} from '../eciConsultationBLSConstants';

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
        case CONSULTATION_BLS_REQUEST:
            nextState.displayError = false;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.data = [];
            return nextState;
        case CONSULTATION_BLS_IN_PROGRESS:
            return nextState;
        case CONSULTATION_BLS_SUCCESS:
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.data = action.value;
            return nextState;
        case CONSULTATION_BLS_FAILED:
            nextState.showProgress = false;
            nextState.displayError = true;
            nextState.errorMessage = action.value;
            return nextState;
        case CONSULTATION_BLS_INIT:
            return initialState;
        default:
            nextState.showProgress = true;
            return initialState;
    }
};