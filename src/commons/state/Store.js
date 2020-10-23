/** Redux Store & middleware */
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {comCustomMiddlewareService} from '../services/middleware/ComCustomMiddlewareService';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/** Reducers */
import loginReducer from '../../modules/hab/login/state/reducers/habLoginReducer';
import smsVerifyReducer from '../../modules/hab/smsVerify/state/reducers/habSmsVerifyReducer';
import confirmConnexionReducer from '../../modules/hab/profile/state/reducers/habProfileReducer';
import genericReducer from './reducers/ComGenericReducer';
import menuReducer from '../../modules/hab/mainMenu/state/reducers/habMainMenuReducer';
import autoLoginReducer from '../ionic/state/reducers/ComAutoLoginReducer';
import autoCompleteReducer from './reducers/ComAutoCompleteReducer';
import badrPickerReducer from './reducers/ComBadrPickerReducer';
import badrPickerCheckerReducer from './reducers/ComBadrPickerCheckerReducer';
import qrCodeReducer from './reducers/ComQrCodeReducer';
import badrApiTable from './reducers/ComBadrApiTableReducer';
import initApurementReducer from '../../modules/at/apurement/state/reducers/atApurementReducer';
import refOperateursEconomiquesReducer from '../../modules/referentiel/operateursEconomiques/state/reducers/refOperateursEconomiquesReducer';
import dedRedressementInitReducer from '../../modules/dedouanement/redressement/state/reducers/DedRedressementInitReducer';
import rechercheRefDumReducer from './reducers/rechercheDum';
import controleRechercheRefDumReducer from '../../modules/controle/rechercheDum/state/reducers/controleRechercheRefDumReducer';
import controleRechercheDumReducer from '../../modules/controle/rechercheDum/state/reducers/controleRechercheDumReducer';
import controleListDeclarationDumReducer from '../../modules/controle/listDeclarationDum/state/reducers/controleListDeclarationDumReducer';
import genericDedReducer from '../../modules/dedouanement/redressement/state/reducers/DedReducer';

import referentielReducer from './reducers/ReferentielReducer';
import consulterDumReducer from './reducers/ConsulterDumReducer';
import controleVehiculesReducer from '../../modules/referentiel/controleVehicules/state/reducers/refControleVehiculeReducer';
import plaquesImmReducer from '../../modules/referentiel/plaquesImmatriculation/state/reducers/refPlaquesImmReducer';
import ctrlReconnaissanceReducer from '../../modules/controle/reconnaissance/state/reducers/ctrlReconnaissanceReducer';

/**
 * combine all reducers
 */
const allReducers = combineReducers({
  loginReducer,
  smsVerifyReducer,
  confirmConnexionReducer,
  menuReducer,
  autoLoginReducer,
  autoCompleteReducer,
  badrPickerReducer,
  badrPickerCheckerReducer,
  badrApiTable,
  qrCodeReducer,
  initApurementReducer,
  refOperateursEconomiquesReducer,
  ctrlReconnaissanceReducer,
  genericReducer,
  dedRedressementInitReducer,
  referentielReducer,
  consulterDumReducer,
  genericDedReducer,
  rechercheRefDumReducer,
  controleRechercheRefDumReducer,
  controleRechercheDumReducer,
  controleListDeclarationDumReducer,
  controleVehiculesReducer,
  plaquesImmReducer,
});
/**
 * store creation
 */
const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(thunk, comCustomMiddlewareService)),
);

export default store;
