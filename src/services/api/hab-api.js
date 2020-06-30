import HttpHelper from './common/http-helper';

/** Inmemory session */
import {Session} from '../../common/session';

const MOCKED_DEVICES_ID = {
  YELM: Math.random().toString(17).slice(2),
  AD6203: Math.random().toString(17).slice(2),
  MAFOULKID: Math.random().toString(17).slice(2),
  SUPSI1082: Math.random().toString(17).slice(2),
};

export default class HabApi {
  static login = async (login, pwd) => {
    const response = await HttpHelper.login({
      login: login,
      password: pwd,
      forcerConnexion: true,
    });
    return response && response.data ? response.data : {};
  };

  static verify = async (code) => {
    const data = {
      dtoHeader: {
        userLogin: Session.getInstance().getLogin(),
        fonctionnalite: 'cf4011',
        module: 'HAB_LIB',
        commande: 'verifierCodeGenere',
        typeService: 'SP',
      },
      jsonVO: {
        code: code,
        device_id: Session.getInstance().getDeviceId(),
        // device_id: MOCKED_DEVICES_ID[Session.getInstance().getLogin()],
        device_manufacturer: Session.getInstance().getManufacturer(),
        device_model: Session.getInstance().getModel(),
        os: 'Android',
        os_version: Session.getInstance().getSystemVersion(),
        app_version: '2.3',
        device_name: Session.getInstance().getDeviceName(),
        lng: '150.644',
        lat: '-34.397',
      },
    };
    console.log('Verifying SMS with data ---------> ');
    console.log(data.jsonVO);
    console.log('Verifying SMS with data <---------  ');
    const response = await HttpHelper.process(data);
    console.log(response);
    return response;
  };

  static confirmConnexion = async (
    codeBureau,
    listeProfilCoche,
    codeArrondissement,
  ) => {
    const data = {
      dtoHeader: {
        userLogin: Session.getInstance().getLogin(),
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
      login: Session.getInstance().getLogin(),
    };
    return await HttpHelper.logout(data);
  };
}
