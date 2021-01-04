import * as Constants from '../t6bisCreationConstants';
import T6bisCreationApi from '../../service/api/t6bisCreationApi';

export function request(action) {
    return (dispatch) => {
        console.log(dispatch);

        dispatch(inProgress(action));
        T6bisCreationApi.getAllTypeT6bis()

            .then((response) => {
                const data = response.data;
                console.log('date 1', data);
                console.log(data && data.jsonVO);
                if (data && data.jsonVO) {
                    console.log('Success');
                    console.log(action);
                    console.log(action.value);
                    action.value = data.jsonVO;
                    console.log(data.jsonVO);
                    console.log(action.value);
                    dispatch(success(action));
                } else {
                    console.log('failed');
                    dispatch(failed({ value: 'error while getting data' }));
                }
            })
            .catch((e) => {
                dispatch(failed({ value: 'error while getting data' }));
            });
    };
}

export function success(action) {
    console.log('s');
    return {
        type: Constants.CREATION_T6BIS_ALL_TYPE_SUCCES,
        value: action.value,
    };
}

export function failed(action) {
    return {
        type: Constants.CREATION_T6BIS_ALL_TYPE_FAILED,
        value: action.value,
    };
}

export function inProgress(action) {
    console.log('dispatch');
    return {
        type: Constants.CREATION_T6BIS_ALL_TYPE_IN_PROGRESS,
        value: action.value,
    };
}


export default {
    request,
    success,
    failed,
    inProgress,
};

