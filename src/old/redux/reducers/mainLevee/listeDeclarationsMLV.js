import * as Constants from '../../../common/constants/mainLevee/listeDeclarationsMLV';

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
    case Constants.MAINLEVEE_LISTEDECLARATIONS_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      console.log('--> MAINLEVEE_LISTEDECLARATIONS request...');
      return nextState;
    case Constants.MAINLEVEE_LISTEDECLARATIONS_IN_PROGRESS:
      console.log('--> MAINLEVEE_LISTEDECLARATIONS in progress...');
      return nextState;
    case Constants.MAINLEVEE_LISTEDECLARATIONS_SUCCESS:
      console.log('--> MAINLEVEE_LISTEDECLARATIONS success...', nextState);
      nextState.showProgress = false;
      nextState.errorMessage = null;
      return nextState;
    case Constants.MAINLEVEE_LISTEDECLARATIONS_FAILED:
      console.log('--> MAINLEVEE_LISTEDECLARATIONS failed...');
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
