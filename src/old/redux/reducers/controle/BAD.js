import * as Constants from '../../../common/constants/controle/BAD';

const initialState = {
  showProgress: false,
  errorMessage: null,
  data: null,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.DETAIL_BAD_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      nextState.reponseData = null;
      return nextState;
    case Constants.DETAIL_BAD_IN_PROGRESS:
      return nextState;
    case Constants.DETAIL_BAD_SUCCESS:
      nextState.showProgress = false;
      nextState.errorMessage = null;
      nextState.data = action.value;
      return nextState;
    case Constants.DETAIL_BAD_FAILED:
      nextState.showProgress = false;
      nextState.errorMessage =
        action.value.dtoHeader && action.value.dtoHeader.messagesErreur
          ? action.value.dtoHeader.messagesErreur
          : action.value;
      nextState.data = null;
      return nextState;
    default:
      nextState.showProgress = false;
      return initialState;
  }
};
