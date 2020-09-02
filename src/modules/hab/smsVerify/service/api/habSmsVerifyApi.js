import {Session} from '../../../../../commons/services/session/Session';
import HttpHelper from '../../../../../commons/services/api/common/HttpHelper';
import packageJson from '../../../../../../package.json';

export default class HabSmsVerifyApi {
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
}
