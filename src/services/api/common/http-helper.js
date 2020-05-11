import {
  SERVER_URL,
  LOGIN_API,
  PROCESS_API,
  remote,
} from '../../../common/config';
import * as axios from 'axios';

const localStore = {
  rechercheEchangeMetVehicule: require('../offline/rechercheEchangeMetVehicule.json'),
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

  static async process(object) {
    if (remote) {
      return instance.post(PROCESS_API, JSON.stringify(object));
    } else {
      return {data: localStore[object.dtoHeader.commande]};
    }
  }

}
