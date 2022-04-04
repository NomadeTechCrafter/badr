
/**Constants */
import { CMD_ENREGISTRER_T6BIS, MODE_CREATION } from '../../../utils/t6bisConstants';
import { calculateTotalT6bis, getCurrentArticle, groupLignesByRubrique, groupLignesByRubriqueByArticle, hasAtLeastOneTaxationLine, isCm, isCreation, isMtm } from "../../../utils/t6bisUtils";
import * as Constants from '../t6bisGestionConstants';

const initialState = {
  confirmed: false,
  showProgress: false,
  displayError: false,
  t6bis: null,
  identifiants: null,
  listmoyenpaiement: null,
  listDesTpes:null,
  haslignetaxation: null,
  redevableResponse: null,
  newIntervenant: null,
  infoCompleted: null,
  hideEnregistrerButton: false

};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    retourFindIntervenant: false,
    errorMessage: null,
    value: action.value,
  };
  switch (action.type) {
    case Constants.T6BIS_INIT_ENTETE_INIT:
      nextState.successMessage = null;
      nextState.errorMessage = null;
      return nextState;
    case Constants.T6BIS_INIT_ENTETE_REQUEST:
      console.log('11/02/2022  T6BIS_INIT_ENTETE_REQUEST ', Constants.T6BIS_INIT_ENTETE_REQUEST);
      nextState.displayError = false;
      nextState.correct = false;
      nextState.showProgress = true;
      nextState.successMessage = null;
      nextState.errorMessage = null;
      nextState.hideEnregistrerButton = false;
      return nextState;
    case Constants.T6BIS_INIT_ENTETE_IN_PROGRESS:
      nextState.successMessage = null;
      nextState.errorMessage = null;
      return nextState;
    case Constants.T6BIS_INIT_ENTETE_SUCCES:
      console.log('11/02/2022  T6BIS_INIT_ENTETE_SUCCES ', Constants.T6BIS_INIT_ENTETE_SUCCES);
      nextState.showProgress = false;
      nextState.confirmed = true;
      nextState.mode = action.value.mode;
      nextState.successMessage = null;
      nextState.errorMessage = null;
      nextState.listDesTpes = action.value.tpeList;	
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
      nextState.hideEnregistrerButton = false;
      return nextState;
    case Constants.T6BIS_INIT_ENTETE_FAILED:
      nextState.showProgress = false;
      nextState.cofirmed = false;
      nextState.displayError = true;
      nextState.errorMessage = action.value;
      return nextState;
    case Constants.FIND_INTERVENANT_REQUEST:
      console.log(Constants.FIND_INTERVENANT_REQUEST);
      nextState.displayError = false;
      nextState.correct = false;
      nextState.showProgress = true;
      nextState.infoCompleted = false;
      nextState.newIntervenant = false;
      nextState.retourFindIntervenant = false;
      return nextState;
    case Constants.FIND_INTERVENANT_IN_PROGRESS:
      nextState.showProgress = true;
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
      nextState.showProgress = false;
      nextState.cofirmed = false;
      nextState.infoCompleted = true;
      nextState.newIntervenant = true;
      nextState.retourFindIntervenant = true;
      clearRedevableCompletion(nextState.t6bis, action.value);
      return nextState;
    case Constants.T6BIS_UPDATE_PROPS_REQUEST:
      return nextState;
    case Constants.T6BIS_UPDATE_PROPS_IN_PROGRESS:
      return nextState;
    case Constants.T6BIS_UPDATE_PROPS_SUCCES:
      nextState.t6bis.listeArticleT6bis = action.value.listeArticleT6bis;
      nextState.currentArticle = action.value.currentArticle;
      let listeRecapD = [];
      groupLignesByRubrique(nextState.t6bis, listeRecapD);
      nextState.listeRecap = listeRecapD;
        nextState.t6bis.montantGlobal = calculateTotalT6bis(listeRecapD, nextState.t6bis);
      return nextState;
    case Constants.T6BIS_UPDATE_PROPS_FAILED:
      return nextState;
    case Constants.T6BIS_UPDATE_INTERVENANT_REQUEST:
      return nextState;
    case Constants.T6BIS_UPDATE_INTERVENANT_IN_PROGRESS:
      return nextState;
    case Constants.T6BIS_UPDATE_INTERVENANT_SUCCES:
      nextState.t6bis.intervenantVO.nomIntervenant = action.value?.intervenantVO?.nomIntervenant;
      nextState.t6bis.intervenantVO.prenomIntervenant = action.value?.intervenantVO?.prenomIntervenant;
      nextState.t6bis.intervenantVO.adresse = action.value?.intervenantVO?.adresse;
      nextState.t6bis.intervenantVO.refPaysPassPort = action.value?.intervenantVO?.refPaysPassPort;
      return nextState;
    case Constants.T6BIS_UPDATE_INTERVENANT_FAILED:
      return nextState;
    case Constants.T6BIS_UPDATE_OPERATEUR_REQUEST:
    case Constants.T6BIS_UPDATE_OPERATEUR_IN_PROGRESS:
    case Constants.T6BIS_UPDATE_OPERATEUR_FAILED:  
      return nextState;
    case Constants.T6BIS_UPDATE_OPERATEUR_SUCCES:
      nextState.t6bis.identifiantOperateur = action.value?.operateur?.code;
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
      nextState.successMessage = '';
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
      nextState.successMessage = '';
      return nextState;
    case Constants.T6BIS_ADD_TAXATION_GLOBALE_FAILED:
      return nextState;
    case Constants.T6BIS_SAUVEGARDER_REQUEST:
      
      return nextState;
    case Constants.T6BIS_SAUVEGARDER_IN_PROGRESS:
      nextState.successMessage = null;
      nextState.errorMessage = null;
      return nextState;
    case Constants.T6BIS_SAUVEGARDER_SUCCES:
      console.log('11/02/2022  ', Constants.T6BIS_SAUVEGARDER_SUCCES);
      nextState.t6bis = action.value.t6bis;
      if (isCreation()) {
        if ((isMtm() || isCm()) && action.value.t6bis) {
          nextState.t6bis.listeArticleT6bis = action.value.tempListArticles;
        }
      }
      nextState.successMessage = action.value.dtoHeader
        ? action.value.dtoHeader.messagesInfo[0] : null;
      
      nextState.errorMessage = null;
      console.log('11/02/2022 action.value.cmd == CMD_ENREGISTRER_T6BIS ', action.value.cmd == CMD_ENREGISTRER_T6BIS);
      console.log('11/02/2022 action.value.cmd ', action.value.cmd);
      if (action.value.cmd == CMD_ENREGISTRER_T6BIS + nextState.t6bis.codeTypeT6bis) {
        nextState.hideEnregistrerButton = true;
        console.log('11/02/2022 nextState ', nextState);
        console.log('11/02/2022  ', Constants.T6BIS_SAUVEGARDER_SUCCES);
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
      nextState.successMessage = action.value.dtoHeader
        ? action.value.dtoHeader.messagesInfo[0] : null;
      nextState.errorMessage = null;
      
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
    
    case Constants.T6BIS_GESTION_CHECK_NOMENCLATURE_CODE_REQUEST:
    case Constants.T6BIS_GESTION_CHECK_NOMENCLATURE_CODE_IN_PROGRESS:
      nextState.errorMessage = null;
      return nextState;
    case Constants.T6BIS_GESTION_CHECK_NOMENCLATURE_CODE_SUCCES:
      nextState.successMessage = 'Code nomencalture existant!';
      nextState.errorMessage = null;
      return nextState;
    case Constants.T6BIS_GESTION_CHECK_NOMENCLATURE_CODE_FAILED:
      nextState.errorMessage = action.value;
      return nextState;
/*case Constants.T6BIS_GESTION_ALL_LIST_TPE_REQUEST:
      console.log(Constants.T6BIS_GESTION_ALL_LIST_TPE_REQUEST);
      nextState.displayError = false;
      nextState.correct = false;
      nextState.showProgress = true;
      return nextState;
   case Constants.T6BIS_GESTION_ALL_LIST_TPE_IN_PROGRESS:
      return nextState;
    case Constants.T6BIS_GESTION_ALL_LIST_TPE_SUCCES:
      console.log('CREATION_T6BIS_ALL_LIST_TPE_SUCCES reducer');
      nextState.showProgress = false;
      nextState.confirmed = true;
      nextState.listDesTpes = action.value;
      console.log('action.value', action.value);
            // items = action.value;
      return nextState;
    case Constants.T6BIS_GESTION_ALL_LIST_TPE_FAILED:
      nextState.showProgress = false;
      nextState.cofirmed = false;
      nextState.displayError = true;
      nextState.errorMessage = action.value;
      return nextState;*/
    default:
      return nextState ? nextState : initialState;
  }



};

const startRedevableCompletion = function (t6bis, redevableResponse) {
  console.log('t6bis-----------------------', t6bis);
  console.log('redevableResponse-------------------------', redevableResponse);
 // t6bis = {};
  if (!t6bis || t6bis == null) {
    t6bis = {};
  }
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
}

const clearRedevableCompletion = function (t6bis, values) {
  if (!t6bis.intervenantVO) {
    t6bis.intervenantVO = {};
  }
  t6bis.intervenantVO.nomIntervenant = "";
  t6bis.intervenantVO.prenomIntervenant = "";
  t6bis.intervenantVO.adresse = "";
  t6bis.intervenantVO.typeIntervenant = "";
  t6bis.intervenantVO.numeroOrdreIntervenant = "";
  t6bis.intervenantVO.refPaysPassPort = "";
  t6bis.intervenantVO.refTypeDocumentIdentite = values.identifiants.typeIdentifiant;
  t6bis.intervenantVO.numeroDocumentIndentite = values.identifiants.numeroDocumentIdentite;
}