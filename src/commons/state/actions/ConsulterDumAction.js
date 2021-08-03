/**Constants */
import * as Constants from '../../constants/generic/ComGenericConstants';

/** i18n */
import {translate} from '../../i18n/ComI18nHelper';
import TransverseApi from '../../services/api/ComTransverseApi';
import {getValueByPath} from '../../../modules/dedouanement/redressement/utils/DedUtils';

export function request(action, navigation) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    TransverseApi.doProcess(
      'DED_LIB',
      action.command,
      'UC',
      action.value.jsonVO,
    )
      .then((response) => {
        const messagesErreurs = getValueByPath(
          'data.dtoHeader.messagesErreur',
          response,
        );
        if (
          response &&
          response.data &&
          response.data.jsonVO &&
          !messagesErreurs
        ) {
          dispatch(success(response.data.jsonVO, action.value));
          navigation.navigate('DedRedressementScreen', {
            searchData: action.value ? action.value.jsonVO : {},
          });
        } else {
          dispatch(failed(messagesErreurs, action.value));
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
