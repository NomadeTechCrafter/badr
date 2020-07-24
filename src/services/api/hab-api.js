import HttpHelper from './common/http-helper';

/** Inmemory session */
import {CommonSession} from '../../commons/services/session/commonSession';

/**
Uncomment this block to use mocked device id.
const MOCKED_DEVICES_ID = {
  YELM: Math.random().toString(17).slice(2),
  AD6203: Math.random().toString(17).slice(2),
  MAFOULKID: Math.random().toString(17).slice(2),
  SUPSI1082: Math.random().toString(17).slice(2),
};
*/

export default class HabApi {
  static login = async (login, pwd) => {
    const response = await HttpHelper.login({
      login: login,
      password: pwd,
      forcerConnexion: true,
    });
    console.log(response);
    return response && response.data ? response.data : {};
  };

  static verify = async (code) => {
    const data = {
      dtoHeader: {
        userLogin: CommonSession.getInstance().getLogin(),
        fonctionnalite: 'cf4011',
        module: 'HAB_LIB',
        commande: 'verifierCodeGenere',
        typeService: 'SP',
      },
      jsonVO: {
        code: code,
        device_id: CommonSession.getInstance().getDeviceId(),
        // device_id: MOCKED_DEVICES_ID[CommonSession.getInstance().getLogin()],
        device_manufacturer: CommonSession.getInstance().getManufacturer(),
        device_model: CommonSession.getInstance().getModel(),
        os: 'Android',
        os_version: CommonSession.getInstance().getSystemVersion(),
        app_version: '2.3',
        device_name: CommonSession.getInstance().getDeviceName(),
        lng: '150.644',
        lat: '-34.397',
      },
    };
    const response = await HttpHelper.process(data);
    return response;
  };

  static confirmConnexion = async (
    codeBureau,
    listeProfilCoche,
    codeArrondissement,
  ) => {
    const data = {
      dtoHeader: {
        userLogin: CommonSession.getInstance().getLogin(),
        fonctionnalite: 'cf4011',
        module: 'HAB_LIB',
        commande: 'confirmerConnexionAgent',
        typeService: 'SP',
      },
      jsonVO: {
        codeArrondissement: codeArrondissement,
        codeBureau: codeBureau,
        listProfilsCoche: listeProfilCoche,
      },
    };
    return await HttpHelper.process(data);
  };

  static logout = async () => {
    const data = {
      login: CommonSession.getInstance().getLogin(),
    };
    return await HttpHelper.logout(data);
  };
}
