import _ from 'lodash';

import moment from 'moment';

export default class Utils {
  static buildUserFullname = (user) => {
    if (user.nomAgent && user.prenomAgent) {
      return user.nomAgent.concat(' ').concat(user.prenomAgent);
    }
    return 'Anonymous';
  };

  static isDateBiggerThanNow(date, dateFormat) {
    if (moment(date, dateFormat) > moment()) {
      return true;
    } else {
      return false;
    }
  }

  static unflatten = (arr) => {
    var tree = [],
      mappedArr = {},
      arrElem,
      mappedElem;
    for (var i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];
      mappedArr[arrElem.id] = arrElem;
      mappedArr[arrElem.id]['children'] = [];
    }
    for (var id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        if (mappedElem.parent && mappedElem['parent']) {
          if (mappedArr[mappedElem['parent']]) {
            mappedArr[mappedElem['parent']]['children'].push(mappedElem);
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
}
