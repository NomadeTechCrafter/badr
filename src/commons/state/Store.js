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

import genericDedReducer from '../../modules/dedouanement/redressement/state/reducers/DedReducer';

import referentielReducer from './reducers/ReferentielReducer';
import consulterDumReducer from './reducers/ConsulterDumReducer';

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
  refOperateursEconomiquesReducer,
  genericReducer,
  autoCompleteReducer,
  dedRedressementInitReducer,
  referentielReducer,
  consulterDumReducer,
  genericDedReducer,
});
/**
 * store creation
 */
const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(thunk, comCustomMiddlewareService)),
);

export default store;
