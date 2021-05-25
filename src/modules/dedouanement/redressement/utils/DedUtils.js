import _ from 'lodash';

export const getValueByPath = (key, object, reducer) => {
  if (key === 'dedDumSectionEnteteVO.typeDUM' || key === 'sousDum') {
    //console.log('----getValueByPath--', JSON.stringify(object));
  }

  return _.get(object, key)
    ? _.get(object, key)
    : _.get(object, reducer + '.data.' + key);
};

export const cleDS = (obj) => {
  var alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
  obj = obj % 23;
  alpha = alpha.charAt(obj);
  return alpha;
};

export const getValueByPaths = (key1, key2, object) => {
  return _.get(object, key1) ? _.get(object, key1) : _.get(object, key2);
};

export const getAnnee = (reference) => {
  return reference ? reference.substring(6, 10) : '';
};

export const getBureau = (reference) => {
  return reference ? reference.substring(0, 3) : '';
};

export const getRegime = (reference) => {
  return reference ? reference.substring(3, 6) : '';
};

export const getSerie = (reference) => {
  return reference ? reference.substring(10, 17) : '';
};

export const getCategorieDum = (typeDum, isSousDum) => {
  if (typeDum == '01') {
    return '1';
  } else if (typeDum == '02') {
    return isSousDum ? '4' : '2';
  } else if (typeDum == '04') {
    return '4';
  }
};
