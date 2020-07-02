import {
  SERVER_URL,
  LOGIN_API,
  PROCESS_API,
  LOGOUT_API,
  remote,
} from '../../../common/config';
import * as axios from 'axios';

/** Inmemory session */
import {Session} from '../../../common/session';

const localStore = {
  rechercheEchangeMetVehicule: require('../offline/rechercheEchangeMetVehicule.json'),
  initControlerDedRI: require('../offline/controle/initControleDedRI.json'),
  getCmbOperateur: require('../offline/referential/getCmbOperateur.json'),
  getRegimByCode: require('../offline/referential/getRegimByCode.json'),
  initDelivrerMlv: require('../offline/mainLevee/initDelivrerMlv.json'),
  listeDeclarationsMLV: require('../offline/mainLevee/listeDeclarationsMLV.json'),
};

const instance = axios.create({
  baseURL: SERVER_URL,
  withCredentials: false,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Connection: 'keep-alive',
    Accept: '*/*',
  },
});

export default class HttpHelper {
  static async login(user) {
    let response = await instance.post(LOGIN_API, JSON.stringify(user));
    console.log(response.headers);
    console.log('_____________*** *** ***_________________');
    console.log(response.headers['set-cookie']);
    console.log('_____________*** *** ***_________________');
    Session.getInstance().setSessionId(response.headers['set-cookie']);
    return response;
  }

  static async logout(user) {
    return instance.post(LOGOUT_API, JSON.stringify(user));
  }

  static async process(object) {
    if (remote) {
      let response = await instance.post(PROCESS_API, JSON.stringify(object));
      console.log(response.headers);
      console.log('_____________*** *** ***_________________');
      console.log(response.headers['set-cookie']);
      console.log('_____________*** *** ***_________________');
      return response;
    } else {
      console.log('Api local data :', localStore[object.dtoHeader.commande]);
      return {
        data: localStore[object.dtoHeader.commande],
      };
    }
  }
}
