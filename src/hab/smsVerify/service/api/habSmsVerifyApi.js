import {CommonSession} from '../../../../commons/services/session/commonSession';
import HttpHelper from '../../../../commons/services/api/common/http-helper';

export default class HabSmsVerifyApi {
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
}
