/**Constants */
import {
  GENERIC_LIQ_FAILED,
  GENERIC_LIQ_IN_PROGRESS,
  GENERIC_LIQ_INIT,
  GENERIC_LIQ_REQUEST,
  GENERIC_LIQ_SUCCESS,
} from '../liquidationConstants';

const initialState = {
  showProgress: false,
  errorMessage: null,
  messagesInfo: null,
  repData: {
    empty: {
      showProgress: false,
      loaded: false,
      data: [],
    },
  },
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case GENERIC_LIQ_REQUEST:
      nextState.showProgress = true;
      nextState.repData[action.value.command] = { showProgress: true };
      return nextState;
    case GENERIC_LIQ_IN_PROGRESS:
      nextState.showProgress = true;
      nextState.repData[action.value.command] = { showProgress: true };
      return nextState;
    case GENERIC_LIQ_SUCCESS:
      // console.log('Sucess reducer---', JSON.stringify(action))
      // console.log('Sucess reducer---', JSON.stringify(action.value.data?.dtoHeader?.messagesInfo))
      nextState.showProgress = false;
      nextState.messagesInfo = action.value.data?.dtoHeader?.messagesInfo;
      nextState.errorMessage = null;
      nextState.repData[action.value.command] = {
        data: action.value.data,
        errorMessage: null,
        showProgress: false,
      };
      console.log('Sucess reducer nextState --- ', JSON.stringify(nextState))
      return nextState;
    case GENERIC_LIQ_FAILED:
      nextState.showProgress = false;
      // console.log('Error reducer---', JSON.stringify(action))
      nextState.errorMessage = action.value.data?.dtoHeader?.messagesErreur;
      nextState.messagesInfo = null;
      nextState.repData[action.value.command] = {
        errorMessage: action.value.data?.messagesErreur,
        displayError: true,
        showProgress: false,
      };
      console.log('Error reducer nextState --- ', JSON.stringify(nextState))
      return nextState;
    case GENERIC_LIQ_INIT:
      nextState.repData[action.value.command] = {
        data: [],
        errorMessage: {},
        showProgress: false,
        displayError: false,
      };
      return nextState;
    default:
      return nextState ? nextState : initialState;
  }
};
