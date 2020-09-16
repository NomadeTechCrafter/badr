import {setJSExceptionHandler} from 'react-native-exception-handler';
import {Alert, BackHandler} from 'react-native';
import HttpHelper from '../../services/api/common/HttpHelper';
import {translate} from '../../i18n/I18nHelper';
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
      HttpHelper.sendCrash(e.name, e.name, e.message, errorString);
    } else {
      console.log('errorHandler', e);
    }
  };

  setJSExceptionHandler(errorHandler, true);
  //Set true to enable it in DEBUG mode. Otherwise, it only works in release mode
};
export default setGlobalHandler;
