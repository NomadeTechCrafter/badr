/**Constants */
import { INIT_CAUTION_SECTION_FAILED, INIT_CAUTION_SECTION_IN_PROGRESS, INIT_CAUTION_SECTION_REQUEST, INIT_CAUTION_SECTION_SUCCESS, REDRESSEMENT_UPDATE } from '../../../modules/dedouanement/redressement/state/DedRedressementConstants';
import * as Constants from '../../constants/generic/ComGenericConstants';

const initialState = {
  refresh: false,
  showProgress: false,
  errorMessage: '',
  errorMessage2: '',
  displayError: false,
  data: [],
  fromWhere1: '',
  messageInfo: '',
  fromLiquidation: false,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.GENERIC_REQUEST:
      nextState.refresh = false;
      nextState.displayError = false;
      nextState.errorMessage = null;
      nextState.showProgress = true;
      nextState.data = [];
      return nextState;
    case Constants.GENERIC_IN_PROGRESS:
      nextState.showProgress = true;
      return nextState;
    case Constants.GENERIC_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data = action.value.data;
      nextState.isRedressementDUM = (typeof action.value.isRedressementDUM != "undefined") && (action.value.isRedressementDUM);
      nextState.searchData = action.value.searchParams;
      nextState.fromWhere1 = action.value.fromWhere1;
      nextState.fromLiquidation = action.value.fromLiquidation;
      nextState.messageInfo = action.value.messageInfo;
      nextState.readOnly = !(action.value.searchParams === '') ;
      
      return nextState;
    case Constants.GENERIC_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.errorMessage = action.value.data;
      nextState.errorMessage2 = action.value.errorMessage;
      return nextState;
    case Constants.GENERIC_REFRESH:
      nextState.refresh = true;
      return nextState;
    case Constants.GENERIC_INIT_REFRESH:
      nextState.refresh = false;
      return nextState;
    
    case Constants.GENERIC_INIT:
      return initialState;
    case REDRESSEMENT_UPDATE:
      nextState.data = action.value;
      return nextState;
    case INIT_CAUTION_SECTION_REQUEST:
      nextState.showProgress = true;
      nextState.messageInfo = null;
      nextState.errorMessage = null;
      return nextState;
    case INIT_CAUTION_SECTION_IN_PROGRESS:
      nextState.showProgress = true;
      return nextState;
    case INIT_CAUTION_SECTION_SUCCESS:
      console.log(INIT_CAUTION_SECTION_SUCCESS);
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data = action.value;
      console.log(INIT_CAUTION_SECTION_SUCCESS);
      return nextState;
    case INIT_CAUTION_SECTION_FAILED:
      nextState.showProgress = false;
      if (action.value.dtoHeader) {
        nextState.errorMessage = action.value.dtoHeader.messagesErreur
          ? action.value.dtoHeader.messagesErreur
          : action.value;
      } else {
        nextState.errorMessage = translate('errors.technicalIssue');
      }
      return nextState;
    default:
      return nextState ? nextState : initialState;
  }
};
