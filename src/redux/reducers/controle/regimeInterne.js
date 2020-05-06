import * as Constants from '../../../common/constants/controle/regimeInterne';

const initialState = {
  showProgress: false,
  errorMessage: null,
  successMessage: null,
  historiqueCompte: null,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.REGIMEINTERNE_VALIDATESAVE_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      nextState.successMessage = null;
      nextState.historiqueCompte = null;
      console.log('--> ValiderSave request...');
      return nextState;
    case Constants.REGIMEINTERNE_VALIDATESAVE_IN_PROGRESS:
      console.log('--> ValiderSave in progress...');
      return nextState;
    case Constants.REGIMEINTERNE_VALIDATESAVE_SUCCESS:
      console.log('--> ValiderSave success...');
      nextState.showProgress = false;
      nextState.errorMessage = null;
      nextState.successMessage = action.value.dtoHeader.messagesInfo;
      nextState.historiqueCompte = action.value.jsonVO['historiqueCompte'];
      return nextState;
    case Constants.REGIMEINTERNE_VALIDATESAVE_FAILED:
      console.log('--> ValiderSave failed...');
      nextState.showProgress = false;
      nextState.errorMessage = (action.value.dtoHeader.messagesErreur)? action.value.dtoHeader.messagesErreur : action.value ;
      return nextState;
    default:
      nextState.showProgress = false;
      return initialState;
  }
};
