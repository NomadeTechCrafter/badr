import {combineReducers} from 'redux';

import loginReducer from '../../modules/hab/login/state/reducers/habLoginReducer';
import smsVerifyReducer from '../../modules/hab/smsVerify/state/reducers/habSmsVerifyReducer';
import confirmConnexionReducer from '../../modules/hab/profile/state/reducers/habProfileReducer';
import genericReducer from './reducers/GenericReducer';
import menuReducer from '../../modules/hab/mainMenu/state/reducers/habMainMenuReducer';
import autoLoginReducer from '../ionic/state/reducers/AutoLoginReducer';
import badrPickerReducer from './reducers/BadrPickerReducer';
import badrPickerCheckerReducer from './reducers/BadrPickerCheckerReducer';
import qrCodeReducer from './reducers/QrCodeReducer';
import badrApiTable from './reducers/BadrApiTableReducer';
import initApurementReducer from '../../modules/at/apurement/state/reducers/atApurementReducer';


/**
 * combine all reducers
 */
const allReducers = combineReducers({
  loginReducer,
  smsVerifyReducer,
  confirmConnexionReducer,
  menuReducer,
  autoLoginReducer,
  badrPickerReducer,
  badrPickerCheckerReducer,
  badrApiTable,
  qrCodeReducer,
  initApurementReducer,
  genericReducer,
});

export default allReducers;
