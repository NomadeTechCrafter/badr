import * as Constants from '../t6bisCreationConstants';
import T6bisCreationApi from '../../service/api/t6bisCreationApi';

export function request(action, navigation,cleaner) {
  return (dispatch) => {
    console.log('action.value.codeType', action.value.codeType);

    dispatch(inProgress(action));
    console.log('T6bisCreationApi', T6bisCreationApi);
    T6bisCreationApi.t6bisInitForCreate(action.value.codeType)

      .then((response) => {
        const data = response.data;
        console.log('response', response);
        if (data.dtoHeader.messagesInfo) {
          console.log('action.value', action.value);

          dispatch(success(action));
          cleaner();
          navigation.navigate('T6bisGestion', {
            context: {
              selectedType: action.value.selectedType,
              selectedTab: action.value.selectedType.tabs[0],
              tabs: action.value.selectedType.tabs,
            },
            mode: action.value.mode,
            title: action.value.title,
          });
        } else {
          dispatch(failed({value: data.jsonVO}));
        }
      })
      .catch((e) => {
        console.log(e);
        dispatch(failed({value: 'error while getting data testtest'}));
      });
  };
}

export function success(action) {
  console.log('Success');
  return {
    type: Constants.T6BIS_INIT_FOR_CREATION_SUCCES,
    value: action.value,
  };
}

export function failed(action) {
  return {
    type: Constants.T6BIS_INIT_FOR_CREATION_FAILED,
    value: action.value,
  };
}

export function inProgress(action) {
  return {
    type: Constants.T6BIS_INIT_FOR_CREATION_IN_PROGRESS,
    value: action.value,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
