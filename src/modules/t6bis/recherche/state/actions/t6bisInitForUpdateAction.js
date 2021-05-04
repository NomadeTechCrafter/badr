import * as Constants from '../t6bisRechercheConstants';
import T6bisRechercheApi from '../../service/api/t6bisRechercheApi';

export function request(action, navigation, cleaner) {
  return (dispatch) => {
    console.log('action.value.codeType', action.value.codeType);

    dispatch(inProgress(action));
    T6bisRechercheApi.t6bisInitForUpdate(action.value.t6bis)

      .then((response) => {
        const data = response.data;
        console.log('response', response);
        if (!Array.isArray(response.data.jsonVO)) {
          console.log('action.value', action.value);

          dispatch(success(action));
          const selectedType = {
            code: response.data.jsonVO.codeTypeT6bis,
            libelle: response.data.jsonVO.libelleTypeT6Bis,
          };
          cleaner();
          navigation.navigate('T6bisGestion', {
            context: {
              selectedType: selectedType,
              t6bis: response.data.jsonVO,
            },
            t6bis: response.data.jsonVO,
            mode: action.value.mode,
            title: action.value.title,
          });
        } else {
          dispatch(failed({value: data.jsonVO}));
        }
      })
      .catch((e) => {
        dispatch(failed({value: 'error while getting data testtest'}));
      });
  };
}

export function success(action) {
  console.log('Success');
  return {
    type: Constants.T6BIS_INIT_FOR_UPDATE_SUCCES,
    value: action.value,
  };
}

export function failed(action) {
  return {
    type: Constants.T6BIS_INIT_FOR_UPDATE_FAILED,
    value: action.value,
  };
}

export function inProgress(action) {
  return {
    type: Constants.T6BIS_INIT_FOR_UPDATE_IN_PROGRESS,
    value: action.value,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
