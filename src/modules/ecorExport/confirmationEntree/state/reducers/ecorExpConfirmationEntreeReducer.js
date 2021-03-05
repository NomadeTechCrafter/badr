/**Constants */
import * as Constants from '../ecorExpConfirmationEntreeConstants';

const initialState = {
  showProgress: false,
  errorMessage: '',
  displayError: false,
  data: [],
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
      nextState.data = [];
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
    default:
      nextState.showProgress = true;
      return initialState;
  }
};

const prepareConfirm = (declaration, referenceDum) => {
  let declarationDum = '';
  let listDeclaration = [];
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
  let ecorIsSaved = false;
  if (declarationDum.dateEntree) {
    ecorIsSaved = true;
  }
  listDeclaration.push(declarationDum);
  console.log(' in prepar reducer ', listDeclaration);
  return listDeclaration;

  //checkAlreadyConfirmed(declaration);
  /* if ($scope.alreadyConfirmed) {
    if (declaration.documentEntreeEnceinte) {
      $scope.referenceDocument = declaration.documentEntreeEnceinte;
    }
    var dateValueArray = declaration.dateHeureEntree.split(' ')[0].split('/');
    if (declaration.dateHeureEntree) {
      $scope.dateConfirmation = new Date(
        dateValueArray[2] + ' ' + dateValueArray[1] + ' ' + dateValueArray[0],
      );
      var hourValue = declaration.dateHeureEntree.split(' ')[1];
      $scope.heureConfirmation = hourValue;
    }
    $scope.ecorIsSaved = true;
  } else {
    $scope.ecorIsSaved = false;
  }
  $scope.listeNombreDeScelles = declaration.scellesConfirmationEntree
    ? declaration.scellesConfirmationEntree
    : [];
    */
};
