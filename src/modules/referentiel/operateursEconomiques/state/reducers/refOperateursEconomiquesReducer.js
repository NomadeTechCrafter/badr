import * as Constants from '../refOperateursEconomiquesConstants';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';

const initialState = {
    showProgress: false,
    searchMode: true,
    showResults: false,
    detailMode: false,
    infoMessage: null,
    errorMessage: null,
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
        case Constants.INIT_OPERATEURS_ECONOMIQUES_INIT:
            initialState.data.init = [];
            return initialState;
        case Constants.INIT_OPERATEURS_ECONOMIQUES_REQUEST:
            nextState.infoMessage = null;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.showResults = false;
            nextState.data.init = [];
            return nextState;
        case Constants.INIT_OPERATEURS_ECONOMIQUES_IN_PROGRESS:
            return nextState;
        case Constants.INIT_OPERATEURS_ECONOMIQUES_SUCCESS:
            nextState.infoMessage = null;
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.data.init = action.value;
            return nextState;
        case Constants.INIT_OPERATEURS_ECONOMIQUES_FAILED:
            nextState.showProgress = false;
            nextState.infoMessage = null;
            if (action.value.dtoHeader && action.value.dtoHeader.messagesErreur && action.value.dtoHeader.messagesErreur.length > 0) {
                nextState.errorMessage = action.value.dtoHeader.messagesErreur;
            } else {
                nextState.errorMessage = translate('errors.technicalIssue');
            }
            return nextState;
        case Constants.CONFIRM_OPERATEURS_ECONOMIQUES_INIT:
            initialState.data.confirm = [];
            return initialState;
        case Constants.CONFIRM_OPERATEURS_ECONOMIQUES_REQUEST:
            nextState.infoMessage = null;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.data.confirm = [];
            return nextState;
        case Constants.CONFIRM_OPERATEURS_ECONOMIQUES_IN_PROGRESS:
            return nextState;
        case Constants.CONFIRM_OPERATEURS_ECONOMIQUES_SUCCESS:
            if (action.value.dtoHeader && action.value.dtoHeader.messagesInfo && action.value.dtoHeader.messagesInfo.length > 0) {
                nextState.infoMessage = action.value.dtoHeader.messagesInfo;
            }
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.data.confirm = action.value;
            return nextState;
        case Constants.CONFIRM_OPERATEURS_ECONOMIQUES_FAILED:
            nextState.showProgress = false;
            nextState.infoMessage = null;
            if (action.value.dtoHeader && action.value.dtoHeader.messagesErreur && action.value.dtoHeader.messagesErreur.length > 0) {
                nextState.errorMessage = action.value.dtoHeader.messagesErreur;
            } else {
                nextState.errorMessage = translate('errors.technicalIssue');
            }
            return nextState;
        case Constants.SEARCH_OPERATEURS_ECONOMIQUES_INIT:
            initialState.data.search = [];
            return initialState;
        case Constants.SEARCH_OPERATEURS_ECONOMIQUES_REQUEST:
            nextState.infoMessage = null;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.data.search = [];
            return nextState;
        case Constants.SEARCH_OPERATEURS_ECONOMIQUES_IN_PROGRESS:
            return nextState;
        case Constants.SEARCH_OPERATEURS_ECONOMIQUES_SUCCESS:
            if (action.value.dtoHeader && action.value.dtoHeader.messagesInfo && action.value.dtoHeader.messagesInfo.length > 0) {
                nextState.infoMessage = action.value.dtoHeader.messagesInfo;
            }
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.showResults = true;
            nextState.data.search = action.value;
            return nextState;
        case Constants.SEARCH_OPERATEURS_ECONOMIQUES_FAILED:
            nextState.showProgress = false;
            nextState.infoMessage = null;
            if (action.value.dtoHeader && action.value.dtoHeader.messagesErreur && action.value.dtoHeader.messagesErreur.length > 0) {
                nextState.errorMessage = action.value.dtoHeader.messagesErreur;
            } else {
                nextState.errorMessage = translate('errors.technicalIssue');
            }
            return nextState;
        case Constants.DETAIL_OPERATEURS_ECONOMIQUES_INIT:
            initialState.data.detail = [];
            return initialState;
        case Constants.DETAIL_OPERATEURS_ECONOMIQUES_REQUEST:
            nextState.infoMessage = null;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.data.detail = [];
            return nextState;
        case Constants.DETAIL_OPERATEURS_ECONOMIQUES_IN_PROGRESS:
            return nextState;
        case Constants.DETAIL_OPERATEURS_ECONOMIQUES_SUCCESS:
            if (action.value.dtoHeader && action.value.dtoHeader.messagesInfo && action.value.dtoHeader.messagesInfo.length > 0) {
                nextState.infoMessage = action.value.dtoHeader.messagesInfo;
            }
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.searchMode = false;
            nextState.detailMode = true;
            nextState.data.detail = action.value;
            return nextState;
        case Constants.DETAIL_OPERATEURS_ECONOMIQUES_FAILED:
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
