import _ from 'lodash';
import {Dimensions} from 'react-native';
import moment from 'moment';
import translate from '../i18n/ComI18nHelper';
import {ComSessionService} from '../services/session/ComSessionService';
import {
  getAndroidId,
  getDeviceName,
  getManufacturer,
  getModel,
  getSystemVersion,
  getSystemName,
} from 'react-native-device-info';
export default class ComUtils {
  static deepDelete = (obj, keysToOmit) => {
    var keysToOmitIndex = _.keyBy(
      Array.isArray(keysToOmit) ? keysToOmit : [keysToOmit],
    ); // create an index object of the keys that should be omitted
    function omitFromObject(inObj) {
      // the inner function which will be called recursivley
      return _.transform(inObj, function (result, value, key) {
        // transform to a new object
        if (key in keysToOmitIndex) {
          // if the key is in the index skip it
          return;
        }
        result[key] = _.isObject(value) ? omitFromObject(value) : value;
      });
    }

    return omitFromObject(obj); // return the inner function result
  };

  static buildUserFullname = (user) => {
    if (user.nomAgent && user.prenomAgent) {
      return user.nomAgent.concat(' ').concat(user.prenomAgent);
    }
    return translate('transverse.anonymoususer');
  };

  static isSameThanNow = (date, dateFormat) => {
    return moment(date, dateFormat)
      .startOf('day')
      .isSame(moment(new Date()).startOf('day'));
  };

  static unflatten = (arr) => {
    var tree = [],
      mappedArr = {},
      arrElem,
      mappedElem;
    for (var i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];
      mappedArr[arrElem.id] = arrElem;
      mappedArr[arrElem.id].children = [];
    }
    for (var id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        if (mappedElem.parent && mappedElem.parent) {
          if (mappedArr[mappedElem.parent]) {
            mappedArr[mappedElem.parent].children.push(mappedElem);
          }
        } else {
          tree.push(mappedElem);
        }
      }
    }
    return tree;
  };

  static concatReference = (bureau, annee, serie, numero) => {
    return bureau + annee + serie + numero;
  };

  static isLandscape = () => {
    const dimension = Dimensions.get('screen');
    return dimension.width >= dimension.height;
  };

  static setDeviceInformation = () => {
    ComSessionService.getInstance().setSystemVersion(getSystemVersion());
    ComSessionService.getInstance().setModel(getModel());
    getAndroidId().then((value) => {
      ComSessionService.getInstance().setDeviceId(value);
    });
    getManufacturer().then((value) => {
      ComSessionService.getInstance().setManufacturer(value);
    });
    getDeviceName().then((value) => {
      ComSessionService.getInstance().setDeviceName(value);
    });
    ComSessionService.getInstance().setPlatform(getSystemName());
  };

  static slugify = (str) => {
    let map = {
      a: 'á|à|ã|â|À|Á|Ã|Â',
      e: 'é|è|ê|É|È|Ê',
      i: 'í|ì|î|Í|Ì|Î',
      o: 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
      u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
      c: 'ç|Ç',
      n: 'ñ|Ñ',
    };
    for (let pattern in map) {
      str = str.replace(new RegExp(map[pattern], 'g'), pattern);
    }
    return str;
  };

  //obj = regime+serie+annee
  static cleDS = (obj) => {
    var alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
    obj = obj % 23;
    alpha = alpha.charAt(obj);
    return alpha;
  };
  static getValueByPath = (key, object, reducer) => {
    return _.get(object, key)
      ? _.get(object, key)
      : _.get(object, reducer + '.data.' + key);
  };

  static cleDUM = (refDeclaration) => {
    let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';

    let regime = refDeclaration.slice(3, 6);
    let serie = refDeclaration.slice(10, 17);

    if (serie.length > 6) {
      let firstSerie = serie.substring(0, 1);
      if (firstSerie == '0') {
        serie = serie.substring(1, 7);
      }
    }
    let obj = regime + serie;
    let RS = obj % 23;
    alpha = alpha.charAt(RS);
    return alpha;
  };
}
