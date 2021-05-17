/**Constants */
import * as Constants from '../ecorExpConfirmationEntreeConstants';

const initialState = {
  showProgress: false,
  errorMessage: '',
  displayError: false,
  data: {
    listDeclaration: [],
    initConfirmerEntreeVO: {},
    ecorIsSaved: false,
    alreadyConfirmed: false,
  },
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.INITCONFIRMATIONENTREE_REQUEST:
      nextState.displayError = false;
      nextState.errorMessage = null;
      nextState.showProgress = true;
      nextState.data = {listDeclaration: [], initConfirmerEntreeVO: {}};
      return nextState;
    case Constants.INITCONFIRMATIONENTREE_IN_PROGRESS:
      return nextState;
    case Constants.INITCONFIRMATIONENTREE_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      console.log(
        ' in success reducer ',
        prepareConfirm(action.value.data.jsonVO, action.value.refDeclaration),
      );
      nextState.data = prepareConfirm(
        action.value.data.jsonVO,
        action.value.refDeclaration,
      );
      return nextState;
    case Constants.INITCONFIRMATIONENTREE_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.errorMessage = action.value;
      return nextState;
    case Constants.INITCONFIRMATIONENTREE_INIT:
      return initialState;

    case Constants.INITCONFIRMATIONENTREE_ETATCHARGEMENT_REQUEST:
      nextState.displayError = false;
      nextState.errorMessage = null;
      nextState.showProgress = true;
      nextState.data = [];
      return nextState;
    case Constants.INITCONFIRMATIONENTREE_ETATCHARGEMENT_IN_PROGRESS:
      return nextState;
    case Constants.INITCONFIRMATIONENTREE_ETATCHARGEMENT_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data = action.value.data;
      return nextState;
    case Constants.INITCONFIRMATIONENTREE_ETATCHARGEMENT_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.errorMessage = action.value;
      return nextState;
    case Constants.INITCONFIRMATIONENTREE_ETATCHARGEMENT_INIT:
      return initialState;
    case Constants.INITCONFIRMATIONENTREE_UPDATE_VO:
      nextState.data.initConfirmerEntreeVO = action.value;
      return nextState;
    default:
      nextState.showProgress = true;
      return initialState;
  }
};

const prepareConfirm = (declaration, referenceDum) => {
  let declarationDum = '';
  let listDeclaration = [];
  let ecorIsSaved = false;
  let repObj = {};
  if (declaration.refDedServices) {
    declarationDum = {
      identifiantDED: '',
      dateEnregistrement: declaration.refDedServices.dateEnregistrement,
      operateurDeclarant: declaration.refDedServices.operateurDeclarant,
      poidsBruts: declaration.refDedServices.poidsBruts,
      poidsNet: declaration.refDedServices.poidsNet,
      valeurDeclaree: declaration.refDedServices.valeurDeclaree,
      nombreContenants: declaration.refDedServices.nombreContenants,
      libelleTypeDED: declaration.refDedServices.libelleTypeDED,
      operateurImportateurExportateur: '',
      typeDeD: declaration.refDedServices.typeDeD,
      numeroVersion: '',
      referenceEnregistrement: referenceDum,
      dedProvisionnelle: false,
    };
  } else {
    declarationDum = {
      identifiantDED: '',
      dateEnregistrement: declaration.dateEnregistrement,
      operateurDeclarant: declaration.operateurDeclarant,
      poidsBruts: declaration.poidsBruts,
      poidsNet: declaration.poidsNet,
      valeurDeclaree: declaration.valeurDeclaree,
      nombreContenants: declaration.nombreContenants,
      libelleTypeDED: declaration.libelleTypeDED,
      operateurImportateurExportateur: '',
      typeDeD: declaration.typeDeD,
      numeroVersion: '',
      referenceEnregistrement: referenceDum,
      dedProvisionnelle: false,
    };
  }

  if (declaration.dateEntree) {
    ecorIsSaved = true;
  }
  listDeclaration.push(declarationDum);

  repObj = {
    listDeclaration: listDeclaration,
    initConfirmerEntreeVO: declaration,
    ecorIsSaved: ecorIsSaved,
    alreadyConfirmed: !(
      !declaration.dateHeureEntree || declaration.dateHeureEntree.length === 0
    ),
  };

  return repObj;
};
