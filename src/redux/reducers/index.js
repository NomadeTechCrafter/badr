import {combineReducers} from 'redux';
import authReducer from './auth';
import smsVerifyReducer from './smsVerify';
import confirmConnexionReducer from './confirmConnexion';
import menuReducer from './menu';
import badrPickerReducer from './components/badrPicker';
import controleRechercheDumReducer from './controle/rechercheDum';
import regimeInterneReducer from './controle/regimeInterne';

/**
 * combine all reducer
 */
const allReducers = combineReducers({
  authReducer,
  smsVerifyReducer,
  confirmConnexionReducer,
  menuReducer,
  badrPickerReducer,
  controleRechercheDumReducer,
  regimeInterneReducer,
});

export default allReducers;
