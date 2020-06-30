import {
  SERVER_URL,
  LOGIN_API,
  PROCESS_API,
  LOGOUT_API,
  remote,
} from '../../../common/config';
import * as axios from 'axios';

const localStore = {
  rechercheEchangeMetVehicule: require('../offline/rechercheEchangeMetVehicule.json'),
  initControlerDedRI: require('../offline/controle/initControleDedRI.json'),
  getCmbOperateur: require('../offline/referential/getCmbOperateur.json'),
  getRegimByCode: require('../offline/referential/getRegimByCode.json'),
  initDelivrerMlv: require('../offline/mainLevee/initDelivrerMlv.json'),
  listeDeclarationsMLV: require('../offline/mainLevee/listeDeclarationsMLV.json'),
  initEnleverMarchandise: require('../offline/ecorImport/initEnleverMarchandise.json'),
  initEnleverMarchandiseParPesage: require('../offline/ecorImport/initEnleverMarchandiseParPesage.json'),
};

const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 1000,
  headers: {'Content-Type': 'application/json;charset=utf-8'},
});

export default class HttpHelper {
  static async login(user) {
    return instance.post(LOGIN_API, JSON.stringify(user));
  }

  static async logout(user) {
    return instance.post(LOGOUT_API, JSON.stringify(user));
  }

  static async process(object) {
    if (remote) {
      return instance.post(PROCESS_API, JSON.stringify(object));
    } else {
      console.log('Api local data :', localStore[object.dtoHeader.commande]);
      return {
        data: localStore[object.dtoHeader.commande],
      };
    }
  }
}
