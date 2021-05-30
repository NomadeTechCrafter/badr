
import * as Constants from '../autoriserAcheminementMainConstants';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import _ from 'lodash';

/**Constants */
const initialState = {
  showProgress: false,
  errorMessage: null,
  infoMessage: null,
  displayError: false
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.AUTORISER_ACHEMINEMENT_GET_CMB_OPERATEUR_BY_CODE_REQUEST:
      return nextState;
    case Constants.AUTORISER_ACHEMINEMENT_GET_CMB_OPERATEUR_BY_CODE_IN_PROGRESS:
      return nextState;
    case Constants.AUTORISER_ACHEMINEMENT_GET_CMB_OPERATEUR_BY_CODE_SUCCESS:
      console.log('AUTORISER_ACHEMINEMENT_GET_CMB_OPERATEUR_BY_CODESUCCESS debut');
      console.log('action.value :', action.value);
      console.log('AUTORISER_ACHEMINEMENT_GET_CMB_OPERATEUR_BY_CODESUCCESS fin');
      if (action.value.isCtrlApresScanner) {
        nextState.transporteurExploitantMEADCtrlApresScanner = action.value.operateur;
      }
      if (action.value.isAutoAchemin) {
        nextState.transporteurExploitantMEADAutoAchemin = action.value.operateur;
      }
      if (!action.value.isCtrlApresScanner && !action.value.isAutoAchemin) {
        nextState.transporteurExploitantMEAD = action.value.operateur;
      }
      return nextState;
    case Constants.AUTORISER_ACHEMINEMENT_GET_CMB_OPERATEUR_BY_CODE_FAILED:
     
      return nextState;
    case Constants.AUTORISER_ACHEMINEMENT_GET_SCELLES_APPOSEES_REQUEST:
      nextState.showProgress = true;
      return nextState;
    case Constants.AUTORISER_ACHEMINEMENT_GET_SCELLES_APPOSEES_IN_PROGRESS:
      return nextState;
    case Constants.AUTORISER_ACHEMINEMENT_GET_SCELLES_APPOSEES_SUCCESS:
      nextState.showProgress = false;
      nextState.listeScellesApposees = action.value.data.jsonVO;
      let listeScellesApposees = '';
      action.value.data.jsonVO.map(item => {
        if (!_.isEmpty(listeScellesApposees)) {
          listeScellesApposees += '; ';
        }
        listeScellesApposees += item;
      })
      nextState.listeScellesApposees = listeScellesApposees;
      return nextState;
    case Constants.AUTORISER_ACHEMINEMENT_GET_SCELLES_APPOSEES_FAILED:
      return nextState;
    case Constants.AUTORISER_ACHEMINEMENT_IS_REGIME_TRANSBORDEMENT_REQUEST:
      return nextState;
    case Constants.AUTORISER_ACHEMINEMENT_IS_REGIME_TRANSBORDEMENT_IN_PROGRESS:
      return nextState;
    case Constants.AUTORISER_ACHEMINEMENT_IS_REGIME_TRANSBORDEMENT_SUCCESS:
      nextState.isRegimeTransbordement = action.value.data.jsonVO;
      return nextState;
    case Constants.AUTORISER_ACHEMINEMENT_IS_REGIME_TRANSBORDEMENT_FAILED:
      return nextState;
    case Constants.AUTORISER_ACHEMINEMENT_UC_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      return nextState;
    case Constants.AUTORISER_ACHEMINEMENT_UC_IN_PROGRESS:
      return nextState;
    case Constants.AUTORISER_ACHEMINEMENT_UC_SUCCESS:
      nextState.showProgress = false;
      nextState.success = true;
      nextState.infoMessage = action.value.data.dtoHeader
        ? action.value.data.dtoHeader.messagesInfo
        : '';
      return nextState;
    case Constants.AUTORISER_ACHEMINEMENT_UC_FAILED:
      nextState.showProgress = false;
      nextState.errorMessage = action.value.dtoHeader
        ? action.value.dtoHeader.messagesErreur
        : action.value;
      return nextState;
    
    default:
      nextState.showProgress = true;
      return initialState;
  }
};

