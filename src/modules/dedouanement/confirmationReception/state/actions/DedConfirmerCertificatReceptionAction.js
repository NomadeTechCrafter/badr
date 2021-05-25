/** API Services */

/**Constants */
import * as Constants from '../../../redressement/state/DedRedressementConstants';
import DedConfirmerReceptionApi from '../../service/api/dedConfirmationReceptionApi';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    DedConfirmerReceptionApi.confirmerCertificatReception(action.value).then((response) => {
      console.log('response confirmerCertificatReception ', response)
      if (response && response.data && response.data.jsonVO) {
        dispatch(success(response.data.dtoHeader));
      } else {
        dispatch(failed(response.data));
      }
    });
  };
}

export function inProgress(action) {
  return {
    type: Constants.CONFIRMER_CERTIFICAT_RECEPTION_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: Constants.CONFIRMER_CERTIFICAT_RECEPTION_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.CONFIRMER_CERTIFICAT_RECEPTION_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.CONFIRMER_CERTIFICAT_RECEPTION_FAILED,
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
