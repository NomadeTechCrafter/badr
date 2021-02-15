
/**Constants */
import { mapErrors } from '../../../utils/t6bisUtils';
import * as Constants from '../t6bisRechercheConstants';



const initialState = {
  showProgress: false,
  errorMessage: null
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.T6BIS_INIT_FOR_UPDATE_REQUEST:
      return nextState;
    case Constants.T6BIS_INIT_FOR_UPDATE_IN_PROGRESS:
      return nextState;
    case Constants.T6BIS_INIT_FOR_UPDATE_SUCCES:
      return nextState;
    case Constants.T6BIS_INIT_FOR_UPDATE_FAILED:
    case Constants.T6BIS_INIT_FOR_REDRESSER_FAILED:
      nextState.errorMessage=showErrors(action.value);
      return nextState;
    case Constants.T6BIS_INIT_FOR_REDRESSER_REQUEST:
      return nextState;
    case Constants.T6BIS_INIT_FOR_REDRESSER_IN_PROGRESS:
      return nextState;
    case Constants.T6BIS_INIT_FOR_REDRESSER_SUCCES:
      return nextState;
    default:
      nextState.showProgress = false;
      return initialState;
  }
};

const showErrors = function (messages) {
  
  return mapErrors(messages);
}

