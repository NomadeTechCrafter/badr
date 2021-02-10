import _ from 'lodash';
import {request} from '../state/actions/liquidationAction';
import {GENERIC_LIQ_REQUEST} from '../state/liquidationConstants';
export const getValueByPath = (key, object, reducer) => {
  return _.get(object, key)
    ? _.get(object, key)
    : _.get(object, reducer + '.data.' + key);
};

export const getValueByPaths = (key1, key2, object) => {
  return _.get(object, key1) ? _.get(object, key1) : _.get(object, key2);
};

export const callRedux = (props, jsonVO) => {
  if (props.dispatch) {
    console.log('calling redux dispatch ...');
    props.dispatch(request({type: GENERIC_LIQ_REQUEST, value: jsonVO}));
  }
};
export const extractCommandData = (props, command, reducerName) => {
  return props[reducerName] && props[reducerName].repData
    ? props[reducerName].repData[command]
    : null;
};
export const sumByKey = (data, key) => {
  let sum = 0;
  for (var i = data.length - 1; i >= 0; i--) {
    sum += +data[i][key];
  }
  return sum;
};
