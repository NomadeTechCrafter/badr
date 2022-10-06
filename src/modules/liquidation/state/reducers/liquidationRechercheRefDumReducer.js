import * as Constants from '../liquidationRechercheRefDumConstants';

const initialState = {
  showProgress: false,
  errorMessage: null,
  data: null,
  liquidationType: null,
  indicateurLiquidationArticlesEnFranchiseTotale: false,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.RECHERCHEREFDUM_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      return nextState;
    case Constants.RECHERCHEREFDUM_IN_PROGRESS:
      return nextState;
    case Constants.RECHERCHEREFDUM_SUCCESS:
      nextState.showProgress = false;
      nextState.errorMessage = null;
      nextState.data = action.value.data.jsonVO;
      nextState.liquidationType = action.value.liquidationType;
      nextState.indicateurLiquidationArticlesEnFranchiseTotale =
        action.value.indicateurLiquidationArticlesEnFranchiseTotale;
      nextState.infoMessage = action.value?.data?.dtoHeader?.messagesInfo;
      console.log(
        'inforeducerm_RECHERCHEREFDUM_SUCCESS',
        nextState.infoMessage,
      );
      return nextState;
    case Constants.RECHERCHEREFDUM_UPDATE:
      nextState.showProgress = false;
      nextState.errorMessage = null;
      nextState.data = action.value.data.jsonVO;
      return nextState;
    case Constants.RECHERCHEREFDUM_FAILED:
      nextState.showProgress = false;
      nextState.errorMessage = action.value.dtoHeader
        ? action.value.dtoHeader.messagesErreur
        : action.value;
      return nextState;
    case Constants.RECHERCHEREFDUM_INIT:
      return initialState;
    default:
      return initialState;
  }
};
