import * as Constants from '../t6bisGestionConstants';

export function request(action) {
    return (dispatch) => {
        
        dispatch(inProgress(action));

        if (action) {
            dispatch(success(action));

        } else {
            dispatch(failed({ value: 'Error' }));
        }

    };
}

export function success(action) {
    return {
        type: Constants.T6BIS_UPDATE_OPERATEUR_SUCCES,
        value: action.value,
    };
}

export function failed(action) {
    return {
        type: Constants.T6BIS_UPDATE_OPERATEUR_FAILD,
        value: action.value,
    };
}

export function inProgress(action) {
    return {
        type: Constants.T6BIS_UPDATE_OPERATEUR_IN_PROGRESS,
        value: action.value,
    };
}




export default {
    request,
    success,
    failed,
    inProgress,
};

