import _ from 'lodash';

export const getValueByPath = (key, object) => {
  return _.get(object, key);
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
