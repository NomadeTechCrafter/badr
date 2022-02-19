import AsyncStorage from '@react-native-community/async-storage';
import SecureStorage, { ACCESS_CONTROL, ACCESSIBLE, AUTHENTICATION_TYPE } from 'react-native-secure-storage'
import {ComSessionService} from '../../../commons/services/session/ComSessionService';
import CryptoJS from 'crypto-js' ;
export const encryptData=(data)=>{
    const key  = CryptoJS.enc.Latin1.parse('1234567812345678');
    const iv   = CryptoJS.enc.Latin1.parse('1234567812345678');
    const encrypted = CryptoJS.AES.encrypt(
      data,
      key,
      {iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding});
  return encrypted.toString()
  }
  export const decryptData=(data)=>{
      const key  = CryptoJS.enc.Latin1.parse('1234567812345678');
      const iv   = CryptoJS.enc.Latin1.parse('1234567812345678');
      var decrypted = CryptoJS.AES.decrypt(data,key,{iv:iv,padding:CryptoJS.pad.ZeroPadding});
    return decrypted.toString(CryptoJS.enc.Utf8)
    }
  const config = {
    accessControl: ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
    accessible: ACCESSIBLE.WHEN_UNLOCKED,
    authenticationPrompt: 'self authentication',
    service: 'ComStorageService',
    authenticateType: AUTHENTICATION_TYPE.BIOMETRICS,
  }

export const save = async (key, value,toSecure) => {
  return  toSecure?SecureStorage.setItem(key, value,config):
  AsyncStorage.setItem(key, value);

};
export const saveStringified = async (key, value,toSecure) => {
  return toSecure?SecureStorage.setItem(key, JSON.stringify(value),config):
            AsyncStorage.setItem(key, JSON.stringify(value));
};

export const load = async (key, toParse,toSecure) => {

  const value = toSecure?await  SecureStorage.getItem(key, config):await AsyncStorage.getItem(key);

  if (value !== null) {
    return toParse ? JSON.parse(value) : value;
  }
  return '';
};
