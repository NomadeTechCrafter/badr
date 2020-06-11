import {combineReducers} from 'redux';
import authReducer from './hab/auth';
import smsVerifyReducer from './hab/smsVerify';
import confirmConnexionReducer from './hab/confirmConnexion';
import menuReducer from './hab/menu';
import controleRechercheDumReducer from './components/rechercheDum';
import regimeInterneReducer from './controle/regimeInterne';

import listDeclarationReducer from './listDeclarationDum';

import acvpReducer from './controle/acvp';

import plaquesImmReducer from './referentiel/plaquesImm';
import controleVehiculesReducer from './referentiel/controleVehicules';

import badrPickerReducer from './components/badrPicker';
import badrPickerCheckerReducer from './components/badrPickerChecker';

import autoCompleteReducer from './components/autoComplete';
import listeDeclarationsMLVReducer from './mainLevee/listeDeclarationsMLV';
import rechercheMLVReducer from './mainLevee/rechercheMLV';
import delivrerMLVReducer from './mainLevee/delivrerMLV';

import qrCodeReducer from './components/qrCode';

import badrApiTable from './components/badrApiTable';

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
  badrApiTable,
  controleRechercheDumReducer,
  regimeInterneReducer,
  listDeclarationReducer,
  acvpReducer,
  plaquesImmReducer,
  autoCompleteReducer,
  listeDeclarationsMLVReducer,
  rechercheMLVReducer,
  delivrerMLVReducer,
  qrCodeReducer,
  controleVehiculesReducer,
});

export default allReducers;
