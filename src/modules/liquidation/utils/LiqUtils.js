import _ from 'lodash';
import { request, handleError } from '../state/actions/liquidationAction';
import { GENERIC_LIQ_REQUEST, GENERIC_LIQ_FAILED } from '../state/liquidationConstants';
import * as Constants from '../state/liquidationRechercheRefDumConstants';
import * as RechecheDumAction from '../state/actions/liquidationRechercheRefDumAction';
export const getValueByPath = (key, object, reducer) => {
  return _.get(object, key)
    ? _.get(object, key)
    : _.get(object, reducer + '.data.' + key);
};

export const getValueByPaths = (key1, key2, object) => {
  return _.get(object, key1) ? _.get(object, key1) : _.get(object, key2);
};

export const callRedux = (props, jsonVO, successRedirection) => {
  if (props.dispatch) {
    console.log('calling redux dispatch ...');
    props.dispatch(
      request(
        { type: GENERIC_LIQ_REQUEST, value: jsonVO },
      ),
    );
  }
};

export const callLiquidationUpdateRedux = (props, data) => {
  if (props.dispatch) {
    console.log('calling redux dispatch ...');
    var action = RechecheDumAction.requestUpdate(
      {
        type: Constants.RECHERCHEREFDUM_REQUEST,
        value: data,
      }
    );

    props.dispatch(action);
    console.log('dispatch fired !!');
  }
};

export const callReduxError = (props,jsonVO, error) => {
  if (props.dispatch) {
    console.log('calling redux error dispatch ...');
    props.dispatch(
      handleError(
        { type: GENERIC_LIQ_FAILED, value: jsonVO }, error
      ),
    );
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
