/** API Services */

/**Constants */
import dedInitierControlApi from '../../service/api/dedInitierControlApi';
import * as Constants from '../dedInitierControlConstants';
import {DED_INIT_LIST_CONTROLE_COMMUN_REQUEST} from '../dedInitierControlConstants';
import {maximumDepthOfJSON} from 'react-native/Libraries/Utilities/ReactNativeTestTools';

export function request(action, navigation) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    dedInitierControlApi.initierListControle(action.value).then((response) => {
      console.log('response initierListControle ', response);
      if (response && response.data && response.data.jsonVO) {
        const data = response.data.jsonVO;
       // alert(JSON.stringify("initlistcontrol"+data));
        if ((response.data.jsonVO = '')) {
          dispatch(failed(response.data));
        } else {
          dispatch(success(response.data.dtoHeader));
          navigation.navigate('DedInitierListControleScreen', {data});
        }
      } else {
        //  alert('ko')
        dispatch(failed(response.data));
      }
    });
  };
}

export function inProgress(action) {
  return {
    type: Constants.DED_INIT_LIST_CONTROLE_COMMUN_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: Constants.DED_INIT_LIST_CONTROLE_COMMUN_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.DED_INIT_LIST_CONTROLE_COMMUN_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.DED_INIT_LIST_CONTROLE_COMMUN_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  init,
  inProgress,
};
