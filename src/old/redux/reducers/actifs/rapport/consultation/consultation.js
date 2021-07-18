import * as Constants from '../../../../../common/constants/actifs/rapport/consultation/consultation';

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
    case Constants.ACTIFS_CONSULTATION_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      console.log('--> ACTIFS_CONSULTATION request...');
      return nextState;
    case Constants.ACTIFS_CONSULTATION_IN_PROGRESS:
      console.log('--> ACTIFS_CONSULTATION in progress...');
      return nextState;
    case Constants.ACTIFS_CONSULTATION_SUCCESS:
      console.log('--> ACTIFS_CONSULTATION success...', nextState);
      nextState.showProgress = false;
      nextState.errorMessage = null;
      return nextState;
    case Constants.ACTIFS_CONSULTATION_FAILED:
      console.log('--> ACTIFS_CONSULTATION failed...');
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
