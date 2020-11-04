import * as Constants from '../../../../../common/constants/actifs/rapport/creation/saisie';

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
    case Constants.ACTIFS_SAISIE_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      console.log('--> ACTIFS_SAISIE request...');
      return nextState;
    case Constants.ACTIFS_SAISIE_IN_PROGRESS:
      console.log('--> ACTIFS_SAISIE in progress...');
      return nextState;
    case Constants.ACTIFS_SAISIE_SUCCESS:
      console.log('--> ACTIFS_SAISIE success...', nextState);
      nextState.showProgress = false;
      nextState.errorMessage = null;
      return nextState;
    case Constants.ACTIFS_SAISIE_FAILED:
      console.log('--> ACTIFS_SAISIE failed...');
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
