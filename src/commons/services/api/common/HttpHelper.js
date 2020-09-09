import {
  SERVER_URL,
  BACK_OFFICE_BASE_URL,
  LOGIN_API,
  PROCESS_API,
  LOGOUT_API,
  remote,
  SEND_STATS,
  SEND_CRASH,
} from '../../../Config';
import * as axios from 'axios';

/** Inmemory session */
import {Session} from '../../session/Session';
import localStore from '../local-data';

const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Connection: 'keep-alive',
    Accept: '*/*',
    Host: 'badr4.douane.gov.ma',
  },
});
const instanceBO = axios.create({
  baseURL: BACK_OFFICE_BASE_URL,
  timeout: 1000,
});
export default class HttpHelper {
  static async login(user) {
    let response = await instance.post(LOGIN_API, JSON.stringify(user), {
      withCredentials: true,
    });
    console.log(response.headers);
    console.log('_____________*** *** ***_________________');
    console.log(response.headers.session_id);
    console.log('_____________*** *** ***_________________');
    Session.getInstance().setSessionId(response.headers.session_id);
    console.log('Session.getInstance().getSessionId(true)');
    console.log(Session.getInstance().getSessionId(true));
    console.log('Session.getInstance().getSessionId(false)');
    console.log(Session.getInstance().getSessionId(false));
    return response;
  }

  static async logout(user) {
    return instance.post(LOGOUT_API, JSON.stringify(user));
  }

  static async process(object) {
    if (remote) {
      let response = await instance.post(PROCESS_API, JSON.stringify(object), {
        withCredentials: true,
        Cookie: Session.getInstance().getSessionId(true),
      });
      return response;
    } else {
      console.log('Api local data :', localStore[object.dtoHeader.commande]);
      return {
        data: localStore[object.dtoHeader.commande],
      };
    }
  }
  static async sendStats(module, action, details = '') {
    if (remote) {
      const data = {
        module: module,
        action: action,
        details: details,
        session_id: Session.getInstance().getSessionIdBO(),
      };
      let response = await instanceBO.post(SEND_STATS, JSON.stringify(data), {
        withCredentials: true,
      });
      return response;
    }
  }
  static async sendCrash(errorUrl, errorMessage, stackTrace, cause) {
    if (remote) {
      const data = {
        session_id: Session.getInstance().getSessionIdBO(),
        errorUrl: errorUrl,
        errorMessage: errorMessage,
        stackTrace: stackTrace,
        cause: cause,
      };
      let response = await instanceBO.post(SEND_CRASH, JSON.stringify(data), {
        withCredentials: true,
      });
      return response;
    }
  }
}
