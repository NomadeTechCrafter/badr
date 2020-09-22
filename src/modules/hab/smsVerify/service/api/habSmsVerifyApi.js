import {ComSessionService} from '../../../../../commons/services/session/ComSessionService';
import ComHttpHelperApi from '../../../../../commons/services/api/common/ComHttpHelperApi';
import packageJson from '../../../../../../package.json';
import {TYPE_SERVICE_SP, MODULE_HAB} from '../../../../../commons/Config';

export default class HabSmsVerifyApi {
  static verify = async (code) => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: 'cf4011',
        module: MODULE_HAB,
        commande: 'verifierCodeGenere',
        typeService: TYPE_SERVICE_SP,
      },
      jsonVO: {
        code: code,
        device_id: ComSessionService.getInstance().getDeviceId(),
        device_manufacturer: ComSessionService.getInstance().getManufacturer(),
        device_model: ComSessionService.getInstance().getModel(),
        os: ComSessionService.getInstance().getPlatform(),
        os_version: ComSessionService.getInstance().getSystemVersion(),
        app_version: packageJson.version,
        device_name: ComSessionService.getInstance().getDeviceName(),
        lng: ComSessionService.getInstance().getGeoCoords()
          ? ComSessionService.getInstance().getGeoCoords().longitude
          : '',
        lat: ComSessionService.getInstance().getGeoCoords()
          ? ComSessionService.getInstance().getGeoCoords().latitude
          : '',
      },
    };
    const response = await ComHttpHelperApi.process(data);
    return response;
  };
  static genererCodeSms = async () => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
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
    const response = await ComHttpHelperApi.process(data);
    return response;
  };
}
