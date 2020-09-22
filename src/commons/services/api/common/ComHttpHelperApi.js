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

/** Inmemory session */
import {ComSessionService} from '../../session/ComSessionService';
import localStore from '../local-data/ComLocalDataService';
import {useNavigation} from '@react-navigation/native';
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
        return response;
      } catch (error) {
        if (error.response && error.response.status === 403) {
          const navigation = useNavigation();
          navigation.navigate('Login', {});
        } else if (error.request) {
          // The request was made but no response was receivedjs
          console.log('error.request', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        this.sendCrash(
          error.response.status,
          error.message,
          error.message,
          error.response,
        );
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
      const data = {
        session_id: ComSessionService.getInstance().getSessionIdBO(),
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
