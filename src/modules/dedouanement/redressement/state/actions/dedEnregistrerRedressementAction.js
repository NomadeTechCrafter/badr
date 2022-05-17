/** API Services */

/**Constants */
import DedRedressementApi from '../../service/api/DedRedressementApi';
import * as Constants from '../DedRedressementConstants';

export function request(action, updateVersions,navigation, successRedirection) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    console.log('response enregistrerDum action : ', action);
    DedRedressementApi.enregistrerDum(action.value).then((response) => {
      console.log('response enregistrerDum ', response);
      console.log('response && response.data && response.data.jsonVO ', response && response.data && response.data.jsonVO);
      if (response && response.data && response.data.jsonVO && !response.data.dtoHeader.messagesErreur) {
        dispatch(success(response.data.dtoHeader));
        navigation.navigate(successRedirection, {
        
        });
        let numeroVersionBase = action.value.dedDumVO.dedReferenceVO.numeroVersionCourante;
        let numeroVersionCourante = action.value.dedDumVO.dedReferenceVO.numeroVersion;
        updateVersions(numeroVersionBase, numeroVersionCourante);
      } else {
        dispatch(failed(response.data));
      }
    });
  };
}

export function inProgress(action) {
  return {
    type: Constants.ENREGISTRER_REDRESSEMENT_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: Constants.ENREGISTRER_REDRESSEMENT_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.ENREGISTRER_REDRESSEMENT_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.ENREGISTRER_REDRESSEMENT_FAILED,
    value: data,
  };
}

export function update(data) {
  return {
    type: Constants.ENREGISTRER_REDRESSEMENT_UPDATE,
    data: data.value,
  };
}

export default {
  request,
  success,
  failed,
  init,
  update,
  inProgress,
};
