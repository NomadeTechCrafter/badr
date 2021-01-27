import _ from 'lodash';
import moment from 'moment';
import * as Constants from "./t6bisConstants";

export const getValueByPath = (key, object) => {


  return object ? _.get(object, key) : '';

};


export const getValueByPaths = (key1, key2, object) => {
  return _.get(object, key1) ? _.get(object, key1) : _.get(object, key2);
};


export const getSerie = (reference) => {
  return reference ? reference.substring(7, 16) : '';
};

export const hasAtLeastOneTaxationLine = (t6bis) => {
  /*
  verify if each article has at least one ligne taxation
  */
  let hasIt = false;
  if (t6bis && t6bis.listeArticleT6bis) {
    t6bis.listeArticleT6bis.forEach(function (current) {
      if (current) {
        if ((current && current.listeT6bisLigneTaxation && current.listeT6bisLigneTaxation.length > 0) || (t6bis.listeT6bisLigneTaxation && t6bis.listeT6bisLigneTaxation.length > 0) || (t6bis.listeT6bisLigneTaxationGlobale && t6bis.listeT6bisLigneTaxationGlobale.length > 0)) {
          hasIt = true;
        } else {
          hasIt = false;
        }
      }
    });
  }
  console.log(hasIt);
  return hasIt;
}

export const format = (date) => { 

  return moment(date).format('DD/MM/YYYY HH:mm',)
}

export const getState = (state) => {
  console.log('state*******************************', state, getValueByPath(Constants.STATES, state), Constants.STATES);
  let value;
  Object.keys(Constants.STATES).map((key, val) => {
    console.log(key, val);
    console.log(Constants.STATES[key]);
    if (key === state) { 
      value = Constants.STATES[key];
    }
    console.log(value);
  });
  return value;
}

export const validateCin = (cin) => {
  console.log('validateCin**************************************************************************start');
  if (cin) {
    var condition1 = cin.charAt(0).match(/[a-z]/i);
    console.log(condition1);
    var condition2 = cin.charAt(1).match(/[0-9]/i);
    console.log(condition2);
    var c1 = false;
    var c2 = false;
    var c3 = cin.length >= 2 && cin.length <= 8;
    if (condition1 && condition1.length > 0) {
      c1 = true;
    }
    if (condition2 && condition2.length > 0) {
      c2 = true;
    }
    if (c1 && c2 && c3) {
      var part2 = cin.substr(1).padStart(7, '0');
      console.log('validateCin**************************************************************************end' + cin.substr(0, 1) + part2);
      return cin.substr(0, 1) + part2;
    }
  }
  console.log('validateCin**************************************************************************end');
  return '';
}


