import * as Constants from '../ctrlReconnaissanceConstants';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';

const initialState = {
    showProgress: false,
    searchMode: true,
    resultsMode: false,
    detailMode: false,
    infoMessage: null,
    errorMessage: null,
    readMode: false,
    data: {
        init: {},
        confirm: {},
        search: [],
        detail: {},
    },
};

export default (state = initialState, action) => {
    let nextState = {
        ...state,
        value: action.value,
    };

    switch (action.type) {
        case Constants.CONFIRM_RECONNAISSANCE_INIT:
            initialState.data.confirm = [];
            return initialState;
        case Constants.CONFIRM_RECONNAISSANCE_REQUEST:
            nextState.infoMessage = null;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.data.confirm = [];
            return nextState;
        case Constants.CONFIRM_RECONNAISSANCE_IN_PROGRESS:
            return nextState;
        case Constants.CONFIRM_RECONNAISSANCE_SUCCESS:
            if (action.value.dtoHeader && action.value.dtoHeader.messagesInfo && action.value.dtoHeader.messagesInfo.length > 0) {
                nextState.infoMessage = action.value.dtoHeader.messagesInfo;
            }
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.readMode = true;
            nextState.data.confirm = action.value;
            return nextState;
        case Constants.CONFIRM_RECONNAISSANCE_FAILED:
            nextState.showProgress = false;
            nextState.infoMessage = null;
            if (action.value.dtoHeader && action.value.dtoHeader.messagesErreur && action.value.dtoHeader.messagesErreur.length > 0) {
                nextState.errorMessage = action.value.dtoHeader.messagesErreur;
            } else {
                nextState.errorMessage = translate('errors.technicalIssue');
            }
            return nextState;
        case Constants.SEARCH_RECONNAISSANCE_INIT:
            initialState.data.search = [];
            return initialState;
        case Constants.SEARCH_RECONNAISSANCE_REQUEST:
            nextState.infoMessage = null;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.data.search = [];
            return nextState;
        case Constants.SEARCH_RECONNAISSANCE_IN_PROGRESS:
            return nextState;
        case Constants.SEARCH_RECONNAISSANCE_SUCCESS:
            if (action.value.dtoHeader && action.value.dtoHeader.messagesInfo && action.value.dtoHeader.messagesInfo.length > 0) {
                nextState.infoMessage = action.value.dtoHeader.messagesInfo;
            }
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.searchMode = false;
            nextState.resultsMode = true;
            nextState.data.search = action.value;
            return nextState;
        case Constants.SEARCH_RECONNAISSANCE_FAILED:
            nextState.showProgress = false;
            nextState.infoMessage = null;
            if (action.value.dtoHeader && action.value.dtoHeader.messagesErreur && action.value.dtoHeader.messagesErreur.length > 0) {
                nextState.errorMessage = action.value.dtoHeader.messagesErreur;
            } else {
                nextState.errorMessage = translate('errors.technicalIssue');
            }
            return nextState;
        case Constants.DETAIL_RECONNAISSANCE_INIT:
            initialState.data.detail = [];
            return initialState;
        case Constants.DETAIL_RECONNAISSANCE_REQUEST:
            nextState.infoMessage = null;
            nextState.errorMessage = null;
            nextState.readMode = false;
            nextState.showProgress = true;
            nextState.data.detail = [];
            return nextState;
        case Constants.DETAIL_RECONNAISSANCE_IN_PROGRESS:
            return nextState;
        case Constants.DETAIL_RECONNAISSANCE_SUCCESS:
            if (action.value.dtoHeader && action.value.dtoHeader.messagesInfo && action.value.dtoHeader.messagesInfo.length > 0) {
                nextState.infoMessage = action.value.dtoHeader.messagesInfo;
            }
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.searchMode = false;
            nextState.resultsMode = false;
            nextState.detailMode = true;
            nextState.data.detail = action.value;
            return nextState;
        case Constants.DETAIL_RECONNAISSANCE_FAILED:
            nextState.showProgress = false;
            nextState.infoMessage = null;
            if (action.value.dtoHeader && action.value.dtoHeader.messagesErreur && action.value.dtoHeader.messagesErreur.length > 0) {
                nextState.errorMessage = action.value.dtoHeader.messagesErreur;
            } else {
                nextState.errorMessage = translate('errors.technicalIssue');
            }
            return nextState;
        default:
            return nextState;
    }
};
