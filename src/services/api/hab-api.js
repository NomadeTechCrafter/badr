import HttpHelper from './common/http-helper';

/** Inmemory session */
import {Session} from '../../common/session';

export default class HabApi {
  static login = async (login, pwd) => {
    const response = await HttpHelper.login({
      login: login,
      password: pwd,
      forcerConnexion: true,
    });
    return response && response.data ? response.data : {};
  };

  static verify = async (code, login) => {
    const data = {
      dtoHeader: {
        userLogin: login,
        fonctionnalite: 'cf4011',
        module: 'HAB_LIB',
        commande: 'verifierCodeGenere',
        typeService: 'SP',
      },
      jsonVO: {
        code: code,
        device_id: Session.getInstance().getDeviceId(),
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
    return await HttpHelper.process(data);
  };

  static confirmConnexion = async (
    codeBureau,
    listeProfilCoche,
    codeArrondissement,
    login,
  ) => {
    const data = {
      dtoHeader: {
        userLogin: login,
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
}
