import {
  HOST,
  HOST_BO,
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
import {ComSessionService} from '../../session/ComSessionService';
import localStore from '../local-data/ComLocalDataService';
import * as GenericAction from '../../../state/actions/ComGenericAction';
import * as Constants from '../../../constants/generic/ComGenericConstants';
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
    Host: HOST_BO,
  },
});
export default class ComHttpHelperApi {
  static async login(user) {
    let response = await instance.post(LOGIN_API, JSON.stringify(user), {
      withCredentials: true,
    });
    ComSessionService.getInstance().setSessionId(response.headers.session_id);
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
            Cookie: ComSessionService.getInstance().getSessionId(true),
          },
        );
        // console.log('reponse WS', response);
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
      console.log('----reponse dtoHeader.commande', object.dtoHeader.commande);
      /*console.log(
        '----reponse WS local',
        localStore[object.dtoHeader.commande],
      );*/
      console.log(JSON.stringify(localStore[object.dtoHeader.commande]));
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
        session_id: ComSessionService.getInstance().getSessionIdBO(),
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
        session_id: ComSessionService.getInstance().getSessionIdBO(),
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
