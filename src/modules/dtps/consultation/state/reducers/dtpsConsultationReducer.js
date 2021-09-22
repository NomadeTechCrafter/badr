/**Constants */
import {
    DTPS_CONSULTATION_FAILED,
    DTPS_CONSULTATION_IN_PROGRESS,
    DTPS_CONSULTATION_INIT,
    DTPS_CONSULTATION_REQUEST,
    DTPS_CONSULTATION_SUCCESS,
} from '../dtpsConsultationConstants';

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
        case DTPS_CONSULTATION_REQUEST:
            nextState.displayError = false;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.data = [];
            return nextState;
        case DTPS_CONSULTATION_IN_PROGRESS:
            return nextState;
        case DTPS_CONSULTATION_SUCCESS:
            nextState.errorMessage = null;
            nextState.showProgress = false;

            function transformDTPS(dtps) {
                dtps.avecScanner + '' === "true" ? dtps.avecScanner = 'Avec' : dtps.avecScanner = 'Sans';
                let newDTPS = dtps;
                return newDTPS;
            }
            
            let listDTPS = action.value.map(dtps => transformDTPS(dtps));
            // let listDTPS = action.value;
            nextState.data = listDTPS;
            return nextState;
        case DTPS_CONSULTATION_FAILED:
            nextState.showProgress = false;
            nextState.displayError = true;
            nextState.errorMessage = action.value;
            return nextState;
        case DTPS_CONSULTATION_INIT:
            return initialState;
        default:
            nextState.showProgress = true;
            return initialState;
    }
};