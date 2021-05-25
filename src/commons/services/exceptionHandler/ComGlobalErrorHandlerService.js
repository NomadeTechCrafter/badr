import {setJSExceptionHandler} from 'react-native-exception-handler';
import {Alert, BackHandler} from 'react-native';
import ComHttpHelperApi from '../api/common/ComHttpHelperApi';
import {translate} from '../../i18n/ComI18nHelper';
const setGlobalHandler = () => {
  const errorHandler = (e, isFatal) => {
    if (isFatal) {
      const errorString = `Error: ${isFatal ? 'Fatal:' : ''} ${e.name} ${
        e.message
      }`;
      Alert.alert(
        translate('errors.alertErrorTitle'),
        errorString + translate('errors.alertErrorContent'),
        [
          {
            text: 'Ok',
            onPress: () => {
              BackHandler.exitApp();
            },
          },
        ],
      );
      ComHttpHelperApi.sendCrash(e.name, e.name, e.message, errorString);
    } else {
      console.log('errorHandler', e);
    }
  };

  setJSExceptionHandler(errorHandler, false);
  //Set true to enable it in DEBUG mode. Otherwise, it only works in release mode
};
export default setGlobalHandler;
