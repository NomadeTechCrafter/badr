/**Constants */
import * as Constants from '../ApurementConstants';
/** i18n */
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import moment from 'moment';

const initialState = {
  showProgress: false,
  errorMessage: '',
  messageInfo : '',
  displayError: false,
  data: {},
  success: false,
  listDUM:[],
  listLot:[],
  listEC:[],
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.APUR_CONFIRMER_INIT:
      return initialState;
    case Constants.AJOUTER_LIGNE_DUM_REQUEST:
      return nextState;
    case Constants.APUR_CONFIRMER_USE_CASE_REQUEST:
      return nextState;
    case Constants.APUR_CONFIRMER_USE_CASE_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.messageInfo = action.value.dtoHeader.messagesInfo;
      nextState.success = true;
      return nextState;
    case Constants.AJOUTER_LIGNE_DUM_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      const ligneDUM = action.value.jsonVO;
      nextState.listDUM.push({
        identifiantDED: ligneDUM.identifiantDED,
        referenceEnregistrement: ligneDUM.referenceEnregistrement,
        operateurDeclarant: ligneDUM.operateurDeclarant,
        formatedDateenregistrement: moment(ligneDUM.dateEnregistrement).format(Constants.FORMAT_DDMMYYYY_HHMM),
        nombreContenants: ligneDUM.nombreContenants,
        poidsBruts: ligneDUM.poidsBruts,
        poidsNet: ligneDUM.poidsNet,
        valeurDeclaree: ligneDUM.valeurDeclaree
      });
      return nextState;
    case Constants.DELETE_LIGNE_DUM:
      nextState.listDUM.splice(action.value.index,1);
      return nextState;
    case Constants.AJOUTER_LOT_DS_REQUEST:
      return nextState;
    case Constants.AJOUTER_LOT_DS_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      const ligneLot = action.value.jsonVO;
      nextState.listLot.push({
        idlot: ligneLot.idlot,
        N: nextState.listLot.length + 1,
        NbreContenant: ligneLot.nombrecontenant,
        PoidsBrut: ligneLot.poidsbrut,
        TypeDS: action.libelleTypeDS,
        LieuChargement: action.libelleLieuChargement,
        ReferenceDS: action.refDS,
        preapAnnee: action.preapAnnee,
        preapBureau: action.preapBureau,
        preapRegime: action.preapRegime,
        preapSerie: action.preapSerie,
        referenceLot: action.referenceLot,
        typeDS: action.typeDS,
        codelieuChargement: action.lieuChargement,
      });
      return nextState;
    case Constants.DELETE_LOT_DS:
      nextState.listLot.splice(action.value.index,1);
      return nextState;
    case Constants.AJOUTER_LIGNE_EC_REQUEST:
      return nextState;
    case Constants.AJOUTER_LIGNE_EC_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      const ligneEC = action.value.jsonVO;
      nextState.listEC.push({
        IdEtatchargement: ligneEC.refetatchargement,
        reference: action.refEC,
        dateEnregistrement: ligneEC.dateHeureEnregistrement,
        dateVoyage: ligneEC.dateHeureVoyage,
        declarant: ligneEC.refDeclarant,
        bureauSortie: ligneEC.bureauSortie,
        navire: ligneEC.navire
      });
      return nextState;
    case Constants.DELETE_LIGNE_EC:
      nextState.listEC.splice(action.value.index,1);
      return nextState;
    case Constants.APUR_CONFIRMER_REQUEST:
      nextState.displayError = false;
      nextState.messageInfo = '';
      nextState.errorMessage = null;
      nextState.data = {};
      nextState.success = false;
      if (nextState.successMessage) {
        delete nextState.successMessage;
      }
      return nextState;
    case Constants.APUR_CONFIRMER_IN_PROGRESS:
      nextState.showProgress = true;
      return nextState;
    case Constants.APUR_CONFIRMER_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data = action.value.jsonVO;
      nextState.messageInfo = action.value.dtoHeader.messagesInfo;
      nextState.success = true;
      return nextState;
    case Constants.APUR_CONFIRMER_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.messageInfo = '';
      nextState.success = false;
      if (action.value.dtoHeader) {
        nextState.errorMessage = action?.value?.dtoHeader?.messagesErreur
          ? action?.value?.dtoHeader?.messagesErreur
          : action.value;
      } else {
        nextState.errorMessage = translate('errors.technicalIssue');
      }
      return nextState;

    default:
      nextState.showProgress = false;
      return initialState;
  }

};
