import {combineReducers} from 'redux';
import authReducer from './auth';
import smsVerifyReducer from './smsVerify';
import confirmConnexionReducer from './confirmConnexion';
import menuReducer from './menu';
import badrPickerReducer from './components/badrPicker';

/**
 * combine all reducer
 */
const allReducers = combineReducers({
  authReducer,
  smsVerifyReducer,
  confirmConnexionReducer,
  menuReducer,
  badrPickerReducer
});

export default allReducers;
