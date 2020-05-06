export default class Utils {
  static buildUserFullname = user => {
    if (user.nomAgent && user.prenomAgent) {
      return user.nomAgent.concat(' ').concat(user.prenomAgent);
    }
    return 'Anonymous';
  };

  static unflatten = arr => {
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
}
