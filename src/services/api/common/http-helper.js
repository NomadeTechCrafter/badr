import {SERVER_URL, LOGIN_API, PROCESS_API} from '../../../common/config';
import RNFetchBlob from 'rn-fetch-blob';

import * as axios from 'axios';

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
    return instance.post(PROCESS_API, JSON.stringify(object));
  }
}
