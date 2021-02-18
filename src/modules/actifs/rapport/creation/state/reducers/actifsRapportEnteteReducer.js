import * as Constants from '../actifsRapportCreationConstants';

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
    case Constants.ACTIFS_ENTETE_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      console.log('--> ACTIFS_ENTETE request...');
      return nextState;
    case Constants.ACTIFS_ENTETE_IN_PROGRESS:
      console.log('--> ACTIFS_ENTETE in progress...');
      return nextState;
    case Constants.ACTIFS_ENTETE_SUCCESS:
      console.log('--> ACTIFS_ENTETE success...', nextState);
      nextState.showProgress = false;
      nextState.errorMessage = null;
      return nextState;
    case Constants.ACTIFS_ENTETE_FAILED:
      console.log('--> ACTIFS_ENTETE failed...');
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
