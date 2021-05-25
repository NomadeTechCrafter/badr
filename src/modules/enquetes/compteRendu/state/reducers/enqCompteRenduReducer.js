import * as Constants from '../enqCompteRenduConstants';
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
        search: {
            results: [],
            detail: {},
        },
    },
};

export default (state = initialState, action) => {
    let nextState = {
        ...state,
        value: action.value,
    };

    switch (action.type) {
        case Constants.INIT_COMPTE_RENDU_INIT:
            initialState.data.init = [];
            return initialState;
        case Constants.INIT_COMPTE_RENDU_REQUEST:
            nextState.infoMessage = null;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            return nextState;
        case Constants.INIT_COMPTE_RENDU_IN_PROGRESS:
            return nextState;
        case Constants.INIT_COMPTE_RENDU_SUCCESS:
            nextState.infoMessage = null;
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.data.init.listNatureVehicule = action.value.natureVehiculeData.jsonVO;
            nextState.data.init.listUniteMesure = action.value.uniteMesureData.jsonVO;
            return nextState;
        case Constants.INIT_COMPTE_RENDU_FAILED:
            nextState.showProgress = false;
            nextState.infoMessage = null;
            if (action.value.dtoHeader && action.value.dtoHeader.messagesErreur && action.value.dtoHeader.messagesErreur.length > 0) {
                nextState.errorMessage = action.value.dtoHeader.messagesErreur;
            } else {
                nextState.errorMessage = translate('errors.technicalIssue');
            }
            return nextState;
        case Constants.CONFIRM_COMPTE_RENDU_INIT:
            initialState.data.confirm = [];
            return initialState;
        case Constants.CONFIRM_COMPTE_RENDU_REQUEST:
            nextState.infoMessage = null;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            return nextState;
        case Constants.CONFIRM_COMPTE_RENDU_IN_PROGRESS:
            return nextState;
        case Constants.CONFIRM_COMPTE_RENDU_SUCCESS:
            if (action.value.dtoHeader && action.value.dtoHeader.messagesInfo && action.value.dtoHeader.messagesInfo.length > 0) {
                nextState.infoMessage = action.value.dtoHeader.messagesInfo;
            }
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.data.confirm = action.value;
            return nextState;
        case Constants.CONFIRM_COMPTE_RENDU_FAILED:
            nextState.showProgress = false;
            nextState.infoMessage = null;
            if (action.value.dtoHeader && action.value.dtoHeader.messagesErreur && action.value.dtoHeader.messagesErreur.length > 0) {
                nextState.errorMessage = action.value.dtoHeader.messagesErreur;
            } else {
                nextState.errorMessage = translate('errors.technicalIssue');
            }
            return nextState;
        case Constants.SEARCH_COMPTE_RENDU_INIT:
            initialState.data.search.results = [];
            initialState.data.search.detail = [];
            return initialState;
        case Constants.SEARCH_COMPTE_RENDU_REQUEST:
            nextState.infoMessage = null;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            return nextState;
        case Constants.SEARCH_COMPTE_RENDU_IN_PROGRESS:
            return nextState;
        case Constants.SEARCH_COMPTE_RENDU_SUCCESS:
            if (action.value.dtoHeader && action.value.dtoHeader.messagesInfo && action.value.dtoHeader.messagesInfo.length > 0) {
                nextState.infoMessage = action.value.dtoHeader.messagesInfo;
            }
            nextState.errorMessage = null;
            nextState.showProgress = false;

            if (action.value.missionVOList.length === 1) {
                nextState.searchMode = false;
                nextState.detailMode = true;
                nextState.data.search.detail = action.value;
            } else {
                nextState.showResults = true;
                nextState.data.search.results = action.value;
            }

            return nextState;
        case Constants.SEARCH_COMPTE_RENDU_FAILED:
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
