import * as Constants from '../../../common/constants/controle/rechercheDum';

const initialState = {
  refDum: null,
  showProgress: false,
  errorMessage: null,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.RECHERCHEDUM_INITCONTROLE_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      console.log('--> initControle request...');
      return nextState;
    case Constants.RECHERCHEDUM_INITCONTROLE_IN_PROGRESS:
      console.log('--> initControle in progress...');
      return nextState;
    case Constants.RECHERCHEDUM_INITCONTROLE_SUCCESS:
      console.log('--> initControle success...', nextState);
      nextState.showProgress = false;
      nextState.errorMessage = null;
      return nextState;
    case Constants.RECHERCHEDUM_INITCONTROLE_FAILED:
      console.log('--> initControle failed...');
      nextState.showProgress = false;
      nextState.errorMessage = action.value.dtoHeader
        ? action.value.dtoHeader.messagesErreur
        : action.value;
      return nextState;
    case Constants.RECHERCHEDUM_INITCONTROLE_INIT:
      return initialState;
    case Constants.RECHERCHEDUM_LISTDECLARATION_REQUEST:
        nextState.showProgress = true;
        nextState.errorMessage = null;
        return nextState;
        case Constants.RECHERCHEDUM_LISTDECLARATION_IN_PROGRESS:
      return nextState;
    case Constants.RECHERCHEDUM_LISTDECLARATION_SUCCESS:
      nextState.showProgress = false;
      nextState.errorMessage = null;
      return nextState;
    case Constants.RECHERCHEDUM_LISTDECLARATION_FAILED:
      nextState.showProgress = false;
      nextState.errorMessage = action.value.dtoHeader.messagesErreur;
      return nextState;
      case Constants.RECHERCHEDUM_LISTDECLARATION_INIT:
      return initialState;
    default:
      nextState.showProgress = false;
      return initialState;
  }
};
