/**Constants */
import * as Constants from '../rechercheAutoriserAcheminementConstants';
import {translate} from '../../../../../../commons/i18n/ComI18nHelper';
const initialState = {
  showProgress: false,
  errorMessage: '',
  infoMessage: '',
  displayError: false
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.INIT_AUTORISER_ACHEMINEMENT_REQUEST:
      nextState.displayError = false;
      nextState.errorMessage = null;
      nextState.showProgress = true;
      nextState.data = {listDeclaration: [], initConfirmerEntreeVO: {}};
      return nextState;
    case Constants.INIT_AUTORISER_ACHEMINEMENT_IN_PROGRESS:
      return nextState;
    case Constants.INIT_AUTORISER_ACHEMINEMENT_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      /* console.log(
        ' in success reducer ',
        prepareConfirm(action.value.data.jsonVO, action.value.refDeclaration),
      );
      nextState.data = prepareConfirm(
        action.value.data.jsonVO,
        action.value.refDeclaration,
      ); */
      return nextState;
    case Constants.INIT_AUTORISER_ACHEMINEMENT_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      if (action.value.dtoHeader) {
        nextState.errorMessage = action.value.dtoHeader.messagesErreur
          ? action.value.dtoHeader.messagesErreur
          : action.value;
      } else {
        nextState.errorMessage = translate('errors.technicalIssue');
      }
      return nextState;

    default:
      nextState.showProgress = true;
      return initialState;
  }
};


