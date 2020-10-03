/**Constants */
import * as Constants from '../../constants/generic/GenericConstants';

/** i18n */
import {translate} from '../../i18n/I18nHelper';
import TransverseApi from '../../services/api/TransverseApi';
import {AT_MODULE} from '../../constants/at/At';

export function request(action, navigation) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    TransverseApi.doProcess(
      'DED_LIB',
      'ded.ConsulterDum',
      'UC',
      action.value.jsonVO,
    )
      .then((response) => {
        console.log(response);
        if (response && response.data && response.data.jsonVO) {
          dispatch(success(response.data.jsonVO, action.value));
          navigation.navigate('DedRedressementScreen', {
            searchData: action.value.jsonVO,
          });
        } else {
          dispatch(failed(translate('errors.technicalIssue')));
        }
      })
      .catch((e) => {
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

export function inProgress(action) {
  return {
    type: Constants.GENERIC_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: action.type,
    value: action.value,
  };
}

export function success(data, searchParams) {
  return {
    type: Constants.GENERIC_SUCCESS,
    value: {
      searchParams: searchParams,
      data: data,
    },
  };
}

export function failed(data, command) {
  return {
    type: Constants.GENERIC_FAILED,
    value: {
      command: command,
      data: data,
    },
  };
}
