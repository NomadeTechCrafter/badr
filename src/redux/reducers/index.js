import {combineReducers} from 'redux';
import authReducer from './auth';
import smsVerifyReducer from './smsVerify';
import confirmConnexionReducer from './confirmConnexion';
import menuReducer from './menu';

/**
 * combine all reducer
 */
const allReducers = combineReducers({
  authReducer,
  smsVerifyReducer,
  confirmConnexionReducer,
  menuReducer
});

export default allReducers;
