/**Constants */
import * as Constants from '../DedRedressementConstants';
import _ from 'lodash';
/** i18n */
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import { AUCUN, FLAG_OPER_DECLARANT, FLAG_OPER_ENGAGE_DEST, FLAG_OPER_ENGAGE_EXP, FLAG_OPER_ENGAGE_LEQUEL, SEPARATEUR } from '../../utils/DedConstants';

const initialState = {
  showProgress: false,
  errorMessage: '',
  displayError: false,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    
    case Constants.VALIDER_REF_PREAP_DS_INIT:
      nextState.messageInfo = null;
      nextState.errorMessage = null;
      nextState.preapurement = null;
      return nextState;
    case Constants.VALIDER_REF_PREAP_DS_IN_PROGRESS:
      nextState.showProgress = true;
      nextState.data = action.value.data;
      return nextState;
    case Constants.VALIDER_REF_PREAP_DS_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.preapurement = action.value;
      
      return nextState;
    case Constants.VALIDER_REF_PREAP_DS_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.errorMessage = action.value.data
      return nextState;
    default:
      return nextState ? nextState : initialState;
  }
};



