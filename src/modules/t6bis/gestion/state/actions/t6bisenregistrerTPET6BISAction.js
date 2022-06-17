import T6bisGestiontionApi from '../../service/api/t6bisGestionApi';
import * as Constants from '../t6bisGestionConstants';

export function request(action, navigation) {
  return (dispatch) => {
    dispatch(inProgress(action));

    T6bisGestiontionApi.enregistrerT6BISTPE(
      action.value.cmd,
      action.value.t6bis,
    )

      .then((response) => {
        const data = response.data;
        //console.log('responseenregistrer', JSON.stringify(response));
        if (!Array.isArray(response.data.jsonVO)) {
         // console.log('dispatchenregisuccess');
          action.value.t6bis = data.jsonVO;
          action.value.dtoHeader = data.dtoHeader;
          dispatch(success(action));
        } else {
          dispatch(failed({value: data.jsonVO, dtoHeader: data.dtoHeader}));
        }
      })
      .catch((e) => {
      //  console.log(e);
        dispatch(failed({value: 'error while getting data testtest'}));
      });
  };
}

export function success(action) {
  return {
    type: Constants.T6BIS_ENREGISTRER_TPE_SUCCES,
    value: action.value,
  };
}

export function failed(action) {
  return {
    type: Constants.T6BIS_ENREGISTRER_TPE_FAILD,
    value: action.value,
    dtoHeader: action.dtoHeader,
  };
}

export function inProgress(action) {
  return {
    type: Constants.T6BIS_ENREGISTRER_TPE_PROGRESS,
    value: action.value,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
