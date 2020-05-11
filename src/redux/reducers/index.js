import {combineReducers} from 'redux';
import authReducer from './hab/auth';
import smsVerifyReducer from './hab/smsVerify';
import confirmConnexionReducer from './hab/confirmConnexion';
import menuReducer from './hab/menu';
import controleRechercheDumReducer from './controle/rechercheDum';
import regimeInterneReducer from './controle/regimeInterne';
import listDeclarationReducer from './listDeclarationDum';

import badrPickerReducer from './components/badrPicker';
import badrPickerCheckerReducer from './components/badrPickerChecker';
/**
 * combine all reducer
 */
const allReducers = combineReducers({
  authReducer,
  smsVerifyReducer,
  confirmConnexionReducer,
  menuReducer,
  badrPickerReducer,
  badrPickerCheckerReducer,
  controleRechercheDumReducer,
  regimeInterneReducer,
  listDeclarationReducer
});

export default allReducers;
