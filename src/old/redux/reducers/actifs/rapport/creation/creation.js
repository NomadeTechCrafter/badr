import * as Constants from '../../../../../common/constants/actifs/rapport/creation/creation';

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
    case Constants.ACTIFS_CREATION_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      console.log('--> ACTIFS_CREATION request...');
      return nextState;
    case Constants.ACTIFS_CREATION_IN_PROGRESS:
      console.log('--> ACTIFS_CREATION in progress...');
      return nextState;
    case Constants.ACTIFS_CREATION_SUCCESS:
      console.log('--> ACTIFS_CREATION success...', nextState);
      nextState.showProgress = false;
      nextState.errorMessage = null;
      return nextState;
    case Constants.ACTIFS_CREATION_FAILED:
      console.log('--> ACTIFS_CREATION failed...');
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
