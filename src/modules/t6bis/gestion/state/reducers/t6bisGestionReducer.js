
/**Constants */
import * as Constants from '../t6bisGestionConstants';
import { getCurrentArticle, hasAtLeastOneTaxationLine } from "../../../utils/t6bisUtils";

const initialState = {
  confirmed: false,
  showProgress: false,
  displayError: false,
  t6bisEnteteData: null,
  t6bis: null,
  identifiants: null,
  listmoyenpaiement: null,
  haslignetaxation: null,
  redevableResponse: null,
  newIntervenant: null,
  infoCompleted: null

};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  console.log('t6bisGestionReducer--action.type', action.type);
  switch (action.type) {
    case Constants.T6BIS_INIT_ENTETE_REQUEST:
      console.log(Constants.T6BIS_INIT_FOR_CREATION_REQUEST);
      nextState.displayError = false;
      nextState.correct = false;
      nextState.showProgress = true;
      return nextState;
    case Constants.T6BIS_INIT_ENTETE_IN_PROGRESS:
      return nextState;
    case Constants.T6BIS_INIT_ENTETE_SUCCES:
      nextState.showProgress = false;
      nextState.confirmed = true;
      nextState.t6bisEnteteData = action.value;
      nextState.t6bis = action.value.t6bisMtmDto;
      nextState.identifiants = action.value.listTypeIdentifiant;
      nextState.listmoyenpaiement = action.value.typeMoyenPaiementList;
      nextState.currentArticle = getCurrentArticle(action.value.t6bisMtmDto.codeTypeT6bis);
      nextState.haslignetaxation = hasAtLeastOneTaxationLine(nextState.t6bis);
      return nextState;
    case Constants.T6BIS_INIT_ENTETE_FAILED:
      console.log(Constants.T6BIS_INIT_ENTETE_FAILED);
      nextState.showProgress = false;
      nextState.cofirmed = false;
      nextState.displayError = true;
      nextState.errorMessage = action.value;
      return nextState;
    case Constants.FIND_INTERVENANT_REQUEST:
      console.log(Constants.T6BIS_INIT_FOR_CREATION_REQUEST);
      nextState.displayError = false;
      nextState.correct = false;
      nextState.showProgress = true;
      nextState.infoCompleted = false;
      nextState.newIntervenant = false;
      return nextState;
    case Constants.FIND_INTERVENANT_IN_PROGRESS:
      return nextState;
    case Constants.FIND_INTERVENANT_SUCCES:
      nextState.showProgress = false;
      nextState.confirmed = true;
      nextState.t6bis.infoCompleted = true;
      nextState.t6bis.newIntervenant = false;
      nextState.t6bis.retourFindIntervenant = true;
      startRedevableCompletion(nextState.t6bis, action.value);
      return nextState;
    case Constants.FIND_INTERVENANT_FAILED:
      console.log(Constants.T6BIS_INIT_ENTETE_FAILED);
      nextState.showProgress = false;
      nextState.cofirmed = false;
      nextState.t6bis.infoCompleted = true;
      nextState.t6bis.newIntervenant = true;
      nextState.t6bis.retourFindIntervenant = true;
      clearRedevableCompletion(nextState.t6bis);
      return nextState;
    case Constants.T6BIS_UPDATE_PROPS_REQUEST:
      return nextState;
    case Constants.T6BIS_UPDATE_PROPS_IN_PROGRESS:
      return nextState;
    case Constants.T6BIS_UPDATE_PROPS_SUCCES:
      nextState.t6bis.listeArticleT6bis = action.value.listeArticleT6bis;
      nextState.currentArticle = action.value.currentArticle;

      return nextState;
    case Constants.T6BIS_UPDATE_PROPS_FAILED:
      return nextState;
    case Constants.T6BIS_UPDATE_INTERVENANT_REQUEST:
      return nextState;
    case Constants.T6BIS_UPDATE_INTERVENANT_IN_PROGRESS:
      return nextState;
    case Constants.T6BIS_UPDATE_INTERVENANT_SUCCES:
      nextState.fieldsetcontext = action.value.fieldsetcontext;
      return nextState;
    case Constants.T6BIS_UPDATE_INTERVENANT_FAILED:
      return nextState;
    default:
      return nextState ? nextState : initialState;
  }



};

const startRedevableCompletion = function (t6bis, redevableResponse) {
  console.log('t6bis-----------------------', t6bis);
  console.log('redevableResponse-------------------------', redevableResponse);
  if (!t6bis.intervenantVO) {
    t6bis.intervenantVO = {};
  }
  t6bis.intervenantVO.nomIntervenant = redevableResponse.nomIntervenant;
  t6bis.intervenantVO.prenomIntervenant = redevableResponse.prenomIntervenant;
  t6bis.intervenantVO.adresse = redevableResponse.adresse;
  t6bis.intervenantVO.typeIntervenant = redevableResponse.typeIntervenant;
  t6bis.intervenantVO.numeroOrdreIntervenant = redevableResponse.numeroOrdreIntervenant;
  t6bis.intervenantVO.refPaysPassPort = redevableResponse.refPaysPassPort;
  t6bis.intervenantVO.typeIdentifiant = redevableResponse.identifiants.typeIdentifiant;
  t6bis.intervenantVO.numeroDocumentIdentite = redevableResponse.identifiants.numeroDocumentIdentite;
  console.log('t6bis-----------------------', t6bis);
}

const clearRedevableCompletion = function (t6bis) {
  if (!t6bis.intervenantVO) {
    t6bis.intervenantVO = {};
  }
  t6bis.intervenantVO.nomIntervenant = "";
  t6bis.intervenantVO.prenomIntervenant = "";
  t6bis.intervenantVO.adresse = "";
}