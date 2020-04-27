import {
  SIGNUP_ERROR,
  SIGNUP_NOTCONNECTED,
  SIGNUP_NOTFOUND,
  SIGNUP_SUCCESS,
  SIGNUP_TIMEOUT,
  GET_SIGNUP,
  SENDVERIFCODE_SUCCESS_SIGNUP,
  SENDVERIFCODE_NOTCONNECTED_SIGNUP,
  SENDVERIFCODE_ERROR_SIGNUP,
  SENDVERIFCODE_NOTFOUND_SIGNUP,
  SENDVERIFCODE_TIMEOUT_SIGNUP,
  GET_SENDVERIFCODE_SIGNUP
} from "../../data/types";
import { API_URL } from "../../data/constantes";

export function getsignUp(data) {
  return {
    meta: {
      API_METHOD: "POST",
      API_CALL: API_URL + "profile/create",
      API_PAYLOAD: data,
      API_SUCCESS: SIGNUP_SUCCESS,
      API_ERRORS: {
        0: SIGNUP_NOTCONNECTED,
        500: SIGNUP_ERROR,
        404: SIGNUP_NOTFOUND,
        408: SIGNUP_TIMEOUT
      }
    },
    type: GET_SIGNUP
  };
}

export function signUp_success() {
  return {
    type: SIGNUP_SUCCESS
  };
}

export function signUpNotConnected() {
  return {
    type: SIGNUP_NOTCONNECTED
  };
}

export function signUpError() {
  return {
    type: SIGNUP_ERROR
  };
}

export function signUpNotFound() {
  return {
    type: SIGNUP_NOTFOUND
  };
}

export function signUpTimeOut() {
  return {
    type: SIGNUP_TIMEOUT
  };
}

export function getsendVerifCodeSignUp(number) {
  return {
    meta: {
      API_METHOD: "GET",
      API_CALL: API_URL + "code/send" + "?msisdn=" + number,
      API_SUCCESS: SENDVERIFCODE_SUCCESS_SIGNUP,
      API_ERRORS: {
        0: SENDVERIFCODE_NOTCONNECTED_SIGNUP,
        500: SENDVERIFCODE_ERROR_SIGNUP,
        404: SENDVERIFCODE_NOTFOUND_SIGNUP,
        408: SENDVERIFCODE_TIMEOUT_SIGNUP
      }
    },
    type: GET_SENDVERIFCODE_SIGNUP
  };
}

export function sendVerifCode_success() {
  return {
    type: SENDVERIFCODE_SUCCESS_SIGNUP
  };
}

export function sendVerifCodeNotConnected() {
  return {
    type: SENDVERIFCODE_NOTCONNECTED_SIGNUP
  };
}

export function sendVerifCodeError() {
  return {
    type: SENDVERIFCODE_ERROR_SIGNUP
  };
}

export function sendVerifCodeNotFound() {
  return {
    type: SENDVERIFCODE_NOTFOUND_SIGNUP
  };
}

export function sendVerifCodeTimeOut() {
  return {
    type: SENDVERIFCODE_TIMEOUT_SIGNUP
  };
}
