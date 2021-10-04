/**Constants */
import {
    CONSULTATION_BLE_FAILED,
    CONSULTATION_BLE_IN_PROGRESS,
    CONSULTATION_BLE_INIT,
    CONSULTATION_BLE_REQUEST,
    CONSULTATION_BLE_SUCCESS,
} from '../eciConsultationBLEConstants';

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
        case CONSULTATION_BLE_REQUEST:
            nextState.displayError = false;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.data = [];
            return nextState;
        case CONSULTATION_BLE_IN_PROGRESS:
            return nextState;
        case CONSULTATION_BLE_SUCCESS:
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.data = action.value;
            return nextState;
        case CONSULTATION_BLE_FAILED:
            nextState.showProgress = false;
            nextState.displayError = true;
            nextState.errorMessage = action.value;
            return nextState;
        case CONSULTATION_BLE_INIT:
            return initialState;
        default:
            nextState.showProgress = true;
            return initialState;
    }
};