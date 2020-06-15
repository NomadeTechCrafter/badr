import {combineReducers} from 'redux';
import authReducer from './hab/auth';
import smsVerifyReducer from './hab/smsVerify';
import confirmConnexionReducer from './hab/confirmConnexion';
import menuReducer from './hab/menu';

import rechercheRefDumReducer from './components/rechercheDum';
import controleRechercheDumReducer from './controle/rechercheDum';
import regimeInterneReducer from './controle/regimeInterne';
import regimeTransitReducer from './controle/regimeTransit';
import listDeclarationReducer from './controle/listDeclarationDum';

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
import initApurementReducer from './at/apurement';
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
  rechercheRefDumReducer,
  controleRechercheDumReducer,
  regimeInterneReducer,
  regimeTransitReducer,
  listDeclarationReducer,
  acvpReducer,
  plaquesImmReducer,
  autoCompleteReducer,
  listeDeclarationsMLVReducer,
  rechercheMLVReducer,
  delivrerMLVReducer,
  qrCodeReducer,
  controleVehiculesReducer,
  initApurementReducer,
});

export default allReducers;
