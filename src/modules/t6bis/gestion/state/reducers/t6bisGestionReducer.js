
/**Constants */
import * as Constants from '../t6bisGestionConstants';
import { hasAtLeastOneTaxationLine} from "../../../utils/t6bisUtils";

const initialState = {
  confirmed: false,
  showProgress: false,
  displayError: false,
  t6bisEnteteData: null,
  t6bis: null,
  identifiants: null,
  listmoyenpaiement:null ,
  haslignetaxation: null,
  redevableResponse: null,
  newIntervenant: null,
  infoCompleted:null

};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
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
      nextState.haslignetaxation = hasAtLeastOneTaxationLine(nextState.t6bis);
      console.log('action.value', action.value);
      console.log('action.value', action.value);
      console.log('nextState', nextState);
      console.log('nextState.t6bis', nextState.t6bis);
      console.log('nextState.identifiants', nextState.identifiants);
      console.log('nextState.listmoyenpaiement', nextState.listmoyenpaiement);    
      console.log('nextState.haslignetaxation', nextState.haslignetaxation);    
      // items = action.value;
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
      nextState.infoCompleted = true;
      nextState.newIntervenant = false;
      startRedevableCompletion(nextState.t6bis,action.value)
      return nextState;
    case Constants.FIND_INTERVENANT_FAILED:
      console.log(Constants.T6BIS_INIT_ENTETE_FAILED);
      nextState.showProgress = false;
      nextState.cofirmed = false;
      nextState.infoCompleted = true;
      nextState.newIntervenant = true;
      return nextState;
    default:
      console.log('action.type', action.type);
      console.log('initialState', initialState);
      nextState.showProgress = false;
      return initialState;
  }

 
  
};

const startRedevableCompletion = function (t6bis, redevableResponse) {
  console.log(t6bis);
  console.log(redevableResponse);
  t6bis.intervenantVO.nomIntervenant = redevableResponse.nomIntervenant;
  t6bis.intervenantVO.prenomIntervenant = redevableResponse.prenomIntervenant;
  t6bis.intervenantVO.adresse = redevableResponse.adresse;
  t6bis.intervenantVO.typeIntervenant = redevableResponse.typeIntervenant;
  t6bis.intervenantVO.numeroOrdreIntervenant = redevableResponse.numeroOrdreIntervenant;
  t6bis.intervenantVO.refPaysPassPort = redevableResponse.refPaysPassPort;
}