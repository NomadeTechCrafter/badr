
/**Constants */
import * as Constants from '../t6bisGestionConstants';
import { calculateTotalT6bis, getCurrentArticle, groupLignesByRubrique, groupLignesByRubriqueByArticle, hasAtLeastOneTaxationLine, isCm, isCreation, isMtm } from "../../../utils/t6bisUtils";
import { MODE_CREATION } from '../../../utils/t6bisConstants';

const initialState = {
  confirmed: false,
  showProgress: false,
  displayError: false,
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
    retourFindIntervenant: false,
    errorMessage: null,
    value: action.value,
  };
  switch (action.type) {
    case Constants.T6BIS_INIT_ENTETE_REQUEST:
      nextState.displayError = false;
      nextState.correct = false;
      nextState.showProgress = true;
      return nextState;
    case Constants.T6BIS_INIT_ENTETE_IN_PROGRESS:
      return nextState;
    case Constants.T6BIS_INIT_ENTETE_SUCCES:
      nextState.showProgress = false;
      nextState.confirmed = true;
      nextState.mode = action.value.mode;
      console.log()
      if (action.value.mode === MODE_CREATION) {
        nextState.t6bis = action.value.t6bisMtmDto;
        nextState.currentArticle = getCurrentArticle(nextState.t6bis.codeTypeT6bis, 0);
        nextState.recapCurrentArticleList = [];
        nextState.listeRecap = [];
        nextState.fieldsetcontext = null;

      } else {
        nextState.t6bis = action.value.t6bis;
        if (isMtm(action.value.t6bis.codeTypeT6bis) || isCm(action.value.t6bis.codeTypeT6bis)) {
          if (nextState.t6bis.listeArticleT6bis && nextState.t6bis.listeArticleT6bis.length >= 1) {
            nextState.currentArticle = nextState.t6bis.listeArticleT6bis[0];
            let recapCurrentArticleList = [];
            groupLignesByRubriqueByArticle(nextState.t6bis, recapCurrentArticleList, nextState.currentArticle);
            nextState.montantGlobalByArticle = calculateTotalT6bis(recapCurrentArticleList, nextState.t6bis);
            nextState.recapCurrentArticleList = recapCurrentArticleList;
          } else { nextState.currentArticle = getCurrentArticle(nextState.t6bis.codeTypeT6bis, 0); }


        }
        let listeRecap = [];

        groupLignesByRubrique(nextState.t6bis, listeRecap);
        nextState.t6bis.montantGlobal = calculateTotalT6bis(listeRecap, nextState.t6bis);
        nextState.listeRecap = listeRecap;
      }
      nextState.identifiants = action.value.listTypeIdentifiant;
      nextState.listmoyenpaiement = action.value.typeMoyenPaiementList;
      nextState.haslignetaxation = hasAtLeastOneTaxationLine(nextState.t6bis);
      return nextState;
    case Constants.T6BIS_INIT_ENTETE_FAILED:
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
      nextState.retourFindIntervenant = false;
      return nextState;
    case Constants.FIND_INTERVENANT_IN_PROGRESS:
      return nextState;
    case Constants.FIND_INTERVENANT_SUCCES:
      nextState.showProgress = false;
      nextState.confirmed = true;
      nextState.infoCompleted = true;
      nextState.newIntervenant = false;
      nextState.retourFindIntervenant = true;
      startRedevableCompletion(nextState.t6bis, action.value);
      return nextState;
    case Constants.FIND_INTERVENANT_FAILED:
      console.log(Constants.T6BIS_INIT_ENTETE_FAILED);
      nextState.showProgress = false;
      nextState.cofirmed = false;
      nextState.infoCompleted = true;
      nextState.newIntervenant = true;
      nextState.retourFindIntervenant = true;
      clearRedevableCompletion(nextState.t6bis);
      return nextState;
    case Constants.T6BIS_UPDATE_PROPS_REQUEST:
      return nextState;
    case Constants.T6BIS_UPDATE_PROPS_IN_PROGRESS:
      return nextState;
    case Constants.T6BIS_UPDATE_PROPS_SUCCES:
      console.log('                       T6BIS_UPDATE_PROPS_SUCCES                                          ');
      console.log('                       T6BIS_UPDATE_PROPS_SUCCES                                          ',action.value);
      nextState.t6bis.listeArticleT6bis = action.value.listeArticleT6bis;
      nextState.currentArticle = action.value.currentArticle;
      console.log('                       T6BIS_UPDATE_PROPS_SUCCES                                          ', nextState);
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
    case Constants.T6BIS_GESTION_GET_UNITE_CODE_REQUEST:
      return nextState;
    case Constants.T6BIS_GESTION_GET_UNITE_CODE_IN_PROGRESS:
      return nextState;
    case Constants.T6BIS_GESTION_GET_UNITE_CODE_SUCCES:
      nextState.acUniteValue = action.value.descriptionUniteMesure;
      return nextState;
    case Constants.T6BIS_GESTION_GET_UNITE_CODE_FAILED:
      return nextState;
    case Constants.T6BIS_ADD_TAXATION_ARTICLE_REQUEST:
      return nextState;
    case Constants.T6BIS_ADD_TAXATION_ARTICLE_IN_PROGRESS:
      return nextState;
    case Constants.T6BIS_ADD_TAXATION_ARTICLE_SUCCES:
      nextState.currentArticle = action.value.currentArticle;
      let recapCurrentArticleList = [];
      groupLignesByRubriqueByArticle(nextState.t6bis, recapCurrentArticleList, nextState.currentArticle);
      nextState.currentArticle.montantGlobalByArticle = calculateTotalT6bis(recapCurrentArticleList, nextState.t6bis);
      nextState.recapCurrentArticleList = recapCurrentArticleList;
      let listeRecap = [];
      groupLignesByRubrique(nextState.t6bis, listeRecap);
      nextState.t6bis.montantGlobal = calculateTotalT6bis(listeRecap, nextState.t6bis);
      nextState.listeRecap = listeRecap;
      return nextState;
    case Constants.T6BIS_ADD_TAXATION_ARTICLE_FAILED:
      return nextState;
    case Constants.T6BIS_ADD_TAXATION_GLOBALE_REQUEST:
      return nextState;
    case Constants.T6BIS_ADD_TAXATION_GLOBALE_IN_PROGRESS:
      return nextState;
    case Constants.T6BIS_ADD_TAXATION_GLOBALE_SUCCES:

      listeRecap = [];
      groupLignesByRubrique(nextState.t6bis, listeRecap);
      nextState.t6bis.montantGlobal = calculateTotalT6bis(listeRecap, nextState.t6bis);
      nextState.listeRecap = listeRecap;
      return nextState;
    case Constants.T6BIS_ADD_TAXATION_GLOBALE_FAILED:
      return nextState;
    case Constants.T6BIS_SAUVEGARDER_REQUEST:
      return nextState;
    case Constants.T6BIS_SAUVEGARDER_IN_PROGRESS:
      return nextState;
    case Constants.T6BIS_SAUVEGARDER_SUCCES:
      nextState.t6bis = action.value.t6bis;
      if (isCreation()) {
        if ((isMtm() || isCm()) && action.value.t6bis) {
          nextState.t6bis.listeArticleT6bis = action.value.tempListArticles;
        }
      }
      return nextState;
    case Constants.T6BIS_SAUVEGARDER_FAILED:
      nextState.errorMessage = action.value;
      return nextState;
    case Constants.T6BIS_ENREGISTRER_REQUEST:
      return nextState;
    case Constants.T6BIS_ENREGISTRER_IN_PROGRESS:
      return nextState;
    case Constants.T6BIS_ENREGISTRER_SUCCES:
      nextState.t6bis = action.value.t6bis;
      if (isCreation()) {
        if ((isMtm() || isCm()) && action.value.t6bis) {
          nextState.t6bis.listeArticleT6bis = action.value.tempListArticles;
        }
      }
      return nextState;
    case Constants.T6BIS_ENREGISTRER_FAILED:
      nextState.errorMessage = action.value;
      return nextState;
    case Constants.T6BIS_SUPPRIMER_REQUEST:
      return nextState;
    case Constants.T6BIS_SUPPRIMER_IN_PROGRESS:
      return nextState;
    case Constants.T6BIS_SUPPRIMER_SUCCES:
      return nextState;
    case Constants.T6BIS_SUPPRIMER_FAILED:
      nextState.errorMessage = action.value;
      return nextState;
    case Constants.T6BIS_GESTION_GET_CMB_OPERATEUR_BY_CODE_REQUEST:
      return nextState;
    case Constants.T6BIS_GESTION_GET_CMB_OPERATEUR_BY_CODE_IN_PROGRESS:
      return nextState;
    case Constants.T6BIS_GESTION_GET_CMB_OPERATEUR_BY_CODE_SUCCES:
      nextState.fieldsetcontext = { operateur: action.value };
      return nextState;
    case Constants.T6BIS_GESTION_GET_CMB_OPERATEUR_BY_CODE_FAILED:
      return nextState;

    default:
      return nextState ? nextState : initialState;
  }



};

const startRedevableCompletion = function (t6bis, redevableResponse) {
  console.log('t6bis-----------------------', t6bis);
  console.log('redevableResponse-------------------------', redevableResponse);
  t6bis = {};
  if (!t6bis.intervenantVO) {
    t6bis.intervenantVO = {};
  }
  t6bis.intervenantVO.nomIntervenant = redevableResponse.nomIntervenant;
  t6bis.intervenantVO.prenomIntervenant = redevableResponse.prenomIntervenant;
  t6bis.intervenantVO.adresse = redevableResponse.adresse;
  t6bis.intervenantVO.typeIntervenant = redevableResponse.typeIntervenant;
  t6bis.intervenantVO.numeroOrdreIntervenant = redevableResponse.numeroOrdreIntervenant;
  t6bis.intervenantVO.refPaysPassPort = redevableResponse.refPaysPassPort;
  t6bis.intervenantVO.refTypeDocumentIdentite = redevableResponse.identifiants.typeIdentifiant;
  t6bis.intervenantVO.numeroDocumentIndentite = redevableResponse.identifiants.numeroDocumentIdentite;
  console.log('t6bis-----------------------', t6bis);
}

const clearRedevableCompletion = function (t6bis) {
  t6bis = {};
  if (!t6bis.intervenantVO) {
    t6bis.intervenantVO = {};
  }
  t6bis.intervenantVO.nomIntervenant = "";
  t6bis.intervenantVO.prenomIntervenant = "";
  t6bis.intervenantVO.adresse = "";
}