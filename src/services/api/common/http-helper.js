import {SERVER_URL, LOGIN_API, PROCESS_API} from '../../../common/config';
import RNFetchBlob from 'rn-fetch-blob';

export default class HttpHelper {
  static async login(user) {
    return RNFetchBlob.config({trusty: true}).fetch(
      'POST',
      SERVER_URL + LOGIN_API,
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify(user),
    );
  }

  static async process(object) {
    console.log(object);
    return RNFetchBlob.config({trusty: true}).fetch(
      'POST',
      SERVER_URL + PROCESS_API,
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify(object),
    );
  }
}
