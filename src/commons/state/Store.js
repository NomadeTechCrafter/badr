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
import controleACVPReducer from '../../modules/controle/ACVP/state/reducers/controleACVPReducer';
import controleRegimeTransitReducer from '../../modules/controle/regimeTransit/state/reducers/controleRegimeTransitReducer';
import controleRegimeInterneReducer from '../../modules/controle/regimeInterne/state/reducers/controleRegimeInterneReducer';
import controleCommonReducer from '../../modules/controle/common/state/reducers/controleCommonReducer';
import genericDedReducer from '../../modules/dedouanement/redressement/state/reducers/DedReducer';
import vuEmbInitReducer from '../../modules/DeclarationD17D20/vuEmbarquer/state/reducers/vuEmbInitReducer';
import vuEmbReducer from '../../modules/DeclarationD17D20/vuEmbarquer/state/reducers/vuEmbUcReducer';
import vuEmbRefVH from '../../modules/DeclarationD17D20/vuEmbarquer/state/reducers/vuEmRefVhReducer';

import referentielReducer from './reducers/ReferentielReducer';
import consulterDumReducer from './reducers/ConsulterDumReducer';
import controleVehiculesReducer from '../../modules/referentiel/controleVehicules/state/reducers/refControleVehiculeReducer';
import plaquesImmReducer from '../../modules/referentiel/plaquesImmatriculation/state/reducers/refPlaquesImmReducer';
import ctrlReconnaissanceReducer from '../../modules/controle/reconnaissance/state/reducers/ctrlReconnaissanceReducer';
import enqCompteRenduReducer from '../../modules/enquetes/compteRendu/state/reducers/enqCompteRenduReducer';
import ctrlControleApresScannerReducer from '../../modules/controle/controleApresScanner/state/reducers/ctrlControleApresScannerReducer';

import t6bisCreationReducer from '../../modules/t6bis/creation/state/reducers/t6bisCreationReducer';
import t6bisGestionReducer from '../../modules/t6bis/gestion/state/reducers/t6bisGestionReducer';
import t6bisRechercheReducer from '../../modules/t6bis/recherche/state/reducers/t6bisRechercheReducer';

import crudDatatableReducer from '../state/reducers/ComCrudDataTableReducer';

import enteteReducer from '../../old/redux/reducers/actifs/rapport/creation/entete';
import saisieReducer from '../../old/redux/reducers/actifs/rapport/creation/saisie';
import creationReducer from '../../old/redux/reducers/actifs/rapport/creation/creation';

import detailsreducer from '../../old/redux/reducers/actifs/rapport/creation/details';
import recherchereducer from '../../old/redux/reducers/actifs/rapport/recherche/recherche';
import consultationreducer from '../../old/redux/reducers/actifs/rapport/consultation/consultation';

import EcorImportReducer from '../../modules/ecorImport/enleverMarchandise/state/reducers/EcorImportReducer';
import ecorImportRechercheRefDumReducer from '../../modules/ecorImport/rechercheEcorImport/state/reducers/ecorImportRechercheRefDumReducer';

import liquidationRechercheRefDumReducer from '../../modules/liquidation/state/reducers/liquidationRechercheRefDumReducer';
import liquidationReducer from '../../modules/liquidation/state/reducers/liquidationReducer';
import pecEtatChargementReducer from '../../modules/pecEtatChargement/rechParRef/state/reducers/pecEtatChargementReducer'

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
  enqCompteRenduReducer,
  ctrlControleApresScannerReducer,
  genericReducer,
  dedRedressementInitReducer,
  referentielReducer,
  consulterDumReducer,
  genericDedReducer,
  rechercheRefDumReducer,
  controleRechercheRefDumReducer,
  controleRechercheDumReducer,
  controleListDeclarationDumReducer,
  controleRegimeTransitReducer,
  controleRegimeInterneReducer,
  controleACVPReducer,
  controleCommonReducer,
  controleVehiculesReducer,
  plaquesImmReducer,
  crudDatatableReducer,
  enteteReducer,
  detailsreducer,
  recherchereducer,
  consultationreducer,
  saisieReducer,
  creationReducer,
  EcorImportReducer,
  liquidationRechercheRefDumReducer,
  liquidationReducer,
  ecorImportRechercheRefDumReducer,
  vuEmbInitReducer,
  vuEmbReducer,
  vuEmbRefVH,
  t6bisCreationReducer,
  t6bisGestionReducer,
  t6bisRechercheReducer,
  pecEtatChargementReducer
});
/**
 * store creation
 */
const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(thunk, comCustomMiddlewareService)),
);

export default store;
