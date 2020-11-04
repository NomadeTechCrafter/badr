import * as Constants from '../../../../../common/constants/actifs/rapport/creation/details';

const initialState = {
  showProgress: false,
  errorMessage: null,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.ACTIFS_DETAILS_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      console.log('--> ACTIFS_DETAILS request...');
      return nextState;
    case Constants.ACTIFS_DETAILS_IN_PROGRESS:
      console.log('--> ACTIFS_DETAILS in progress...');
      return nextState;
    case Constants.ACTIFS_DETAILS_SUCCESS:
      console.log('--> ACTIFS_DETAILS success...', nextState);
      nextState.showProgress = false;
      nextState.errorMessage = null;
      return nextState;
    case Constants.ACTIFS_DETAILS_FAILED:
      console.log('--> ACTIFS_DETAILS failed...');
      nextState.showProgress = false;
      nextState.errorMessage = action.value.dtoHeader
        ? action.value.dtoHeader.messagesErreur
        : action.value;
      return nextState;

    default:
      nextState.showProgress = false;
      return initialState;
  }
};
