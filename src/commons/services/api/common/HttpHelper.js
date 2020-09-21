import {
  HOST,
  BASE_SERVER_URL,
  BACK_OFFICE_BASE_URL,
  LOGIN_API,
  PROCESS_API,
  LOGOUT_API,
  remote,
  SEND_STATS,
  SEND_CRASH,
} from '../../../Config';
import * as axios from 'axios';
import store from '../../../../commons/state/Store';
/** Inmemory session */
import {Session} from '../../session/Session';
import localStore from '../local-data';
import * as GenericAction from '../../../state/actions/GenericAction';
import * as Constants from '../../../constants/generic/GenericConstants';
const instance = axios.create({
  baseURL: BASE_SERVER_URL,
  timeout: 40000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Connection: 'keep-alive',
    Accept: '*/*',
    Host: HOST,
  },
});
const instanceBO = axios.create({
  baseURL: BACK_OFFICE_BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Connection: 'keep-alive',
    Accept: '*/*',
    Host: 'bomobile-recette.douane.gov.ma',
  },
});
export default class HttpHelper {
  static async login(user) {
    let response = await instance.post(LOGIN_API, JSON.stringify(user), {
      withCredentials: true,
    });
    Session.getInstance().setSessionId(response.headers.session_id);
    return response;
  }

  static async logout(user) {
    return instance.post(LOGOUT_API, JSON.stringify(user));
  }

  static async process(object) {
    if (remote) {
      try {
        let response = await instance.post(
          PROCESS_API,
          JSON.stringify(object),
          {
            withCredentials: true,
            Cookie: Session.getInstance().getSessionId(true),
          },
        );
        return response;
      } catch (error) {
        console.log('---catch error in Api Call--');
        /**Dispatch Action :GENERIC_CATCH_API to custom Middleware*/
        let action = GenericAction.refresh({
          type: Constants.GENERIC_CATCH_API,
          value: {data: error},
        });
        store.dispatch(action);
      }
    } else {
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
      const dataApi = {
        session_id: Session.getInstance().getSessionIdBO(),
        errorUrl: errorUrl,
        errorMessage: errorMessage,
        stackTrace: stackTrace,
        cause: cause,
      };
      try {
        const response = await instanceBO.post(
          SEND_CRASH,
          JSON.stringify(dataApi),
          {
            withCredentials: true,
          },
        );
        return response;
      } catch (e) {
        console.log('error sendcrah', e.message);
      }
    }
  }
}
