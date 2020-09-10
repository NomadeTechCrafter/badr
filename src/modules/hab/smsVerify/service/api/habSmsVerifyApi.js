import {Session} from '../../../../../commons/services/session/Session';
import HttpHelper from '../../../../../commons/services/api/common/HttpHelper';
import packageJson from '../../../../../../package.json';
import {TYPE_SERVICE_SP, MODULE_HAB} from '../../../../../commons/Config';

export default class HabSmsVerifyApi {
  static verify = async (code) => {
    const data = {
      dtoHeader: {
        userLogin: Session.getInstance().getLogin(),
        fonctionnalite: 'cf4011',
        module: MODULE_HAB,
        commande: 'verifierCodeGenere',
        typeService: TYPE_SERVICE_SP,
      },
      jsonVO: {
        code: code,
        device_id: Session.getInstance().getDeviceId(),
        device_manufacturer: Session.getInstance().getManufacturer(),
        device_model: Session.getInstance().getModel(),
        os: 'Android',
        os_version: Session.getInstance().getSystemVersion(),
        app_version: packageJson.version,
        device_name: Session.getInstance().getDeviceName(),
        lng: Session.getInstance().getGeoCoords()
          ? Session.getInstance().getGeoCoords().longitude
          : '',
        lat: Session.getInstance().getGeoCoords()
          ? Session.getInstance().getGeoCoords().latitude
          : '',
      },
    };
    const response = await HttpHelper.process(data);
    return response;
  };
  static genererCodeSms = async () => {
    const data = {
      dtoHeader: {
        userLogin: Session.getInstance().getLogin(),
        fonctionnalite: 'cf4011',
        module: MODULE_HAB,
        commande: 'genererCodeAleatoire',
        typeService: TYPE_SERVICE_SP,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: '',
    };
    const response = await HttpHelper.process(data);
    return response;
  };
}
