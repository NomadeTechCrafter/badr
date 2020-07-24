import {combineReducers} from 'redux';

import loginReducer from '../../hab/login/state/reducers/habLoginReducer';
import smsVerifyReducer from '../../hab/smsVerify/state/reducers/habSmsVerifyReducer';
import confirmConnexionReducer from '../../hab/profile/state/reducers/habProfileReducer';
import genericReducer from '../../commons/state/reducers/genericReducer';
import menuReducer from '../../hab/mainMenu/state/reducers/habMainMenuReducer';


import plaquesImmReducer from './referentiel/plaquesImm';
import controleVehiculesReducer from './referentiel/controleVehicules';
import badReducer from './controle/BAD';
import badrPickerReducer from './components/badrPicker';
import badrPickerCheckerReducer from './components/badrPickerChecker';

import qrCodeReducer from './components/qrCode';
import badrApiTable from './components/badrApiTable';
import initApurementReducer from './at/apurement';


import rechercheRefDumReducer from './components/rechercheDum';
import controleRechercheDumReducer from './controle/rechercheDum';
import regimeInterneReducer from './controle/regimeInterne';
import regimeTransitReducer from './controle/regimeTransit';
import listDeclarationReducer from './controle/listDeclarationDum';
import acvpReducer from './controle/acvp';
import autoCompleteReducer from './components/autoComplete';
import listeDeclarationsMLVReducer from './mainLevee/listeDeclarationsMLV';
import rechercheMLVReducer from './mainLevee/rechercheMLV';
import delivrerMLVReducer from './mainLevee/delivrerMLV';


/**
 * combine all reducer
 */
const allReducers = combineReducers({
  loginReducer,
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
  badReducer,
  genericReducer,
});

export default allReducers;
