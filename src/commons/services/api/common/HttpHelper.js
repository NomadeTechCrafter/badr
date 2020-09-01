import {
  SERVER_URL,
  LOGIN_API,
  PROCESS_API,
  LOGOUT_API,
  remote,
} from '../../../Config';
import * as axios from 'axios';

/** Inmemory session */
import {Session} from '../../session/Session';
import localStore from '../local-data';

const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 40000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Connection: 'keep-alive',
    Accept: '*/*',
    Host: 'badr4.douane.gov.ma',
  },
});

export default class HttpHelper {
  static async login(user) {
    let response = await instance.post(LOGIN_API, JSON.stringify(user), {
      withCredentials: true,
    });
    Session.getInstance().setSessionId(response.headers['session_id']);
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
      return {
        data: localStore[object.dtoHeader.commande],
      };
    }
  }
}
