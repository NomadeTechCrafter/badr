import * as Constants from '../actifsRapportRechercheConstants';

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
    case Constants.ACTIFS_RECHERCHE_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      console.log('--> ACTIFS_RECHERCHE request...');
      return nextState;
    case Constants.ACTIFS_RECHERCHE_IN_PROGRESS:
      console.log('--> ACTIFS_RECHERCHE in progress...');
      return nextState;
    case Constants.ACTIFS_RECHERCHE_SUCCESS:
      // console.log('--> ACTIFS_RECHERCHE success...', nextState);
      nextState.showProgress = false;
      nextState.errorMessage = null;
      return nextState;
    case Constants.ACTIFS_RECHERCHE_FAILED:
      console.log('--> ACTIFS_RECHERCHE failed...');
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
