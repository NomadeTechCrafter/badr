import {combineReducers} from 'redux';
import authReducer from './hab/auth';
import smsVerifyReducer from './hab/smsVerify';
import confirmConnexionReducer from './hab/confirmConnexion';
import menuReducer from './hab/menu';
import controleRechercheDumReducer from './controle/rechercheDum';
import regimeInterneReducer from './controle/regimeInterne';
import regimeTransitReducer from './controle/regimeTransit';

import listDeclarationReducer from './controle/listDeclarationDum';

import acvpReducer from './controle/acvp';

import plaquesImmReducer from './referentiel/plaquesImm';

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
  regimeTransitReducer,
  listDeclarationReducer,
  acvpReducer,
  plaquesImmReducer,

});

export default allReducers;
