import { Session } from '../../../../../commons/services/session/Session';
import HttpHelper from '../../../../../commons/services/api/common/HttpHelper';
import packageJson from '../../../../../../package.json';

import Geolocation from 'react-native-geolocation-service';


export default class HabSmsVerifyApi {

  static getCurrentposition = () => {
      return Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
        },
        (error) => {
          console.log(error.code, error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 10000,
        },
      );
  };


  static verify = async (code) => {
    console.log('---------->');
    console.log(Session.getInstance());
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
        lng: Session.getInstance().getGeoCoords().longitude,
        lat: Session.getInstance().getGeoCoords().latitude,
      },
    };
    const response = await HttpHelper.process(data);
    console.log(response);
    return response;
  };
}
