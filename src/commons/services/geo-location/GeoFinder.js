import {ToastAndroid} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import {Session} from '../session/Session';
import Geolocation from 'react-native-geolocation-service';
import translate from '../../i18n/I18nHelper';

export class GeoFinder {
  static synchronizeGeoPosition = async () => {
    const grantedRequest = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (grantedRequest !== 'granted') {
      ToastAndroid.show(translate('geo.notgranted'), ToastAndroid.SHORT);
    } else {
      Geolocation.getCurrentPosition(
        (response) => {
          //ToastAndroid.show(`(${response.coords.longitude}, ${response.coords.latitude})` , ToastAndroid.SHORT);
          Session.getInstance().setGeoCoords(response.coords);
        },
        (error) => {
          // See error code charts below.
          ToastAndroid.show(translate('geo.error'), ToastAndroid.SHORT);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };
}
